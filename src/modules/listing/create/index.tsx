import { ApFileInput, AppSelectInput, HvButton, LocationSelector, HvTextInput } from '@/components'
import { Form, Formik, FormikProps } from 'formik'
import React, { useState } from 'react'
import { Photos } from './components/form/photos'
import { HomeFacts } from './components/form/homefacts'
import Link from 'next/link'
import { AdditionalInfo } from './components/form/additionalInfo'
import { HomeType, IListingImage } from '@/modules/listing/model'
import { AgentHubLayout } from '@/components/layout/hub'
import { useListingContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'

export const CreateListingPage = ({ handleCreate }: any) => {
  const [country, setCountry] = useState<any>(null)
  const [countryFlag, setCountryFlag] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [city, setCity] = useState<any>(null)
  const [photos, setPhotos] = useState<IListingImage[]>([])
  const {createListing, loading} = useListingContext()
  const {firebaseAuth} = useAuthContext()

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
    createListing(firebaseAuth?.currentUser?.uid, {
      photos: photos.length > 0 ? photos : null,
      country: country?.name || null,
      countryFlag: country?.label?.props?.children[0]?.props?.src || null,
      state: state?.name || null,
      city: city?.name || null,
      ...val,
      yearBuilt: parseInt(val.yearBuilt)
    })
  }

  return (
    <AgentHubLayout>
      <div className='w-full flex justify-center'>
        <div className='w-full bg-light-white rounded shadow-lg px-10 py-8'>
            <h1 className='font-extrabold text-3xl mb-1'>Create New Listing</h1>
            <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p>
            <Formik
              initialValues={{
                price: null,
                homeType: null,
                description: null,
                yearBuilt: null,
                bedrooms: null,
                totalRooms: null,
                totalGarages: null,
                fullBathrooms: null,
                threeFourBathrooms: null,
                oneTwoBathrooms: null,
                oneFourBathrooms: null,
                propertySize: null,
                propertySizeUnit: null,
                basementSqFt: null,
                garageSqFt: null,
                relatedWebsite: null,
                virtualTourURL: null,
                rooms: null,
                floorCovering: null,
                indoorFeatures: null,
                appliances: null,
                basement: null,
                heatingType: null,
                heatingFuel: null,
                coolingType: null,
                parking: null,
                view: null,
                roof: null,
                exterior: null,
                buildingAmenities: null,
                architecturalStyle: null,
              }}
              onSubmit={handleSubmit}
            >
              {(props: FormikProps<any>) => (
                <Form className="mt-8">
                  <div className="mb-10">
                    <h1 className="font-bold text-lg border-b pb-3 mb-5">Primary Info</h1>
                    <div className="flex justify-between gap-8 mb-5">
                      <HvTextInput
                        label="Set Your Price"
                        name="price"
                        placeHolder="Enter Property Price"
                        type="number"
                      />
                      <AppSelectInput
                        options={HomeType}
                        name="homeType"
                        label="Home Type"
                      />
                    </div>
                    <HvTextInput
                      label="Describe Your Home"
                      name="description"
                      placeHolder="Enter a well detailed description of the property"
                      textarea
                    />

                    <div className="my-5">
                      <h1 className="text-dark-prussian-blue font-medium mb-3 text-[15px]">
                        Property Photos
                      </h1>
                      <ApFileInput
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

                  {/* <Photos pictures={photos} setPictures={setPhotos}/> */}
                  <div className="mb-10">
                    <h1 className="font-bold text-lg border-b pb-3 mb-5">Location</h1>
                    <LocationSelector
                      setCountry={setCountry}
                      country={country}
                      countryFlag={countryFlag}
                      setCountryFlag={setCountryFlag}
                      setState={setState}
                      state={state}
                      setCity={setCity}
                      city={city}
                    />
                  </div>

                  <HomeFacts />
                  <AdditionalInfo />
                  {/* <ContactInfo/> */}

                  <div className="flex justify-end items-center gap-5 mt-10">
                    <HvButton
                      type="button"
                      onClick={() => props.handleSubmit()}
                      title="Post Listing"
                      fullWidth={false}
                    />
                    <HvButton type="button" fullWidth={false}>
                      <Link href="/dashboard/listings">Cancel Listing</Link>
                    </HvButton>
                  </div>
                </Form>
              )}
            </Formik>
        </div>
        </div>
    </AgentHubLayout>  
  )
}
