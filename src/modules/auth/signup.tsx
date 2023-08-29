import React, { useState } from 'react'
import { AuthLayout, AuthMethodSelection, EmailSignup } from './components'

import { IUser } from './model'
import { useAuthContext } from './context'
import useNotification from '@/hooks/notification'
import Link from 'next/link'

export default function SignUpPage() {
  const { signUp, loading } = useAuthContext()
  const { successMsg, errorMsg, notificationContext } = useNotification()
  const [showSelection, setShowSelection] = useState<boolean>(true)
  const [ showEmailMethod, setShowEmailMethod ] = useState<boolean>(false)

  const handleSignUp = (val: IUser) => {
    console.log(val)
    signUp(val)
  }

  return (
    <AuthLayout>
      {notificationContext}
      <div className="w-full px-10 pb-10">
          {showSelection && (
             <AuthMethodSelection 
                title='Create New Account'
                onClickEmail={() => { setShowSelection(false); setShowEmailMethod(true) }}
                footer={(
                  <div className='mt-10'>
                    <div className="text-[13px] flex justify-center items-center gap-2">
                        <p>Already have an account ?</p>
                        <Link href="/signin">
                            <p className='text-primary font-semibold'>Log In</p>
                        </Link>
                    </div>
                  </div>
                )}
            />
          )}

          {showSelection == false && showEmailMethod == true && (
            <EmailSignup onBack={() => {setShowSelection(true); setShowEmailMethod(false) }}/>
          )}
      </div>
    </AuthLayout>
  )
}
