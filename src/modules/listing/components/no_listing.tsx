import React, { useState } from 'react'
import Asset from '../../../assets/images/service-2.png'
import Image from 'next/image'
import { Button } from '@/components'

export const NoListing = ({ setShowCreate }: any) => {

  return (
    <div>
        <div className='bg-light-white shadow-lg py-14 px-10 flex flex-col justify-center items-center'>
            <Image src={Asset} alt='asset' width={200} height={200}/>

            <h1 className='font-extrabold text-3xl'>Create New Listing</h1>
            <p className='text-colors-cadet text-sm text-center mt-3 leading-relaxed'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo porro reiciendis itaque rem iure<br/>
                obcaecati voluptatibus odio magnam enim amet?
            </p>

            <div className='mt-8'>
                <Button
                    title="Create Asset"
                    onClick={() => setShowCreate(true)}
                />
            </div>
        </div>
    </div>
  )
}