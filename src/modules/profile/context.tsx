import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IProfile, IUser } from './model'
import { useGetMe, useGetMyProfile, useGetMyProfilePic, useGetUser, useGetUserProfile, useUpdateProfile, useUpdateUser } from './gql/query'

interface IProfileState {
  loading: boolean
  updateLoading: boolean
  profilePicLoading: boolean
  updateUser: (user: IUser) => Promise<void>
  updateProfile: (profile: IProfile) => Promise<void>
  getUser: (id: string) => Promise<void>
  getUserProfile: (id: string) => Promise<void>
  getUserInfo: (id: string) => Promise<void>
  getMe: () => Promise<void>
  getMyProfile: () => Promise<void>
  getMyProfilePic: () => Promise<void>
  getMyInfo: () => Promise<void>
  user: Partial<IUser>
  profile: Partial<IProfile>
  profilePic: string
}

const ProfileContext = createContext<IProfileState>({
  loading: true,
  updateLoading: false,
  profilePicLoading: false,
  updateUser(user) {
      return null as any
  },
  updateProfile(){
    return null as any
  },
  getUser(id) {
    return null as any
  },
  getUserProfile(id) {
    return null as any
  },
  getUserInfo(id) {
    return null as any
  },
  getMe() {
    return null as any
  },
  getMyInfo() {
    return null as any
  },
  getMyProfile() {
    return null as any
  },
  getMyProfilePic() {
    return null as any
  },
  user: {},
  profilePic: '',
  profile: {}
})

const useProfileContext = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const ProfileContextProvider: FC<IProps> = ({ children }) => {
  const updateUserQuery = useUpdateUser((rs: any) => {})
  const updateProfileQuery = useUpdateProfile((rs: any) => {})
  const getUserQuery = useGetUser((rs: any) => {})
  const getUserProfileQuery = useGetUserProfile((rs: any) => {})
  const getMeQuery = useGetMe((rs: any) => {})
  const getMyProfileQuery = useGetMyProfile((rs: any) => {})
  const getMyProfilePicQuery = useGetMyProfilePic((rs: any) => {})
  

  const [loading, setLoading] = useState<boolean>(true)
  const [updateLoading, setUpdateLoading] = useState<boolean>(true)
  const [profilePicLoading, setProfilePicLoading] = useState<boolean>(false)
  const [profilePic, setProfilePic] = useState<string>('')
  const [user, setUser] = useState<Partial<IUser>>({})
  const [profile, setProfile] = useState<Partial<IProfile>>({})

  const router = useRouter()

  const updateUser = (user: IUser): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
        updateUserQuery[0]({
            variables: {
                user,
            },
        }).then(async (rs) => {
            if (rs?.data?.updateUser) {
                console.log(rs?.data?.updateUser)
                router.push('/')
                resolve()
            }
            reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const updateProfile = (profile: IProfile): Promise<void> => {
    setUpdateLoading(true)
    return new Promise((resolve, reject) => {
        updateProfileQuery[0]({
            variables: {
              profile,
            },
        }).then(async (rs) => {
            if (rs?.data?.updateProfile) {
                // console.log(rs?.data?.updateProfile)
                // router.push('/')
                resolve()
            }
            reject()
        })
        .finally(() => setUpdateLoading(false))
    })
  } 

  const getUser = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserQuery[0]({
            variables: {
                id,
            },
        }).then(async (rs) => {
            if (rs?.data?.getUser) {
                setUser(rs?.data?.getUser)
                resolve()
            }
            reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getUserProfile = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserProfileQuery[0]({
            variables: {
                id,
            },
      }).then(async (rs) => {
          if (rs?.data?.getUserProfile) {
              setProfile(rs?.data?.getUserProfile)
              resolve()
          }
          reject()
      })
      .finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  const getUserInfo = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserQuery[0]({
            variables: {
                id,
            },
        }).then(async (rs) => {
            if (rs?.data?.getUser) {
                setUser(rs?.data?.getUser)
                getUserProfileQuery[0]({
                    variables: {
                        id,
                    },
                }).then(async (rs) => {
                    if (rs?.data?.getUserProfile) {
                        setProfile(rs?.data?.getUserProfile)
                        resolve()
                    }
                    reject()
                })
            }
        }).finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  const getMe = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMeQuery[0]().then(async (rs) => {
            if (rs?.data?.getMe) {
                setUser(rs?.data?.getMe)
                resolve()
            }
            reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getMyProfile = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMyProfileQuery[0]().then(async (rs) => {
            if (rs?.data?.getMyProfile) {
                setProfile(rs?.data?.getMyProfile)
                resolve()
            }
            reject()
      })
      .finally(() => setLoading(false))
    })
  }

  const getMyProfilePic = (): Promise<void> => {
    setProfilePicLoading(true)
    return new Promise((resolve, reject) => {
      getMyProfilePicQuery[0]().then(async (rs) => {
          if (rs?.data?.getMyProfile) {
            setProfilePic(rs?.data?.getMyProfile?.photo)
            resolve()
          }
          reject()
      })
      .finally(() => setProfilePicLoading(false))
    })
  }

  const getMyInfo = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getMeQuery[0]().then(async (rs) => {
          if (rs?.data?.getMe) {
              setUser(rs?.data?.getMe)
              getMyProfileQuery[0]().then(async (rs) => {
                  if (rs?.data?.getMyProfile) {
                      setProfile(rs?.data?.getMyProfile)
                      resolve()
                  }
                  reject()
              })
          }
      }).finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  return (
    <ProfileContext.Provider
      value={{
        profilePic,
        profilePicLoading,
        getMyProfilePic,
        loading,
        updateLoading,
        updateUser,
        getUser,
        getUserProfile,
        profile,
        user,
        getUserInfo,
        getMe,
        getMyInfo,
        getMyProfile,
        updateProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContextProvider, useProfileContext }