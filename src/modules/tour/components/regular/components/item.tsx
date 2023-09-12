import React, { FC } from 'react'
import HouseImg from "../../../../../assets/images/slide-3.jpg"
import { Image } from 'antd'
import { HvButton } from '@/components'

interface IProps {
    request?: boolean
    setDetailModal?: any
}

export const RegTourItem: FC<IProps> = ({ setDetailModal,  request = false }) => {
  return (
    <div className='pb-8 border-b pt-8'>
        <div className='w-full flex justify-between'>
            <div className='flex gap-5'>
                <Image
                    src={HouseImg.src}
                    width="250px"
                    height="150px" 
                    className='object-cover'           
                />

                <div className='flex flex-col justify-between h-[150px]'>
                    <div>
                        <div className='flex items-center mb-1 gap-5'>
                            <h1 className='font-bold text-lg leading-none'>House ID : DA34567</h1>
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-sm">Active</p>
                            </div>
                        </div>
                        <p className='font-bold text-primary text-base'>$50,000,000</p>
                    </div>

                    <div>
                        <p>Tour Method : In Person</p>
                        <p>Nigeria, Abuja, Kuje</p>
                        <p>House Listed On : 10 Sept, 2023 @ 10:00</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between h-[150px] items-end'>
                <div className='flex flex-col items-end'>
                    <p className='leading-none mb-2'>Tour Date : 10 Sept, 2023 @ 10:00</p>
                    <p>Tour Status : Pending</p>
                </div>

                <HvButton onClick={() => setDetailModal(true)} title="View Details"/>
            </div>
        </div>
    </div>
  )
}
