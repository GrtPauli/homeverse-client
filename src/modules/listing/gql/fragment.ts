import { gql } from "@apollo/client";

export const ListingFragment = gql`
  fragment Listing on Listing {
    _id
    price
    homeType
    description
    country
    countryFlag
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
    totalGarages
    fullBathrooms
    threeFourBathrooms
    oneTwoBathrooms
    oneFourBathrooms
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
`;