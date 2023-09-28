import {
  HvTextInput,
  AppSelectInput,
  ApFileInput,
  HvButton,
  country,
  HvSelectInput,
  ILocationInput,
  LocationSelector,
} from '@/components'
import { Form, Formik, FormikProps } from 'formik'
import Link from 'next/link'
import { HomeType, IListing, IListingImage, PropertySizeUnit } from '../../model'
import { AdditionalInfo } from './additionalInfo'
import { HomeFacts } from './homefacts'
import { FC, useEffect, useState } from 'react'
import { useAuthContext } from '@/modules/auth/context'
import { useRouter } from 'next/router'
import { useListingContext } from '../../context'
import { years } from '@/constants/Helper'

interface IProps {
  id?: string
}

export const ListingForm: FC<IProps> = ({ id }) => {
  const [photos, setPhotos] = useState<IListingImage[]>([])
  const { createListing, loading, listing, updateListing } = useListingContext()
  const { firebaseAuth } = useAuthContext()
  const router = useRouter()
  const [location, setLocation] = useState<ILocationInput>({ city: null, state: null })

  const handleUpdatePhotos = async (res: any) => {
    const fls = photos

    for await (const file of res) {
      const exist = fls?.find((f: any) => f.id === file?.uid)
      if (!exist) {
        const fl: IListingImage = {
          id: file?.uid,
          name: file?.file?.name,
          uri: file?.uri,
        }
        fls.push(fl)
      }
    }
    setPhotos(fls)
  }

  const handleSubmit = (val: any) => {
    let yearBuilt = val?.yearBuilt.value
    let propertySizeUnit = val?.propertySizeUnit.value
    let homeType = val?.homeType.value

    delete val?.yearBuilt
    delete val?.propertySizeUnit
    delete val?.homeType

    if (id) {
      updateListing(id, {
        photos: photos.length > 0 ? photos : listing.photos,
        city: location.city?.name || listing.city,
        state: location.state?.name || listing.state,
        yearBuilt: yearBuilt || listing.yearBuilt,
        propertySizeUnit: propertySizeUnit || listing.propertySizeUnit,
        homeType: homeType || listing.homeType,
        ...val,
      }).then(() => router.push(`/dashboard/listings/detail/${id}`))
    } else {
      createListing({
        agentId: firebaseAuth?.currentUser?.uid,
        agent: {
          id: firebaseAuth?.currentUser?.uid,
          name: firebaseAuth?.currentUser?.displayName,
          photo: firebaseAuth?.currentUser?.photoURL
        },
        photos: photos.length > 0 ? photos : null,
        city: location.city?.name || null,
        state: location.state?.name || null,
        yearBuilt: yearBuilt || null,
        propertySizeUnit: propertySizeUnit || null,
        homeType: homeType || null,
        ...val,
      })
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="font-extrabold text-3xl mb-1">
          {listing ? 'Create Listing' : 'Edit Listing'}
        </h1>
        <p className="text-sm text-colors-cadet mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid
          asperiores veniam quia nesciunt neque magni, eveniet nulla?
        </p>
      </div>

      <div className="w-full bg-light-white rounded-lg shadow-lg px-10 pb-8 pt-1">
        <Formik
          initialValues={{
            price: listing?.price || null,
            homeType: listing?.homeType || null,
            description: listing?.description || null,
            yearBuilt: listing?.yearBuilt || null,
            bedrooms: listing?.bedrooms || null,
            totalRooms: listing?.totalRooms || null,
            garages: listing?.garages || null,
            bathrooms: listing?.bathrooms || null,
            address: listing?.address || null,
            zip: listing?.zip || null,
            propertySize: listing?.propertySize || null,
            propertySizeUnit: listing?.propertySizeUnit || null,
            basementSqFt: listing?.basementSqFt || null,
            garageSqFt: listing?.garageSqFt || null,
            relatedWebsite: listing?.relatedWebsite || null,
            virtualTourURL: listing?.virtualTourURL || null,
            rooms: listing?.rooms || null,
            floorCovering: listing?.floorCovering || null,
            indoorFeatures: listing?.indoorFeatures || null,
            appliances: listing?.appliances || null,
            basement: listing?.basement || null,
            heatingType: listing?.heatingType || null,
            heatingFuel: listing?.heatingFuel || null,
            coolingType: listing?.coolingType || null,
            parking: listing?.parking || null,
            view: listing?.view || null,
            roof: listing?.roof || null,
            exterior: listing?.exterior || null,
            buildingAmenities: listing?.buildingAmenities || null,
            architecturalStyle: listing?.architecturalStyle || null,
            outdoorAmenities: listing.outdoorAmenities || null,
          }}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className="mt-5">
              <div className="mb-10">
                <h1 className="font-bold text-lg border-b pb-3 mb-5">Primary Info</h1>
                <div className="flex justify-between gap-8 mb-5">
                  <HvTextInput
                    label="Set Your Price"
                    name="price"
                    placeHolder="Enter Property Price"
                    type="number"
                  />
                  <HvSelectInput options={HomeType} name="homeType" label="Home Type" />
                </div>
                <HvTextInput
                  label="Describe Your Home"
                  name="description"
                  placeHolder="Enter a well detailed description of the property"
                  textarea
                />
                <div className="my-5">
                  <ApFileInput
                    label="Property Photos"
                    title=""
                    // onRemove={(file) => setPhoto(null)}
                    maxCount={5}
                    accept={'image/*'}
                    inputId="photo"
                    onSelected={(res: any) => {
                      if (res) {
                        handleUpdatePhotos(res)
                      }
                    }}
                    className="my-4 bg-cyan-500 text-white rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="mb-10">
                <h1 className="font-bold text-lg border-b pb-3 mb-5">Location</h1>
                <LocationSelector location={location} setLocation={setLocation} />

                <div className="flex justify-between gap-8 mt-5 mb-5">
                  <HvTextInput
                    name="zip"
                    type="number"
                    label="Zip Code"
                    placeHolder="Enter Zip Code"
                  />
                  <HvTextInput
                    name="address"
                    label="Street Address"
                    placeHolder="Enter Street Address"
                  />
                </div>
              </div>

              <HomeFacts />
              <AdditionalInfo />

              <div className="flex justify-end items-center gap-5 mt-10">
                {id ? (
                  <Link href={`/dashboard/listings/detail/${id}`}>
                    <HvButton outline type="button" fullWidth={false}>
                      Cancel
                    </HvButton>
                  </Link>
                ) : (
                  <Link href={`/dashboard/listings`}>
                    <HvButton outline type="button" fullWidth={false}>
                      Cancel
                    </HvButton>
                  </Link>
                )}

                <HvButton
                  loading={loading}
                  type="button"
                  onClick={() => props.handleSubmit()}
                  title="Proceed"
                  fullWidth={false}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
