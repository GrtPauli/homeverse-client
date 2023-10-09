export interface IRental {
  _id: string
  ownerId: string
  homeType: string
  state: string
  city: string
  address: string
  zip: number
  creationStep: number
  creationSubStep: number
  createdAt: number
  updatedAt: number
}

export interface IRentalInput {
  ownerId: string
  homeType: string
  state: string
  city: string
  address: string
  zip: number
  creationStep: number
  creationSubStep: number
}
