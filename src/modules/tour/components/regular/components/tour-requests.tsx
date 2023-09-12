import React from 'react'
import { RegTourItem } from './item'
import { HvEmpty } from '@/components'
import { InfoCircleFilled } from '@ant-design/icons'
import { HvInfoIcon } from '@/assets/icons'

export const RegTourRequests = () => {
  return (
    <div>
        <div className='flex items-center gap-2 mb-5'>
            <HvInfoIcon className='text-blue-600'/>
            <p className='leading-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ad laudantium consectetur aperiam blanditiis delectus sapiente exercitationem fugiat.</p>
        </div>
        {/* <HvEmpty/> */}
        <RegTourItem/>
    </div>
  )
}
