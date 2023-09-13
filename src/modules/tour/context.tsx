import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ICreateTourInput, ICreateTourRequestInput, IGetTourInfoInput, IGetToursInput, ITour, ITourRequest, IUpdateTourInput, TourRequestStatus, TourStatus } from "./model";
import { useCreateTourRequest, useGetTourRequests, useGetTours, useUpdateTour, useUpdateTourRequestStatus } from "./gql/query";
import { useRouter } from "next/router";
import useHvNotification from "@/hooks/notification";

interface ITourState {
    loading: boolean
    initLoading: boolean
    tourRequests: ITourRequest[]
    tours: ITour[]
    createTourRequest: (request: ICreateTourRequestInput) => Promise<void>
    getTours: (input: IGetToursInput) => Promise<void>
    getTourInfo: (input: IGetTourInfoInput) => Promise<void>
    updateTourRequest: (id: string, requestStatus: TourRequestStatus) => Promise<void>
    updateTour: (tour: IUpdateTourInput) => Promise<void>
}

const TourContext = createContext<ITourState>({
    loading: false,
    initLoading: true,
    tourRequests: [],
    tours: [],
    createTourRequest(){
        return null as any
    },
    getTours(){
        return null as any
    },
    getTourInfo(){
        return null as any
    },
    updateTour(){
        return null as any
    },
    updateTourRequest(){
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
    const [tourRequests, setTourRequests] = useState<ITourRequest[]>([])
    const [tours, setTours] = useState<ITour[]>([])

    const createTourRequestQuery = useCreateTourRequest((rs: any) => {})
    const getToursQuery = useGetTours((rs: any) => {})
    const getTourRequestsQuery = useGetTourRequests((rs: any) => {})
    const updateTourQuery = useUpdateTour((rs: any) => {})
    const updateTourRequestQuery = useUpdateTourRequestStatus((rs: any) => {})
    const {errorMsg, notificationContext, successMsg} = useHvNotification()
    const router = useRouter()

    const createTourRequest = (request: ICreateTourRequestInput): Promise<void> => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            createTourRequestQuery[0]({
                variables: {
                    request,
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

    const getTourInfo = (input: IGetTourInfoInput): Promise<void> => {
        setInitLoading(true)
        return new Promise((resolve, reject) => {
            getTourRequests(input)
            .then(() => {
                resolve()
            })
            .finally(() => setInitLoading(false))
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
                    setTours(rs?.data?.getTours.filter((item: ITour) => item.tourStatus !== (TourStatus[0] as any)))
                    setTourRequests(rs?.data?.getTours.filter((item: ITour) => item.tourStatus == (TourStatus[0] as any)))

                    resolve()
                }
                else {
                    reject()
                }
            })
            .finally(() => setInitLoading(false))
        })
    }

    const getTourRequests = (input: IGetTourInfoInput): Promise<void> => {
        // setInitLoading(true)
        return new Promise((resolve, reject) => {
            getTourRequestsQuery[0]({
                variables: {
                    input,
                },
            }).then(async (rs) => {
                if (rs?.data?.getTourRequests) {
                    setTourRequests(rs?.data?.getTourRequests)
                    resolve()
                }
                else {
                    reject()
                }
            })
            // .finally(() => setInitLoading(false))
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

    const updateTourRequest = (id: string, requestStatus: TourRequestStatus): Promise<void> => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            updateTourRequestQuery[0]({
                variables: {
                    id,
                    request: {requestStatus},
                },
            }).then(async (rs) => {
                if (rs?.data?.updateTourRequestStatus) {
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
                updateTourRequest,
                getTourInfo,
                loading,
                initLoading,
                tourRequests,
                tours,
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