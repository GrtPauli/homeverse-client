import { DashboardLayout, TextInput } from '@/components'
import Property1 from '../../assets/images/property-1.jpg'
import Image from 'next/image'
import { useEffect } from 'react'
import { Form, Formik, FormikProps } from 'formik'

export const MyListingsPage = () => {
  return (
    <DashboardLayout page="listings">
      <div className="px-10 w-full">
        <div className="bg-light-white shadow-lg py-10 px-10">
          <h1>For Sale by Owner Listing</h1>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {(props: FormikProps<any>) => (
              <Form>
                <div className="flex justify-between w-full">
                  <TextInput label="Set your price" name="price" />

                  <TextInput label="Set your price" name="price" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </DashboardLayout>
  )
}
