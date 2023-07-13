import React from 'react'
import { AuthLayout } from './components'
import { Form, Formik, FormikProps } from 'formik'
import { Button, PasswordInput, TextInput } from '@/components'
import Logo from '../../assets/images/logo2.png'
import Image from 'next/image'
import Link from 'next/link'
import { IUser } from './model'
import { useAuthContext } from './context'
import useNotification from '@/hooks/notification'

export default function SignUpPage() {
  const { signUp, loading } = useAuthContext()
  const { successMsg, errorMsg, notificationContext } = useNotification()

  const handleSignUp = (val: IUser) => {
    console.log(val)
    signUp(val).catch(() => {
      errorMsg('Error', 'This is an error')
    })
  }

  return (
    <AuthLayout>
      {notificationContext}
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div>
            <Image src={Logo} alt="logo" width={200} height={100} />
          </div>

          <div className="bg-light-white h-[90vh] w-[500px] rounded px-10 py-8">
            <div className="border-b pb-3 mb-5">
              <h1 className="font-bold text-2xl mb-1">Create New Account</h1>
              <p className="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <Formik
              // validationSchema={}
              initialValues={{
                username: '',
                email: '',
                password: '',
              }}
              onSubmit={handleSignUp}
            >
              {(props: FormikProps<any>) => (
                <Form>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                      <TextInput
                        name="username"
                        label="Username"
                        placeHolder="Enter your username"
                      />

                      <TextInput
                        name="email"
                        label="Email"
                        placeHolder="Enter your email address"
                      />

                      <PasswordInput />
                    </div>

                    <div className="mt-8">
                      <Button
                        loading={loading}
                        onClick={() => props.handleSubmit()}
                        title="Sign Up"
                      />

                      <div className="text-sm mt-5 flex flex-col justify-center items-center gap-3">
                        <Link href="/signin">
                          <p>Already have an account ?</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
