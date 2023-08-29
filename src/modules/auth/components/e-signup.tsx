import React, { FC } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { Button, PasswordInput, TextInput } from '@/components'
import Logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeftIcon } from '@/assets/icons'
import { useHvFirebaseContext } from '@/modules/firebase/context'

interface IProps {
    onBack: () => void
}

export const EmailSignup: FC<IProps> = ({ onBack }) => {
    
    const {fbCreateUserWithEmailAndPassword} = useHvFirebaseContext()

    const handleSignUp = (values: any) => {
        const name = `${values.firstname} ${values.lastname}`        
        fbCreateUserWithEmailAndPassword(
            name,
            values.email, 
            values.password
        )
    }


  return (
    <div className='w-full'>
        <button onClick={onBack} className='mt-5 flex items-center -ml-4 gap-2 text-primary'>
            <ChevronLeftIcon className='w-4 h-4'/>
            <p className='text-[13px] font-semibold'>Back</p>
        </button>

        <div className='flex justify-center items-center mt-3'>
            <Image src={Logo} alt="logo" width={180} height={100} />
        </div>

        <div className="mt-5">
            <h1 className="font-bold text-lg mb-1 text-center">Create New Account</h1>
            <p className="text-xs text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

            <div className='mt-8'>
                <Formik
                    // validationSchema={}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleSignUp}
                >
                    {(props: FormikProps<any>) => (
                    <Form>
                        <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-5">
                            <TextInput
                                labelSmall
                                name="firstname"
                                label="First Name"
                                // placeHolder="Enter your first name"
                            />

                            <TextInput
                                labelSmall
                                name="lastname"
                                label="Last Name"
                                // placeHolder="Enter your last name"
                            />

                            <TextInput
                                labelSmall
                                name="email"
                                label="Email"
                                // placeHolder="Enter your email address"
                            />

                            <PasswordInput labelSmall/>
                        </div>

                        <div className="mt-8">
                            <Button
                                type='button'
                                // loading={loading}
                                onClick={() => props.handleSubmit()}
                                title="Sign Up"
                            />

                            <div className="text-[13px] mt-5 flex justify-center items-center gap-2">
                                <p>Already have an account ?</p>
                                <Link href="/signin">
                                    <p className='text-primary font-semibold'>Log In</p>
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
  )
}