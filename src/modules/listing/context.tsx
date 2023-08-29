import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { IListing } from './model'
import { useCreateListing, useGetListing, useGetListings, useGetUserListings } from './gql/query'

interface IListingState {
  loading: boolean
  createListing: (listing: IListing) => Promise<void>
  getUserListings: () => Promise<void>
  getListings: () => Promise<void>
  getListing: (id: string) => Promise<void>
  listing: Partial<IListing>
  listings: Partial<IListing[]>
  userListings: IListing[]
}

const ListingContext = createContext<IListingState>({
  loading: true,
  createListing(listing) {
    return null as any
  },
  getUserListings() {
    return null as any
  },
  getListing() {
    return null as any 
  },
  getListings() {
    return null as any 
  },
  userListings: [],
  listing: {},
  listings: []
})

const useListingContext = () => {
  const context = useContext(ListingContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface IProps {
  children: ReactNode
}

const ListingContextProvider: FC<IProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [userListings, setUserListings] = useState<IListing[]>([])
  const [listing, setListing] = useState<Partial<IListing>>({})
  const [listings, setListings] = useState<Partial<IListing[]>>([])

  const createListingQuery = useCreateListing((rs: any) => {})
  const getUserListingsQuery = useGetUserListings((rs: any) => {})
  const getListingQuery = useGetListing((rs: any) => {})
  const getListingsQuery = useGetListings((rs: any) => {})

  const router = useRouter()

  const createListing = (listing: IListing): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      createListingQuery[0]({
        variables: {
          listing,
        },
      })
        .then(async (rs) => {
          if (rs?.data?.createListing) {
            console.log(rs?.data?.createListing)
            resolve()
          }
          reject()
        })
        .finally(() => setLoading(false))
    })
  }

  const getUserListings = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getUserListingsQuery[0]()
      .then(async(rs) => { 
        if (rs?.data?.getUserListings) {
          setUserListings(rs?.data?.getUserListings)
          resolve()
        }
        reject()
      })
      .finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  const getListings = (): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getListingsQuery[0]()
      .then(async(rs) => { 
        if (rs?.data?.getListings) {
          setListings(rs?.data?.getListings)
          resolve()
        }
        reject()
      })
      .finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  const getListing = (id: string): Promise<void> => {
    setLoading(true)
    return new Promise((resolve, reject) => {
      getListingQuery[0]({ variables: { id } })
      .then(async(rs) => { 
        if (rs?.data?.getListing) {
          setListing(rs?.data?.getListing)
          resolve()
        }
        reject()
      })
      .finally(() => setTimeout(() => {setLoading(false)}, 3000))
    })
  }

  return (
    <ListingContext.Provider
      value={{
        getListings,
        listings,
        loading,
        createListing,
        getUserListings,
        userListings,
        getListing,
        listing
      }}
    >
      {children}
    </ListingContext.Provider>
  )
}

export { ListingContextProvider, useListingContext }
