import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ICreateTourInput, ITour } from "./model";
import { useCreateTourRequest } from "./gql/query";
import { useRouter } from "next/router";
import useHvNotification from "@/hooks/notification";

interface ITourState {
    loading: boolean
    initLoading: boolean
    createTourRequest: (tour: ICreateTourInput) => Promise<void>
}

const TourContext = createContext<ITourState>({
    loading: false,
    initLoading: true,
    createTourRequest(){
        return null as any
    },
})

const useTourContext = () => {
    const context = useContext(TourContext)
    if (context === undefined) {
      throw new Error('app dispatch must be used within app global provider')
    }
    return context
}

interface IProps {
    children: ReactNode
}

const TourContextProvider: FC<IProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [initLoading, setInitLoading] = useState<boolean>(true)

    const createTourRequestQuery = useCreateTourRequest((rs: any) => {})
    const {errorMsg, notificationContext, successMsg} = useHvNotification()
    const router = useRouter()

    const createTourRequest = (tour: ICreateTourInput): Promise<void> => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            createTourRequestQuery[0]({
                variables: {
                    tour,
                },
            }).then(async (rs) => {
                if (rs?.data?.createTourRequest) {
                    resolve()
                }
                else {
                    reject()
                }
            })
            .finally(() => setLoading(false))
        })
    } 

    return (
        <TourContext.Provider
            value={{
                loading,
                initLoading,
                createTourRequest
            }}
        >
            <>
                {notificationContext}
                {children}
            </>
        </TourContext.Provider>
    )
}

export { useTourContext, TourContextProvider }