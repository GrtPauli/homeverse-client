import React, { useState } from 'react'
import { RegTourItem } from './item'
import { HvEmpty, HvModal } from '@/components'
import HvSwitchInput from '@/components/input/switch'
import TourDetails from './details'
import { useTourContext } from '@/modules/tour/context'

export const Tours = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { tours } = useTourContext()  

  return (
    <>
      {/* <div>
        {tours.length > 0 && <Filter/>}
        {tours.length > 0 ? tours.map((item, i) => (
          <RegTourItem key={i} item={item} setDetailModal={setShowModal}/>
        )) : (<HvEmpty/>)}
      </div>

      <HvModal
        width={1000}
        title='Tour Details'
        open={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <TourDetails/>
      </HvModal> */}
    </>
  )
}


const Filter = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className='flex items-center gap-10 mt-2 mb-5'>
      <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Pending Tours Only'/>
      <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Completed Tours Only'/>
      <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Cancelled Tours Only'/>
    </div>
  )
}