import React, { FC } from 'react'
import HouseImg from "../../../../../assets/images/slide-3.jpg"
import { Image } from 'antd'
import { HvButton } from '@/components'
import { ITour, TourMethod } from '@/modules/tour/model'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import CurrencyFormat from 'react-currency-format';
import { MoreOutlined } from '@ant-design/icons'

interface IProps {
    request?: boolean
    setDetailModal?: any
    item: ITour
}

export const RegTourItem: FC<IProps> = ({ setDetailModal, item,  request = false }) => {
  return (
    <div className='pb-8 border-b pt-8'>
        <div className='w-full flex justify-between'>
            <div className='flex gap-5'>
                <Image
                    src={item.propertyImg.uri}
                    width="250px"
                    height="150px" 
                    className='object-cover'           
                />

                <div className='flex flex-col justify-between h-[150px]'>
                    <div>
                        <div className='flex items-center mb-1 gap-5'>
                            <h1 className='font-bold text-lg leading-none'>House ID : {item._id}</h1>
                            {/* <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-sm">Active</p>
                            </div> */}
                        </div>
                        <CurrencyFormat 
                            value={item.price} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            prefix={'$'} 
                            renderText={value => 
                                <h1 className='font-bold text-primary text-lg'>{value}</h1>
                            } 
                        />
                    </div>

                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <Image src={item.propertyLocation.countryFlag} width='18px' height='18px'/>
                            <p className='leading-none'>
                                {item.propertyLocation.country} {" , "} {item.propertyLocation.state} {" , "} {item.propertyLocation.city}
                            </p>
                        </div>
                        <p className='leading-none'>House Listed On : {moment(item.listedAt).format(APP_DATE_TIME_FORMAT)}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-between h-[150px] items-end'>
                <button>
                  <MoreOutlined className='text-2xl'/>
                </button>
                {/* <HvButton onClick={() => setDetailModal(true)} title="View Details"/> */}

                <div className='flex flex-col items-end gap-3'>
                    <p className='leading-none'>Tour Method : {item.method == (TourMethod[0] as any) ? "In Person" : "Video Call"}</p>
                    <p className='leading-none'>Request Status : {item.requestStatus}</p>
                    <p className='leading-none'>Tour Scheduled Date : {moment(item.tourScheduledDate).format(APP_DATE_TIME_FORMAT)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
