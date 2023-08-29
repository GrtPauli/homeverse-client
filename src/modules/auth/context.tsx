import { FC, ReactNode, createContext, useContext, useRef, useState } from 'react'
import { IUser } from './model'
import { useSendOtp, useSignUp } from './gql/query'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { QueryResult, OperationVariables } from "@apollo/client";
import { ApiService } from "@/services/api";

interface IAuthState {
  loading: boolean
  signUp: (user: IUser) => Promise<void>
  logIn: (user: IUser) => Promise<void>
  sendOtp: (number: string) => Promise<void>
}

const AuthContext = createContext<IAuthState>({
  loading: false,
  signUp(user: IUser) {
    return null as any
  },
  logIn(user: IUser) {
    return null as any
  },
  sendOtp(number) {
    return null as any;
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
  const sendOtpQuery = useSendOtp((rs: any) => {})
  const router = useRouter()
  const apiService = new ApiService()
  const run = useRef(0)

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
    let username: string, password: string, nickname :string

    return new Promise((resolve, reject) => {
      signIn('credentials', {
        redirect: false,
        ...user,
      }).then((rs) => {
        if(run.current == 0){
          if (!rs?.error) {
            console.log(run.current);
            // username = session.data.user.name.split(' ')[0] + session.data.user._id
            // nickname = session.data.user.name
            // password = session.data.user._id
                      
            // fetch("http://localhost:8090/chat/app/token")
            // .then((res) => res.text())
            // .then((token) => {
            //     apiService.postData('http://a41.chat.agora.io/411020257/1191665/users', 
            //         { username, password, nickname },
            //         { Authorization: `Bearer ${token}` }
            //     ).then(rs => {
            //       console.log(rs);
            //   })
            //   .catch(err => {
            //       console.log(err);
            //   })
            //     // console.log(rs); 
            // })
            // .catch((err)=> {
            //     // console.log(err)
            // }) 
            
            router.push('/')
            resolve()
          } else {
            console.log(run.current);
            console.log(rs?.error)
            reject()
          }

          run.current++
        }
      })
    })
  }

  const sendOtp = (number: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      sendOtpQuery[0]({
        variables: {
          number,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.sendOTP) {
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    }) 
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        signUp,
        logIn,
        sendOtp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, useAuthContext }