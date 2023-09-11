import { AgentHubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SaleListings } from './components/sale';
import { useListingContext } from '../context';
import { HvLoader, HvButton } from '@/components';
import { Image } from 'antd'
import NoHome from "../../../assets/images/no-home (1).png"
import { useAuthContext } from '@/modules/auth/context';
import { NoListing } from '../components';

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
            children: <NoListing/>,
        },
    ];

    const {getUserListings, loading, userListings} = useListingContext()
    const { firebaseInitLoading, firebaseAuth } = useAuthContext()

    useEffect(() => {
        if(firebaseInitLoading == false){            
            getUserListings(firebaseAuth?.currentUser?.uid)
        }
    }, [firebaseInitLoading])
    
    return(
        <>
            {loading && (
                <div className='flex h-screen w-full justify-center items-center'>
                    <HvLoader loading={loading} size='lg'/>
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
