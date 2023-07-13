import { environment } from '@/constants/Environment'
import { ClientError, GraphQLClient, gql } from 'graphql-request'
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

const apolloClient = new GraphQLClient(environment.Uri.Graphql, {
  credentials: 'include',
})

const LOGIN = gql`
  mutation Login($user: LoginInput!) {
    login(user: $user) {
      access_token
      email
      username
      _id
    }
  }
`

const PROFILE = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      name
      roles
    }
  }
`

export default NextAuth({
  secret: process.env.TOKEN_SECRET,

  jwt: {
    secret: process.env.TOKEN_SECRET,
    async encode(data: any) {
      const { secret, token, user } = data
      // console.log(data);

      const jwtClaims = {
        sub: token.sub,
        name: token.name,
      }

      const encodedToken = jwt.sign(jwtClaims, secret, {
        expiresIn: '60 days',
        algorithm: 'HS512',
      })
      return encodedToken
    },
    async decode(data: any) {
      const { secret, token, maxAge } = data
      const verify = jwt.verify(token, secret) as JWT

      return verify
    },
  },
  pages: {
    signIn: 'api/auth/signin',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: parseInt(process.env.TOKEN_MAX_AGE as string),
  },
  callbacks: {
    async jwt(params: any) {
      const { token, user, account, profile, isNewUser } = params
      console.log(params)

      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      if (user?.roles) {
        token.roles = user.roles.toString()
      }
      return token
    },
    async session(params: any) {
      const { session, token } = params
      console.log(params)

      const user: any = session.user._id
        ? { account: session.user }
        : await apolloClient.request(PROFILE, { id: token.sub })

      const encodedToken = jwt.sign(token, process.env.TOKEN_SECRET as any, {
        algorithm: 'HS256',
      })
      session.id = token.sub
      session.token = encodedToken
      session.user = { ...user.user, name: user.user.name }

      return Promise.resolve(session)
    },
  },
  providers: [
    CredentialProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Phone Number', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        const payload = {
          user: {
            email: credentials.email,
            password: credentials.password,
          },
        }

        return await apolloClient
          .request(LOGIN, payload)
          .then((res: any) => {
            const { username, _id, email } = res.login
            // console.log(res.login);

            return {
              name: username,
              id: _id,
              email,
              // user: res.signIn,
            }
          })
          .catch((err) => {
            const errorResult = typeof err === 'string' ? { error: err } : err
            const error: any = new ClientError(
              { ...errorResult },
              { query: LOGIN as any, variables: payload },
            )

            console.log(JSON.stringify(error.response), 'apolloClient.request')
            throw error.response.response?.errors[0]
          })
      },
    }),
  ],
})
