import React from 'react'
import { ListItem } from './listitem'
import { useListingContext } from '../context'

export const Content = () => {
  const { listings } = useListingContext()

  return (
    <div className='gap-14 pb-36'>
        <div className='bg-light-white w-full h-[60px] shadow-lg sticky top-24 z-[10]'>
            {/* <h1 className='border-b px-5 py-3 text-base font-bold'>Filter Listings</h1> */}
        </div>

        <div className='px-10 w-full flex flex-col justify-center items-center mt-14'>
            {/* <h1 className='font-extrabold text-2xl self-left'>Something Here</h1>
            <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ducimus.</p> */}
            <div className='flex gap-8'>
                {listings.map((item, i) => (
                  <ListItem item={item} key={i}/>
                ))}
            </div>
        </div>
    </div>
  )
}