import { gql } from '@apollo/client'

export const RentalFragment = gql`
  fragment Rental on Rental {
    _id
    ownerId
    homeType
    state
    city
    address
    zip
    creationStep
    creationSubStep
    createdAt
    updatedAt
  }
`
