import React, { FC } from 'react'
import { Image } from 'antd'
import HouseImg from "../../../assets/images/slide-2.jpg"
import { CameraIcon, LocationIcon, VideoIcon } from '@/assets/icons'
import { Button } from '@/components'
import { IListing } from '../../model'
import CurrencyFormat from 'react-currency-format';
import { useRouter } from 'next/router'

interface IProps {
    item: IListing
}

export const ListingItem: FC<IProps> = ({ item }) => {

    const router = useRouter()

  return (
    <div className='bg-white rounded w-[350px] shadow-md'>
        <div className='w-full h-[200px]'>
            <Image
                className='rounded-t object-cover'
                // preview={{
                //     maskClassName: "rounded-full"
                // }}
                width="100%"
                height="100%" 
                src={item.photos[0]}
            />
        </div>

        <div className='py-5 px-5'>
            <div className='flex justify-between'>
                <CurrencyFormat 
                    value={item.price} 
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    renderText={value => 
                        <h1 className='font-bold text-primary text-xl'>{value}</h1>
                    } 
                />
                <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                        <CameraIcon className='w-4 h-4 text-colors-cadet'/>
                        <p className='text-[13px] text-colors-cadet'>{item.photos.length}</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <VideoIcon className='w-4 h-4 text-colors-cadet'/>
                        <p className='text-[13px] text-colors-cadet'>3</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-3 mb-3 mt-1'>
                <div className='flex items-center gap-1 border-r pr-3'>
                    <div>
                        <p>{item.bedrooms}</p>
                    </div>
                    <p>Bedrooms</p>
                </div>

                <div className='flex items-center gap-1  border-r pr-3'>
                    <div>
                        <p>
                            {item.fullBathrooms + item.oneFourBathrooms + item.oneTwoBathrooms + item.threeFourBathrooms}
                        </p>
                    </div>
                    <p>Bathrooms</p>
                </div>

                <div className='flex items-center gap-1'>
                    <div>
                        <CurrencyFormat 
                            value={8720} 
                            displayType={'text'} 
                            thousandSeparator={true} 
                            // prefix={'$'} 
                            // suffix=''
                            renderText={value => 
                                <p className=''>{value}</p>
                            } 
                        />
                    </div>
                    <p>sqft</p>
                </div>
            </div>

            <div className='flex items-center gap-1 mb-5'>
                <LocationIcon className='w-4 h-4 text-colors-cadet'/>
                <p className='text-[13px] text-colors-cadet'>{item.location}</p>
            </div>

            <Button
                title="View Details"
                onClick={() => router.push(`/dashboard/listings/detail/${item._id}`)}
            />
        </div>
    </div>
  )
}
