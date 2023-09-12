import { gql, useLazyQuery, useMutation } from '@apollo/client'


const CREATE_TOUR_REQUEST = gql`
    mutation CreateTourRequest($tour: CreateTourInput!) {
        createTourRequest(tour: $tour) {
            _id
        }
    }
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
  