import React, { FormEvent, useState } from 'react'
import BgImage from "../../../../../assets/images/slide-4.jpg"
import { Button, SelectInput } from '@/components'
import { Form, Formik } from 'formik'
import { lgaList } from './model'

export const Selector = ({ location, setLocation, setShowMap }: any) => {
  const handleSubmit = (val: any) => {
    console.log(val);
    setLocation({
      state: val.state,
      lga: val.lga
    })
    setShowMap({ show: true })
  }

  return (
    // <div style={{ backgroundImage: `url(${BgImage.src})` }} className='bg-center bg-cover w-full h-[300px]'>

    // </div>
    <div className='mt-10'>
      <Formik
        initialValues={{
          state: location.state,
          lga: location.lga
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className='flex justify-between gap-5'>
            <SelectInput label='Select State' name='state'>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="AkwaIbom">AkwaIbom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="FCT">FCT</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamafara</option>
            </SelectInput>

            <SelectInput label='Select LGA' name='lga'>
              {
                lgaList[location.state].map((item: any, i: any) => (
                  <option value={item}>{item}</option>   
                ))
              }
            </SelectInput>
          </div>

          <div className='flex justify-end items-center mt-10 gap-5'>
            <Button
              type='submit'
              fullWidth={false}
              title="Verify Location"
            />

            <Button
              type='button'
              fullWidth={false}
              title="Cancel Process"
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}