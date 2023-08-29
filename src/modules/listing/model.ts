export interface IListing {
    _id: string
    price: number
    homeType: string
    description: string
    country: string
    countryFlag: string
    state: string
    city: string    
    photos: IListingImage[]
    yearBuilt: number
    owner: string
    agent: string
    status: ListingStatus
    bedrooms: number
    totalRooms: number
    totalGarages: number
    fullBathrooms: number
    threeFourBathrooms: number
    oneTwoBathrooms: number
    oneFourBathrooms: number
    propertySize: number
    propertySizeUnit: string
    basementSqFt: number
    garageSqFt: number
    relatedWebsite: string
    virtualTourURL: string
    basement: string
    rooms: string[]
    floorCovering: string[]
    indoorFeatures: string[]
    appliances: string[]
    heatingType: string[]
    heatingFuel: string[]
    coolingType: string[]
    parking: string[]
    view: string[]
    roof: string[]
    exterior: string[]
    buildingAmenities: string[]
    architecturalStyle: string
    outdoorAmenities: string[]
    createdAt: number
    updatedAt: number 
}

export interface IListingImage {
    id: string
    name: string
    uri: string
}

export enum EListingStatus {
    ACTIVE = "Active",
    SOLD = "Sold",
    IN_TRANSACTION = "In Transaction",
    UNLISTED = "Unlisted"
}

export enum LotUnit {
    SQ_FT = "Sq ft",
    ACRES = "Acres"
}

export const PropertySizeUnit = ["m²", "ft²"]
type ListingStatus = "ACTIVE" | "SOLD" | "IN_TRANSACTION" | "UNLISTED"
export const HomeType = ["Single Family", "Condo", "Townhouse", "Multi Family", "Apartment", "Mobile / Manufactured", "Coop Unit", "Vacant Land", "Other"]