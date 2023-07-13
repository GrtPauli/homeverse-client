import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { IUser } from './model'
import { useSignUp } from './gql/query'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

interface IAuthState {
  loading: boolean
  signUp: (user: IUser) => Promise<void>
  logIn: (user: IUser) => Promise<void>
}

const AuthContext = createContext<IAuthState>({
  loading: false,
  signUp(user: IUser) {
    return null as any
  },
  logIn(user: IUser) {
    return null as any
  },
})

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const AuthContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const signUpQuery = useSignUp((rs: any) => {})
  const router = useRouter()

  const signUp = (user: IUser): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      signUpQuery[0]({
        variables: {
          user,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.createUser) {
            console.log(rs?.data?.createUser)
            router.push('/signin')
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const logIn = (user: IUser): Promise<void> => {
    return new Promise((resolve, reject) => {
      signIn('credentials', {
        redirect: false,
        ...user,
      }).then((rs) => {
        if (!rs?.error) {
          // router.push("/");
        } else {
          console.log(rs?.error)
        }
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        signUp,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, useAuthContext }
