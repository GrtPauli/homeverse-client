import { gql } from "@apollo/client";

export const TourFragment = gql`
  fragment Tour on Tour {
    _id
    propertyImg {
        id
        name
        uri
    }
    listingId
    price
    propertyLocation {
        country
        countryFlag
        state
        city
    }
    listedAt
    tourist
    agent
    vcUrl
    method
    requestStatus
    tourStatus
    tourScheduledDay
    tourScheduledTime
    tourReview {
        rating
        review
        name
        image
        createdAt
        updatedAt
    }
    createdAt
    updatedAt
  }
`