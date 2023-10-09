import {
  HvButton,
  HvSelectInput,
  HvTextInput,
  ILocationInput,
  LocationSelector,
} from '@/components'
import { HomeType } from '@/modules/listing/model'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import HouseImg from '../../../../assets/images/service-1.png'
import { Image } from 'antd'

export const CreateInitModal = () => {
  const [location, setLocation] = useState<ILocationInput>({ city: null, state: null })

  return (
    <div className="p-2">
      <div className="flex items-center gap-3 mb-5">
        <Image src={HouseImg.src} width="150px" height="120px" />
        <div>
          <h1 className="font-black text-2xl">First, let's add your property</h1>
          <p>Once you add your property, you can list it for free on Zillow</p>
        </div>
      </div>

      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <div className="flex justify-between gap-8 mb-5">
            <HvSelectInput options={HomeType} name="homeType" label="Home Type" />
          </div>

          <LocationSelector location={location} setLocation={setLocation} />

          <div className="flex justify-between gap-8 my-5">
            <HvTextInput
              name="address"
              label="Street Address"
              placeHolder="Enter Street Address"
            />

            <HvTextInput name="zip" type="number" label="Zip Code" placeHolder="Enter Zip Code" />
          </div>

          <div className="flex justify-end pt-5">
            <HvButton title="Create Listing" fullWidth={false} />
          </div>
        </Form>
      </Formik>
    </div>
  )
}
