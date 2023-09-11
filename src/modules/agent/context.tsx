import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useUpdateProfile } from "../profile/gql/query";
import { UserType } from "../profile/model";
import useHvNotification from "@/hooks/notification";
import { User, updateProfile } from "firebase/auth";

interface IAgentState{
    loading: boolean
    updateUserType: (id: string, currentUser: User, displayName: string, phone: string) => Promise<void>
}

const AgentContext = createContext<IAgentState>({
    loading: true,
    updateUserType(){
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
    const {errorMsg, notificationContext, successMsg} = useHvNotification()
    const [loading, setLoading] = useState<boolean>(true)

    const updateUserType = (id: string, currentUser: User, displayName: string, phone: string): Promise<void> => {
        setLoading(true)
        return new Promise((resolve, reject) => { 
            updateProfile(currentUser, {
                displayName
              }).then(() => {
                updateProfileQuery[0]({
                    variables: {
                      id,
                      profile: {userType: UserType[1], phone},
                    },
                }).then(async (rs) => {
                    if (rs?.data?.updateProfile) {
                        successMsg("Success", "Converted to agent account successfully")
                        resolve()
                    }else{
                        errorMsg("Error", "Convert to agent account failed")
                        reject()    
                    }
                })
                .finally(() => setTimeout(() => {setLoading(false)}, 3000))
              }).catch((error) => {
                console.log(error);
              })
        })
    }

    return (
        <AgentContext.Provider 
            value={{
                loading,
                updateUserType
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