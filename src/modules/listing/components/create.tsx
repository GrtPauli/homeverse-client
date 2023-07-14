import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import PhoneImg from '../../../assets/images/phone.png'
import HouseInfo from '../../../assets/images/house-info.png'
import Images from '../../../assets/images/images.png'
import Property1 from '../../../assets/images/property-1.jpg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button, TextInput } from '@/components'
import { SelectPhotos } from './select_photos'

export const CreateListing = ({ setShowCreate }: any) => {

    const [pictures, setPictures] = useState<string[]>([])

  return (
    <div>
        <div className="bg-light-white shadow-lg py-10 px-10 my-[50px]">
            <h1 className="font-extrabold text-3xl mb-2">Sale by Owner Listing</h1>
            <p className="mb-8 text-sm text-colors-cadet">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, hic. Nesciunt explicabo
                repudiandae inventore quos.
            </p>

            <Formik initialValues={{}} onSubmit={() => {}}>
                {(props: FormikProps<any>) => (
                    <Form>
                    <div className="flex justify-between gap-8">
                        <TextInput label="Set Your Price" name="price" placeHolder="$" />
                        <TextInput label="Location" name="location" placeHolder="Enter House Location" />
                    </div>

                    <div className="mt-10">
                        <div className="flex justify-between items-center border-t border-colors-cadet/70 border-b py-3 mb-5">
                        <h1 className="text-dark-prussian-blue  font-extrabold text-xl">Photos</h1>
                        <Image src={Images} alt="phone" width={30} height={50} />
                        </div>
                        <p className="text-sm text-colors-cadet mb-5 leading-7">
                        Potential buyers will contact you through the email address you use to register
                        on Zillow. You must also add your phone number to the listing here.
                        </p>

                        <SelectPhotos pictures={pictures} setPictures={setPictures} />
                    </div>

                    <div className="mt-14">
                        <div className="flex justify-between items-center border-t border-colors-cadet/70 border-b py-3 mb-5">
                        <h1 className="text-dark-prussian-blue  font-extrabold text-xl">Home Facts</h1>
                        <Image src={HouseInfo} alt="phone" width={30} height={50} />
                        </div>
                        <p className="text-sm text-colors-cadet mb-5 leading-7">
                        Potential buyers will contact you through the email address you use to register
                        on Zillow. You must also add your phone number to the listing here.
                        </p>

                        {/* <div className="mt-5">
                        <SelectInput isMulti isSearchable options={skills} name="skills" label='Home Type' placeholder="Select Your Home Type"/>
                        </div> */}

                        <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Beds" name="beds" placeHolder="Enter number of beds" />
                        <TextInput
                            label="Year Built"
                            name="yearBuilt"
                            placeHolder="Enter year built"
                        />
                        </div>

                        <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Full Baths" name="fullBaths" placeHolder="" />
                        <TextInput label="3 / 4 Baths" name="threeFourBaths" placeHolder="" />
                        </div>

                        <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="1 / 2 Baths" name="fullBaths" placeHolder="" />
                        <TextInput label="1 / 4 Baths" name="threeFourBaths" placeHolder="" />
                        </div>

                        <div className="flex flex-col gap-5 mb-5">
                        <TextInput label="Finished Square Feet" name="fullBaths" placeHolder="" />
                        <div className="flex justify-between gap-8">
                            <TextInput label="Lot Size" name="fullBaths" placeHolder="" />
                            <TextInput label="Lot Size Unit" name="threeFourBaths" placeHolder="" />
                        </div>
                        </div>

                        <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Basement sq. ft." name="fullBaths" placeHolder="" />
                        <TextInput label="Garage sq. ft." name="threeFourBaths" placeHolder="" />
                        </div>

                        <TextInput label="Describe Your Home" name="description" type="textarea" />
                    </div>

                    <div className="mt-14">
                        <div className="flex justify-between items-center border-t border-colors-cadet/70 border-b py-3 mb-5">
                        <h1 className="text-dark-prussian-blue  font-extrabold text-xl">
                            Contact Information
                        </h1>
                        <Image src={PhoneImg} alt="phone" width={30} height={50} />
                        </div>

                        <p className="text-sm text-colors-cadet mb-5 leading-7">
                        Potential buyers will contact you through the email address you use to register
                        on Zillow. You must also add your phone number to the listing here.
                        </p>

                        <TextInput label="Phone Number" name="description" />
                    </div>

                    <div className="flex justify-end items-center gap-5 mt-10">
                        <Button title="Post Listing" fullWidth={false} />
                        <Button type='button' onClick={() => setShowCreate(false)} title="Cancel Posting" fullWidth={false} />
                    </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}