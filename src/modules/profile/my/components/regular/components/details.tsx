import React from 'react'
import { PersonalInfo } from './info'
import { Security } from './security'
import { ManageAccount } from './account'

export const ProfileDetails = ({ setShowModal }: any) => {
  return (
    <div className='w-full px-12 pt-8'>
      <div>
        <h1 className='font-extrabold text-3xl mb-1'>Profile</h1>
        <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p>

        <div className='w-[100%] bg-light-white rounded shadow-lg px-10 pt-8 pb-14'>
          <PersonalInfo setShowModal={setShowModal}/>
          <Security setShowModal={setShowModal}/>
          <ManageAccount/>
        </div>
      </div>
    </div>
  )
}
