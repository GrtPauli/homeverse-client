import { Footer, Header, HvLoader, RegularLayout } from '@/components'
import React, { useEffect } from 'react'
import { AboutUs, CTA, Hero, NewListings, RecentlyViewed, Services, TopAgents } from './components'
import { useAuthContext } from '../auth/context'
import { useHomeContext } from './context'

export const HomePage = () => {
  const { loading, getUserType, firebaseInitLoading, firebaseAuth, userType } = useAuthContext()
  const { initLoading, newListings, topAgents, homePage } = useHomeContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserType(firebaseAuth?.currentUser?.uid).then(() => homePage())
    }
  }, [firebaseInitLoading])

  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <RegularLayout className="pt-[100px]">
          <div>
            <Hero />
            <NewListings />
            <TopAgents />
            {/* <RecentlyViewed /> */}
            <AboutUs />
            <Services />
            <CTA />
          </div>
        </RegularLayout>
      )}
    </>
  )
}
