import { gql } from '@apollo/client'

export const HomePageFragment = gql`
  fragment HomePage on HomePage {
    newListings {
      _id
      price
      homeType
      description
      state
      city
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

    topAgents {
      _id
      userId
      displayName
      photo
      phone
      country
      countryFlag
      state
      city
    }
  }
`
