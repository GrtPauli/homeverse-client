import React, { FC } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { Button, PasswordInput, TextInput } from '@/components'
import Logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeftIcon } from '@/assets/icons'
import { useAuthContext } from '../context'
import { IUser } from '../model'
import { useHvFirebaseContext } from '@/modules/firebase/context'

interface IProps {
    onBack: () => void
}

export const EmailSignin: FC<IProps> = ({ onBack }) => {
    const { loading, logIn } = useAuthContext()
    const {fbsignInWithEmailAndPassword} = useHvFirebaseContext()

    const handleSignIn = (val: any) => {
        fbsignInWithEmailAndPassword(val.email, val.password)
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
                <h1 className="font-bold text-lg mb-1 text-center">Welcome Back, Login</h1>
                <p className="text-xs text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

                <div className="mt-8">
                    <Formik
                        // validationSchema={}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleSignIn}
                    >
                        {(props: FormikProps<any>) => (
                            <Form>
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col gap-5">
                                <TextInput
                                    labelSmall
                                    name="email"
                                    label="Email"
                                />

                                <PasswordInput labelSmall/>
                                </div>

                                <div className="mt-8">
                                    <Button
                                        // loading={loading}
                                        onClick={() => props.handleSubmit()}
                                        title="Login"
                                    />

                                    <div className='mt-8 flex flex-col gap-2'>
                                        <div className="text-[13px] flex justify-center items-center gap-2">
                                            <p>Forgotten Password ?</p>
                                            <Link href="/signup">
                                                <p className='text-primary font-semibold'>Reset</p>
                                            </Link>
                                        </div>

                                        <div className="text-[13px] flex justify-center items-center gap-2">
                                            <p>Don't have an account ?</p>
                                            <Link href="/signup">
                                                <p className='text-primary font-semibold'>Signup</p>
                                            </Link>
                                        </div>
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