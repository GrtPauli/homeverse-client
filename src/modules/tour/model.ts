export interface ITourRequest {
    _id: string
    touristName: string
    touristId: string
    agentName: string
    agentId: string
    tourScheduledDate: number
    method: TourMethod
    propertyId: string
    propertyListingDate: number
    requestStatus: TourRequestStatus
    createdAt: number
    updatedAt: number
}

export interface ITour { 
    _id: string
    propertyImg: IImage
    price: number
    propertyLocation: ILocation
    propertyId: string
    propertyListingDate: number
    touristName: string
    touristId: string
    agentName: string
    agentId: string
    vcRoomId: string
    method: TourMethod
    tourStatus: TourStatus
    tourScheduledDate: number
    tourReview: IReview
    createdAt: number
    updatedAt: number 
}

export interface ICreateTourRequestInput{
    touristName: string
    touristId: string
    agentName: string
    agentId: string
    tourScheduledDate: number
    method: string
    propertyId: string
    propertyListingDate: number
}

export interface ICreateTourInput {
    propertyImg: IImage
    listingId: string
    price: number
    propertyLocation: ILocation
    listedAt: number
    tourist: string
    agent: string
    method: string
    tourScheduledDate: number
}

export interface IUpdateTourInput {
    vcUrl?: string
    requestStatus?: TourRequestStatus
    tourStatus?: TourStatus
    tourReview?: IReview
}

export interface IGetTourInfoInput {
    touristId?: string
    agentId?: string
}

export interface IGetToursInput {
    tourist?: string
    agent?: string
}

export interface IReview {
    rating: number
    review: string
    name: string
    image: IImage
    createdAt: number
    updatedAt: number
}

export interface IImage {
    id: string
    name: string
    uri: string
}

export interface ILocation {
    country: string
    countryFlag: string
    state: string
    city: string
}

export enum TourMethod {
    IN_PERSON,
    VIDEO_CALL
}

export enum TourRequestStatus {
    ACCEPTED,
    PENDING,
    CANCELLED
}

export enum TourStatus {
    COMPLETED,
    PENDING,
    CANCELLED
}