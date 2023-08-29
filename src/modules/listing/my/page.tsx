import { AgentHubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SaleListings } from './components/sale';
import { useListingContext } from '../context';
import { AppLoader, Button } from '@/components';
import { Image } from 'antd'
import NoHome from "../../../assets/images/no-home (1).png"

export const MyListingsPage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <p className='font-medium'>For Sale</p>,
            children: <SaleListings/>,
        },
        {
            key: '2',
            label: <p className='font-medium'>For Rent</p>,
            children: 
            <div className='flex flex-col gap-5 justify-center items-center py-20'>
                <div className='h-[150px] w-[150px]'>
                    <Image
                        preview={false}
                        className='object-cover'
                        width="100%"
                        height="100%" 
                        src={NoHome.src}
                    />
                </div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, soluta.</p>

                <div className='w-[200px]'>
                    <Button
                        title="Create New Listing"
                    />
                </div>
            </div>,
        },
    ];

    const {getUserListings, loading, userListings} = useListingContext()
    useEffect(() => {
      getUserListings()
    }, [])

    console.log(userListings);
    
    return(
        <>
            {loading && (
                <div className='flex h-screen w-full justify-center items-center'>
                    <AppLoader loading={loading} size='lg'/>
                </div>
            )}

            {!loading && (
                <AgentHubLayout>
                    <div className='w-full flex justify-center'>
                        <div className='w-[100%] bg-light-white rounded shadow-lg px-10 py-8'>
                            <h1 className='font-extrabold text-3xl mb-1'>Listings</h1>
                            <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p>

                                <ConfigProvider
                                    theme={{
                                        token: {
                                            fontFamily: "",
                                            colorPrimary: "#FF5A3D"
                                        },
                                    }}
                                >
                                    <Tabs defaultActiveKey="1" items={items} />
                                </ConfigProvider>
                        </div>
                    </div>
                </AgentHubLayout>
            )}
        </>
    )
}
