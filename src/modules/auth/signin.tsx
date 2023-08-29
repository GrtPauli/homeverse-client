import React, { useState } from 'react'
import { AuthLayout, AuthMethodSelection, EmailSignin } from './components'
import { Form, Formik, FormikProps } from 'formik'
import { Button, PasswordInput, TextInput } from '@/components'
import Logo from '../../assets/images/logo2.png'
import Image from 'next/image'
import Link from 'next/link'
import { IUser } from './model'
import { useAuthContext } from './context'

export default function SigninPage() {
  const [showSelection, setShowSelection] = useState<boolean>(true)
  const [ showEmailMethod, setShowEmailMethod ] = useState<boolean>(false)

  const handleSignIn = (val: IUser) => {

  }

  return (
    <AuthLayout>
      <div className="w-full px-10 pb-10">
        {showSelection && (
            <AuthMethodSelection
              title='Welcome Back, Login'
              onClickEmail={() => { setShowSelection(false); setShowEmailMethod(true) }}
              footer={(
                <div className='mt-10'>
                  <div className="text-[13px] flex justify-center items-center gap-2">
                      <p>Don't have an account ?</p>
                      <Link href="/signup">
                          <p className='text-primary font-semibold'>Signup</p>
                      </Link>
                  </div>
                </div>
              )}
          />
        )}

        {showSelection == false && showEmailMethod == true && (
          <EmailSignin onBack={() => {setShowSelection(true); setShowEmailMethod(false) }}/>
        )}
      </div>
    </AuthLayout>
  )
}
