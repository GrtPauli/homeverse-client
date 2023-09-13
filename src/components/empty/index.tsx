import React, { FC } from 'react'
import Empty from "../../assets/images/empty.png"
import Image from 'next/image'

interface IProps {
    className?: string
}

export const HvEmpty: FC<IProps> = ({ className }) => {
  return (
    <div className={`${className} flex w-full items-center justify-center flex-col gap-5 pt-10 pb-20`}>
        <Image
            src={Empty}
            alt='Empty Image'
            width={180}
        />
        <p className='font-medium'>No Data</p>
    </div>
  )
}
