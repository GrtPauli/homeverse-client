import { environment } from "@/constants/Environment";
import { ClientError, GraphQLClient, gql } from "graphql-request";
import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials";

const apolloClient = new GraphQLClient(environment.Uri.Graphql, {
    credentials: "include"
})

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input){
        access_token,
        email,
        name,
        _id
    }
  }
`;

export default NextAuth({
    jwt: {

    },
    pages: {

    },
    session: {

    },
    callbacks: {

    },
    providers: [
        CredentialProvider({
            name: 'credentials',
            type: "credentials",
            credentials: {
              email: { label: "Phone Number", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req: any) {
                const payload = {
                    input : {
                        email: credentials.email,
                        password: credentials.password
                    }
                }

                return await apolloClient
                .request(LOGIN, payload)
                .then((res: any) => {
                    const { name, _id, email } = res.login
                    console.log(res.login);
                    
                    return {
                        name,
                        id: _id,
                        user: res.login
                    }
                })
                .catch((err) => {
                    const errorResult = typeof err === "string" ? { error: err } : err;
                    const error: any = new ClientError(
                        { ...errorResult },
                        { query: LOGIN as any, variables: payload }
                    )

                    console.log(JSON.stringify(error.response), "apolloClient.request")
                    throw error.response.response?.errors[0];
                })
            }
        })
    ]
})