import { AgentHubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import { Carousel, ConfigProvider, Tabs, TabsProps } from 'antd'
import { Image } from 'antd'
import { ListingFeatures, ListingOverview } from './components'
import { useListingContext } from '../context'
import { AppLoader, Button } from '@/components'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { EListingStatus } from '../model'

export const ListingDetailPage = ({ id, marketplace }: any) => {
  const { loading, getListing, listing } = useListingContext()

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
    {
      key: '3',
      label: <p className="font-medium">Neighborhood Map</p>,
      children: <div></div>,
    },
    {
      key: '4',
      label: <p className="font-medium">Contact Seller's Agent</p>,
      children: <div></div>,
    },
  ]

  useEffect(() => {
    getListing(id)
  }, [])

  return (
    <>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <AppLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <AgentHubLayout containerClassName="bg-light-cultured-3 h-full pt-[60px] pb-[100px]">
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
                    <p className="text-sm">{EListingStatus[listing.status]}</p>
                  </div>

                  <div className="w-0.5 h-4 bg-gray-300"></div>
                  <div className="text-sm flex items-center gap-2">
                    <p>Listed on {moment(listing.createdAt).format(APP_DATE_TIME_FORMAT)}</p>
                    <p>(85 days ago)</p>
                  </div>
                </div>

                <Tabs defaultActiveKey="1" items={items} />
              </div>

              <div className="w-[30%] sticky top-28 ">
                {marketplace ? (
                  <div className='flex flex-col gap-5'>
                    <div className='bg-light-white rounded shadow-lg'>
                        <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                            Actions
                        </h1>
                        <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                        </p>

                        <div className="flex flex-col gap-5 px-5 py-5">
                            <Button paddingY="py-3.5" title="Request a Tour" />
                            <Button paddingY="py-3.5" title="Contact Agent" />
                        </div>
                    </div>

                    <div className='bg-light-white rounded shadow-lg'>
                        <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                            Actions
                        </h1>
                        <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                        </p>

                        <div className="flex flex-col gap-5 px-5 py-5">
                            <Button paddingY="py-3.5" title="Save Property" />
                            <Button paddingY="py-3.5" title="Share Property" />
                        </div>
                    </div>
                  </div>
                ) : (
                  <div className='bg-light-white rounded shadow-lg'>
                    <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                      Manage Listing
                    </h1>
                    <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                    </p>

                    <div className="flex flex-col gap-5 px-5 py-5">
                      <Button paddingY="py-3.5" title="Edit Listing" />
                      <Button paddingY="py-3.5" title="Mark as Sold" />
                      <Button paddingY="py-3.5" title="Unlist Property" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ConfigProvider>
        </AgentHubLayout>
      )}
    </>
  )
}
