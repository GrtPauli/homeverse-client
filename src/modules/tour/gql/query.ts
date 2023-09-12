import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { TourFragment } from './fragment'


const CREATE_TOUR_REQUEST = gql`
    mutation CreateTourRequest($tour: CreateTourInput!) {
        createTourRequest(tour: $tour) {
            _id
        }
    }
`

const UPDATE_TOUR = gql`
    mutation UpdateTour( $id: String!, $tour: UpdateTourInput!) {
        updateTour(id: $id, tour: $tour) {
            _id
        }
    }
`

const GET_TOURS = gql`
    query GetTours($input: GetToursInput!) {
        getTours(input: $input) {
            ...Tour
        }
    }
    ${TourFragment}
`

export const useCreateTourRequest = (callback: any) => {
    return useMutation(CREATE_TOUR_REQUEST, {
      onCompleted: (res: any) => {
        if (res.createTourRequest) {
          callback(res.createTourRequest)
        }
      },
      onError: (err: any) => {
        console.log(err)
      },
    })
}

export const useUpdateTour = (callback: any) => {
    return useMutation(UPDATE_TOUR, {
      onCompleted: (res: any) => {
        if (res.updateTour) {
          callback(res.updateTour)
        }
      },
      onError: (err: any) => {
        console.log(err)
      },
    })
}

export const useGetTours = (callback: any) => {
    return useLazyQuery(GET_TOURS, {
      fetchPolicy: "no-cache",
      onCompleted: (res) => {
        if(res.getTours){
          callback(res.getTours)
        }
      },
      onError: (err) => {
        console.log(err)
      }
    })
}