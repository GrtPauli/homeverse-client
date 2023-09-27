export interface ILocation {
  state: string
  city: string
  address: string
  zip: number
}

export interface IImage {
  uri: string
  name: string
  type: string
}

export interface IReview {
  rating: number
  comment: string
  name: string
  photo: string
  createdAt: number
  updatedAt: number
}

export interface IReviewInput {
  rating: number
  comment: string
  name: string
  photo: string
  createdAt?: number
  updatedAt?: number
}
