import { Footer, Header } from '@/components'
import React from 'react'
import { CTA, Hero, Services } from './components'

export const HomePage = () => {
  return (
    <div className='w-full'>
        <Header/>
        <div className='pt-[109px]'>
          <Hero/>
          <Services/>
          <CTA/>
        </div>
        <Footer/>
    </div>
  )
}