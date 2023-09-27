import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { IAuthUserInput, IUser } from './model'
import { useRouter } from 'next/router'
import { environment } from '@/constants/Environment'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  sendEmailVerification,
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
import { useCreateProfile, useGetUserType } from '../profile/gql/query'
import { UserType } from '../profile/model'
import useHvNotification from '@/hooks/notification'

interface IAuthState {
  loading: boolean
  firebaseInitLoading: boolean
  firebaseApp: FirebaseApp
  firebaseAuth: Auth
  firebaseAnalytics: Analytics
  firestoreDb: Firestore
  userType: UserType
  authenticateWithEmailAndPassword: (
    user: IAuthUserInput,
    type: 'signup' | 'signin',
  ) => Promise<void>
  authenticateWithGoogle: (type: 'signup' | 'signin') => Promise<void>
  authenticateWithTwitter: (type: 'signup' | 'signin') => Promise<void>
  authenticateWithFacebook: () => Promise<void>
  verifyEmail: () => Promise<void>
  getUserType: (id: string) => Promise<void>
  signUserOut: () => void
}

const AuthContext = createContext<IAuthState>({
  loading: false,
  userType: null,
  firebaseInitLoading: true,
  firebaseApp: null,
  firebaseAuth: null,
  firebaseAnalytics: null,
  firestoreDb: null,
  getUserType() {
    return null as any
  },
  authenticateWithEmailAndPassword() {
    return null as any
  },
  authenticateWithGoogle() {
    return null as any
  },
  authenticateWithTwitter() {
    return null as any
  },
  verifyEmail() {
    return null as any
  },
  authenticateWithFacebook() {
    return null as any
  },
  signUserOut() {},
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
  const [firebaseInitLoading, setFirebaseInitLoading] = useState<boolean>(true)
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(null)
  const [firebaseAuth, setFirebaseAuth] = useState<Auth>(null)
  const [firebaseAnalytics, setFirebaseAnalytics] = useState<Analytics>(null)
  const [firestoreDb, setFirestoreDb] = useState<Firestore>(null)
  const [userType, setUserType] = useState<UserType>(null)
  const createProfileQuery = useCreateProfile((rs: any) => {})
  const getUserTypeQuery = useGetUserType((rs: any) => {})
  const router = useRouter()
  const { errorMsg, notificationContext, successMsg } = useHvNotification()

  useEffect(() => {
    setFirebaseInitLoading(true)
    if (typeof window !== undefined) {
      let app = initializeApp(environment.FirebaseConfig)
      let auth = getAuth()
      let analytics = getAnalytics(app)
      let firestoreDb = getFirestore(app)

      setFirebaseApp(app)
      setFirebaseAuth(auth)
      setFirebaseAnalytics(analytics)
      setFirestoreDb(firestoreDb)

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFirebaseInitLoading(false)
          // console.log(user)
        } else {
          console.log('Signed Out')
        }
      })
    }
  }, [])

  const authenticateWithEmailAndPassword = (
    user: IAuthUserInput,
    type: 'signup' | 'signin',
  ): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      if (type == 'signup') {
        createUserWithEmailAndPassword(firebaseAuth, user.email, user.password)
          .then((userCredential) => {
            createProfileQuery[0]({ variables: { userId: userCredential.user.uid } }).then(
              (rs) => {
                if (rs?.data?.createProfile) {
                  resolve()
                  router.push('/')
                }
              },
            )
          })
          .catch((error) => {
            reject()
            console.log(error)
          })
          .finally(() =>
            setTimeout(() => {
              setLoading(false)
            }, 3000),
          )
      } else {
        signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
          .then((userCredential) => {
            resolve()
            console.log(userCredential)
            router.push('/')
          })
          .catch((error) => {
            reject()
            console.log(error)
          })
          .finally(() =>
            setTimeout(() => {
              setLoading(false)
            }, 3000),
          )
      }
    })
  }

  const authenticateWithFacebook = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const provider = new FacebookAuthProvider()
      signInWithPopup(firebaseAuth, provider)
        .then((rs) => {
          console.log(rs)
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const authenticateWithTwitter = (type: 'signup' | 'signin'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (type == 'signup') {
        const provider = new TwitterAuthProvider()
        signInWithPopup(firebaseAuth, provider)
          .then((rs) => {
            console.log(rs)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  const authenticateWithGoogle = (type: 'signup' | 'signin'): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (type == 'signup') {
        const provider = new GoogleAuthProvider()
        signInWithPopup(firebaseAuth, provider)
          .then((rs) => {
            console.log(rs)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    })
  }

  const getUserType = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserTypeQuery[0]({
        variables: {
          id,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.getUserProfile) {
            setUserType(rs?.data?.getUserProfile.userType)
            resolve()
          } else {
            reject()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  const verifyEmail = (): Promise<void> => {
    setLoading(true)
    return new Promise<void>((resolve, reject) => {
      sendEmailVerification(firebaseAuth.currentUser)
        .then(() => {
          successMsg('Success', 'Email sent successfully')
          resolve()
        })
        .catch((error) => {
          errorMsg('Error', error.message)
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const signUserOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        router.push('/auth/signin')
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <AuthContext.Provider
      value={{
        signUserOut,
        verifyEmail,
        userType,
        getUserType,
        authenticateWithFacebook,
        authenticateWithTwitter,
        authenticateWithGoogle,
        loading,
        authenticateWithEmailAndPassword,
        firebaseAnalytics,
        firebaseApp,
        firebaseAuth,
        firebaseInitLoading,
        firestoreDb,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </AuthContext.Provider>
  )
}

export { AuthContextProvider, useAuthContext }
