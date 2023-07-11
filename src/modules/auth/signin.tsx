import React from 'react'
import { AuthLayout } from './components'
import { Formik, FormikProps } from "formik"
import { PasswordInput, TextInput } from '@/components'
import Logo from '../../assets/images/logo2.png'
import Image from 'next/image'
import Link from 'next/link'

export default function SigninPage(){
  return (
    <AuthLayout>
      <div className='w-full'>
        <div className='flex justify-between w-full'>
            <div>
              <Image src={Logo} alt='logo' width={200} height={100}/>
            </div>

            <div className='bg-light-white h-[80vh] w-[500px] rounded px-10 py-8'>
                <div className='border-b pb-3 mb-5'>
                  <h1 className='font-bold text-2xl mb-1'>Welcome Back</h1>
                  <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <Formik
                  // validationSchema={}
                  initialValues={{

                  }}
                  onSubmit={() => {}}
                >
                  {(props: FormikProps<any>) => (
                    <div className='flex flex-col justify-between'>
                      <div className='flex flex-col gap-3'>
                        <TextInput
                          name='email'
                          label='Email'
                          placeHolder='Enter your email address'
                        />

                        <PasswordInput/>
                      </div>

                      <div className='mt-8'>
                        <button className='bg-primary py-2.5 w-full rounded text-light-white font-bold'>
                          Sign In
                        </button>

                        <div className='text-sm mt-5 flex flex-col justify-center items-center gap-3'>
                          <Link href='/signup'>
                            <p>Don't have an account ?</p>
                          </Link>
                          <p>Forgot your password ?</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Formik>
            </div>
        </div>
      </div>
    </AuthLayout>
  )
}
