import { gql } from '@apollo/client'

export const ListingFragment = gql`
  fragment Listing on Listing {
    _id
    price
    homeType
    description
    location {
      state
      city
      address
      zip
    }
    photos {
      id
      name
      uri
    }
    yearBuilt
    owner
    agent
    status
    bedrooms
    totalRooms
    garages
    bathrooms
    propertySize
    propertySizeUnit
    basementSqFt
    garageSqFt
    relatedWebsite
    virtualTourURL
    basement
    rooms
    floorCovering
    indoorFeatures
    appliances
    heatingType
    heatingFuel
    coolingType
    parking
    view
    roof
    exterior
    buildingAmenities
    architecturalStyle
    outdoorAmenities
    createdAt
    updatedAt
  }
`
