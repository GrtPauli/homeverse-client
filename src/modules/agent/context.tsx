import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useUpdateProfile } from '../profile/gql/query'
import { UserType } from '../profile/model'
import useHvNotification from '@/hooks/notification'
import { User, updateProfile } from 'firebase/auth'
import { useGetAgents } from './gql/query'
import { IAgent, IFilterProfileInput } from './model'

interface IAgentState {
  loading: boolean
  agents: IAgent[]
  updateUserType: (
    id: string,
    currentUser: User,
    displayName: string,
    phone: string,
  ) => Promise<void>
  getAgents: (filter: IFilterProfileInput) => Promise<void>
}

const AgentContext = createContext<IAgentState>({
  loading: true,
  agents: [],
  updateUserType() {
    return null as any
  },
  getAgents() {
    return null as any
  },
})

const useAgentContext = () => {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const AgentContextProvider: FC<IProps> = ({ children }) => {
  const updateProfileQuery = useUpdateProfile((rs: any) => {})
  const getAgentsQuery = useGetAgents((rs: any) => {})
  const { errorMsg, notificationContext, successMsg } = useHvNotification()
  const [loading, setLoading] = useState<boolean>(true)
  const [agents, setAgents] = useState<IAgent[]>([])

  const updateUserType = (
    id: string,
    currentUser: User,
    displayName: string,
    phone: string,
  ): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      updateProfile(currentUser, {
        displayName,
      })
        .then(() => {
          updateProfileQuery[0]({
            variables: {
              id,
              profile: { userType: UserType[1], phone, displayName },
            },
          })
            .then(async (rs) => {
              if (rs?.data?.updateProfile) {
                successMsg('Success', 'Converted to agent account successfully')
                resolve()
              } else {
                errorMsg('Error', 'Convert to agent account failed')
                reject()
              }
            })
            .finally(() =>
              setTimeout(() => {
                setLoading(false)
              }, 3000),
            )
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  const getAgents = (filter: IFilterProfileInput): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getAgentsQuery[0]({ variables: { filter } })
        .then((rs) => {
          if (rs?.data?.getProfiles) {
            setAgents(rs?.data?.getProfiles)
            resolve()
          } else {
            reject()
          }
        })
        .finally(() =>
          setTimeout(() => {
            setLoading(false)
          }, 3000),
        )
    })
  }

  return (
    <AgentContext.Provider
      value={{
        loading,
        agents,
        getAgents,
        updateUserType,
      }}
    >
      <>
        {notificationContext}
        {children}
      </>
    </AgentContext.Provider>
  )
}

export { useAgentContext, AgentContextProvider }
