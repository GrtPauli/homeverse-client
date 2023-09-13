import React from 'react'
import BuyImg from '../../../../assets/images/buy.jpg'
import { RegTourTab } from './components'

export const RegularPageContent = () => {

  return (
    <div>
      <div
        className="bg-center bg-cover h-[350px] w-full"
        style={{ backgroundImage: `url(${BuyImg.src})` }}
      >
        <div className="text-light-white px-14 py-10">
          <h1 className="font-extrabold text-3xl mb-3">Tours</h1>
          <p className="w-[500px] leading-7 font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde excepturi
            voluptatem. Doloribus, neque. Iste ad saepe corrupti quibusdam blanditiis?
          </p>
        </div>
      </div>

      <div className="px-10">
        <div className="bg-light-white w-full -translate-y-10 shadow-lg rounded-lg px-10 pt-2">
          <RegTourTab/>
        </div>
      </div>
    </div>
  )
}
