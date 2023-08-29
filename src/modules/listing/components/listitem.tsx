import React, { FC } from 'react'
import { Image } from 'antd'
import { CameraIcon, LocationIcon, VideoIcon } from '@/assets/icons'
import { Button } from '@/components'
import CurrencyFormat from 'react-currency-format';
import HouseImg from "../../../assets/images/slide-3.jpg"
import { IListing } from '../model';
import { useRouter } from 'next/router';

interface IProps {
    item: IListing
}

export const ListItem: FC<IProps> = ({ item }) => {
    const router = useRouter()

  return (
    <div className='bg-white rounded w-[380px] shadow-lg overflow-hidden'>
        <div className='w-full h-[200px]'>
            <Image
                className='rounded-t object-cover'
                width="100%"
                height="100%" 
                src={item.photos[0].uri}
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

            <div className='flex gap-2 mb-3 mt-1 text-[13px]'>
                <div className='flex items-center gap-1 border-r pr-2'>
                    <p>{item.bedrooms}</p>
                    <p>Bedrooms</p>
                </div>

                <div className='flex items-center gap-1 border-r pr-2'>
                    <p>{item.fullBathrooms + item.oneFourBathrooms + item.oneTwoBathrooms + item.threeFourBathrooms}</p>
                    <p>Bathrooms</p>
                </div>

                <div className='flex items-center gap-1'>
                    <CurrencyFormat 
                        value={item.propertySize} 
                        displayType={'text'} 
                        thousandSeparator={true} 
                        // prefix={'$'} 
                        // suffix=''
                        renderText={value => 
                            <p className=''>{value}</p>
                        } 
                    />
                    <p>{item.propertySizeUnit}</p>
                </div>
            </div>

            <div className='flex items-center gap-2 mb-5'>
                {/* <LocationIcon className='w-3 h-3 text-colors-cadet'/> */}
                <Image src={item.countryFlag} width='18px' height='18px'/>
                <p className='text-[13px] text-colors-cadet'>
                    {item.country} {" , "} {item.state} {" , "} {item.city}
                </p>
            </div>

            <Button
                paddingY='py-3.5'
                title="View Details"
                onClick={() => router.push(`/marketplace/property/${item._id}`)}
            />
        </div>
    </div>
  )
}
