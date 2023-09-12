import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ICreateTourInput, IGetToursInput, ITour, IUpdateTourInput } from "./model";
import { useCreateTourRequest, useGetTours, useUpdateTour } from "./gql/query";
import { useRouter } from "next/router";
import useHvNotification from "@/hooks/notification";

interface ITourState {
    loading: boolean
    initLoading: boolean
    createTourRequest: (tour: ICreateTourInput) => Promise<void>
    getTours: (input: IGetToursInput) => Promise<void>
    updateTour: (tour: IUpdateTourInput) => Promise<void>
}

const TourContext = createContext<ITourState>({
    loading: false,
    initLoading: true,
    createTourRequest(){
        return null as any
    },
    getTours(){
        return null as any
    },
    updateTour(){
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
    const getToursQuery = useGetTours((rs: any) => {})
    const updateTourQuery = useUpdateTour((rs: any) => {})
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

    const getTours = (input: IGetToursInput): Promise<void> => {
        setInitLoading(true)
        return new Promise((resolve, reject) => {
            getToursQuery[0]({
                variables: {
                    input,
                },
            }).then(async (rs) => {
                if (rs?.data?.getTours) {
                    resolve()
                }
                else {
                    reject()
                }
            })
            .finally(() => setInitLoading(false))
        })
    }

    const updateTour = (tour: IUpdateTourInput): Promise<void> => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            updateTourQuery[0]({
                variables: {
                    tour,
                },
            }).then(async (rs) => {
                if (rs?.data?.updateTour) {
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
                getTours,
                updateTour,
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