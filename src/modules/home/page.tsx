import { Footer, Header, HvLoader, RegularLayout } from '@/components'
import React, { useEffect } from 'react'
import { CTA, Hero, RecentlyViewed, Services } from './components'
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
          <RegularLayout>
            <div>
              <Hero />
              <RecentlyViewed/>
              <Services />
            </div>
          </RegularLayout>
        )}
    </>
  )
}
