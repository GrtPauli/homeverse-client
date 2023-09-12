import React from 'react'
import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { RegTours } from './tours';
import { RegTourRequests } from './tour-requests';

export const RegTourTab = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <p className='font-medium'>Tours</p>,
            children: <RegTours/>,
        },
        {
            key: '2',
            label: <p className='font-medium'>Tour Requests</p>,
            children: <RegTourRequests/>,
        },
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
