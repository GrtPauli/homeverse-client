import React, { useState } from 'react'
import { RegTourItem } from './item'
import { HvEmpty, HvModal } from '@/components'
import HvSwitchInput from '@/components/input/switch'
import TourDetails from './details'

export const RegTours = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <div>
        <div className='flex items-center gap-10 mt-2 mb-5'>
          <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Pending Tours Only'/>
          <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Completed Tours Only'/>
          <HvSwitchInput setChecked={setChecked} checked={checked} label='Show Cancelled Tours Only'/>
        </div>

                    {/*<HvEmpty/>*/}
          <RegTourItem setDetailModal={setShowModal}/>
          <RegTourItem/>
      </div>

      <HvModal
        width={1000}
        title='Tour Details'
        open={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <TourDetails/>
      </HvModal>
    </>
  )
}
