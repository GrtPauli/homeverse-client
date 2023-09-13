import React from 'react'
import { TourTab } from '../components'


export const AgentPageContent = () => {
    return (
        <div>
            <h1 className='font-extrabold text-3xl mb-1'>Tours</h1>
            <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p>

            <div className='w-[100%] bg-light-white rounded-lg shadow-lg px-10 py-5'>
                <TourTab/>
            </div>
        </div>
    )
}