import React from 'react'

export const TourItemMenu = () => {
  return (
    <div className='w-[200px] px-1 py-1'>
        <button className='hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full'>
            <p>Chat With Tourist</p>
        </button>
        <button className='hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full'>
            <p>Update Status</p>
        </button>
        <button className='hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full'>
            <p>View House Details</p>
        </button>
    </div>
  )
}

