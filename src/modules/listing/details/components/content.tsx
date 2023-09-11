import React, { FC, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { EListingStatus, IListing } from '../../model'
import { Carousel, ConfigProvider, Tabs, TabsProps } from 'antd'
import { Image } from 'antd'
import { ListingOverview } from './overview'
import { ListingFeatures } from './features'
import { HvButton, HvModal } from '@/components'
import { RequestTour } from '@/modules/tour/components'

interface IProps {
    listing: Partial<IListing>
    agent?: boolean
}

interface IModalData {
  open: boolean
  content?: "date-picker" | "time-picker" | "confirm"
}

export const DetailsContent: FC<IProps> = ({listing, agent = false}) => {
    const [showModal, setShowModal] = useState<IModalData>(null)
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <p className="font-medium">Overview</p>,
          children: <ListingOverview listing={listing} />,
        },
        {
          key: '2',
          label: <p className="font-medium">Facts and Features</p>,
          children: <ListingFeatures listing={listing}/>,
        },
    ]

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
            colorPrimary: '#FF5A3D',
          },
        }}
      >
        <Carousel autoplay swipeToSlide dotPosition="left" pauseOnHover={false}>
          {listing.photos?.map((item, i) => (
            <div className="w-full h-[450px]" key={i}>
              <Image
                className="object-cover object-center"
                width="100%"
                height="100%"
                src={item.uri}
              />
            </div>
          ))}
        </Carousel>

        <div className="w-full flex items-start justify-center -translate-y-10 px-10 gap-5">
          <div className="w-[70%] bg-light-white rounded shadow-lg px-10 py-8">
            <div className="flex justify-between items-start mb-1">
              <CurrencyFormat
                value={listing.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value) => (
                  <h1 className="font-extrabold text-3xl text-primary">{value}</h1>
                )}
              />
              {/* <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p> */}
            </div>

            <div className="flex gap-3 items-center mb-5">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm">{EListingStatus[(listing.status as never)]}</p>
              </div>

              <div className="w-0.5 h-4 bg-gray-300"></div>
              <div className="text-sm flex items-center gap-2">
                <p>Listed on {moment(listing.createdAt).format(APP_DATE_TIME_FORMAT)}</p>
                <p>(85 days ago)</p>
              </div>
            </div>

            <Tabs defaultActiveKey="1" items={items} />
          </div>

          <div className="w-[30%] sticky top-28">
            {agent ? (
                <div className='bg-light-white rounded shadow-lg'>
                    <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                        Manage Listing
                    </h1>
                    
                    <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                    </p>

                    <div className="flex flex-col gap-5 px-5 py-5">
                        <HvButton paddingY="py-3.5" title="Edit Listing" />
                        <HvButton paddingY="py-3.5" title="Mark as Sold" />
                        <HvButton paddingY="py-3.5" title="Unlist Property" />
                    </div>
                </div>
            ) : (
                <div className='flex flex-col gap-5'>
                    <div className='bg-light-white rounded shadow-lg'>
                        <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                            Actions
                        </h1>
                        <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                        </p>

                        <div className="flex flex-col gap-5 px-5 py-5">
                            <HvButton onClick={() => setShowModal({ open: true, content: "date-picker" })} paddingY="py-3.5" title="Request a Tour" />
                            <HvButton paddingY="py-3.5" title="Contact Agent" />
                            <HvButton paddingY="py-3.5" title="Save Property" />
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </ConfigProvider>

      <HvModal
        width={400}
        open={showModal?.open}
        onDismiss={() => setShowModal({ open: false })}
        title='Request Tour With Agent'
      >
        <RequestTour showModal={showModal} setShowModal={setShowModal}/>
      </HvModal>
    </>
  )
}
