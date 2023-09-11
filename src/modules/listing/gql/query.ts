import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { ListingFragment } from './fragment'


const CREATE_LISTING = gql`
    mutation CreateListing($userId: String!, $listing: CreateListingInput!) {
        createListing(userId: $userId, listing: $listing) {
            _id
        }
    }
`

const GET_USER_LISTINGS = gql`
  query GetUserListings($userId: String!){
    getUserListings(userId: $userId){
      ...Listing
    }
  }
  ${ListingFragment}
`

const GET_LISTINGS = gql`
  query GetUserListings{
    getListings{
      ...Listing
    }
  }
  ${ListingFragment}
`

const GET_LISTING = gql`
  query GetListing($id: String!) {
    getListing(id: $id) {
      ...Listing
    }
  }
  ${ListingFragment}
`

export const useCreateListing = (callback: any) => {
    return useMutation(CREATE_LISTING, {
      onCompleted: (res: any) => {
        if (res.createListing) {
          callback(res.createListing)
        }
      },
      onError: (err: any) => {
        console.log(err)
      },
    })
}

export const useGetUserListings = (callback: any) => {
  return useLazyQuery(GET_USER_LISTINGS, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if(res.getUserListings){
        callback(res.getUserListings)
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })
}
export const useGetListings = (callback: any) => {
  return useLazyQuery(GET_LISTINGS, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if(res.getListings){
        callback(res.getListings)
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })
}
export const useGetListing = (callback: any) => {
  return useLazyQuery(GET_LISTING, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if(res.getListing){
        callback(res.getListing)
      }
    },
    onError: (err) => {
      console.log(err)
    }
  })
}