export interface ITour {
    _id: string
    propertyImg: IImage
    listingId: string
    price: number
    propertyLocation: ILocation
    listedAt: number
    tourist: string
    agent: string
    vcUrl: string
    method: TourMethod
    requestStatus: TourRequestStatus
    tourStatus: TourStatus
    tourScheduledDay: string
    tourScheduledTime: string
    tourReview: IReview
    createdAt: number
    updatedAt: number 
}

export interface ICreateTourInput {
    propertyImg: IImage
    listingId: string
    price: number
    propertyLocation: ILocation
    listedAt: number
    tourist: string
    agent: string
    method: TourMethod
    tourScheduledDay: string
    tourScheduledTime: string
}

export interface IUpdateTourInput {
    vcUrl?: string
    requestStatus?: TourRequestStatus
    tourStatus?: TourStatus
    tourReview?: IReview
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
    REQUEST_NOT_ACCEPTED,
    COMPLETED,
    PENDING,
    CANCELLED
}