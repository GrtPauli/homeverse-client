import { Footer, Header, HvLoader } from '@/components'
import React, { useEffect } from 'react'
import { CTA, Hero, Services } from './components'
import { useAuthContext } from '../auth/context'

export const HomePage = () => {
  const {loading, getUserType, firebaseInitLoading, firebaseAuth, userType} = useAuthContext()

  useEffect(() => {
    if(firebaseInitLoading == false){
      getUserType(firebaseAuth?.currentUser?.uid)
    }
  },[firebaseInitLoading])
  
  return (
    <>
        {loading && (
            <div className='flex h-screen w-full justify-center items-center'>
                <HvLoader loading={loading} size='lg'/>
            </div>
        )}

        {!loading && (
          <div className="w-full">
            <Header />
            <div className="pt-[100px]">
              <Hero />
              <Services />
              <CTA />
            </div>
            <Footer />
          </div>
        )}
    </>
  )
}
