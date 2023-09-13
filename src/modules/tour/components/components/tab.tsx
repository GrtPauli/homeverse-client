import React from 'react'
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Tours } from './tours';
import { TourRequests } from './tour-requests';

export const TourTab = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <p className='font-medium'>Tour Requests</p>,
            children: <TourRequests/>,
        },
        {
            key: '2',
            label: <p className='font-medium'>Tours</p>,
            children: <Tours/>,
        }
    ];


  return (
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
  )
}
