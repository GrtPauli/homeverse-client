import { gql } from "@apollo/client";

export const TourRequestFragment = gql`
  fragment TourRequest on TourRequest {
    _id
    touristName
    touristId
    agentName
    agentId
    tourScheduledDate
    method
    propertyId
    propertyListingDate
    requestStatus
    createdAt
    updatedAt
  }
`

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
    tourScheduledDate
    tourReview {
        rating
        review
        name
        image {
          id
          name
          uri
        }
        createdAt
        updatedAt
    }
    createdAt
    updatedAt
  }
`