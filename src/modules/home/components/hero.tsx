import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { ConfigProvider, Empty, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { HvSearchIcon } from '@/assets/icons'
import Link from 'next/link'

interface IProps {
  tab: string
  bgImg: any
  title: string | ReactNode
}

export const Hero: FC<IProps> = ({ tab, bgImg, title }) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <Link href="/buy" className="font-medium">
          Buy
        </Link>
      ),
      children: <></>,
    },
    {
      key: '2',
      label: <p className="font-medium">Rent</p>,
      children: <></>,
    },
    {
      key: '3',
      label: <p className="font-medium">Sell</p>,
      children: <></>,
    },
    {
      key: '4',
      label: <p className="font-medium">Pre-approval</p>,
      children: <></>,
    },
    {
      key: '5',
      label: <p className="font-medium">Just Sold</p>,
      children: <></>,
    },
    {
      key: '6',
      label: <p className="font-medium">Home Value</p>,
      children: <></>,
    },
  ]

  return (
    <div
      style={{ backgroundImage: `url(${bgImg.src})` }}
      className="bg-center bg-cover h-[450px] w-full"
    >
      <div className="text-light-white px-14 py-10 bg-black/20 flex flex-col items-center justify-center h-full w-full">
        <h1 className="font-black text-5xl text-center leading-normal mb-2">{title}</h1>

        <ConfigProvider
          theme={{
            token: {
              fontFamily: '',
              colorPrimary: '#fff',
              colorBorder: '#000',
              colorBorderSecondary: 'transparent',
              colorText: '#fff',
              fontSize: 15,
            },
          }}
        >
          <Tabs defaultActiveKey={tab} items={items} />
        </ConfigProvider>

        <div className="w-[520px] mt-1 relative">
          <input
            placeholder="Adress, School"
            name="search"
            className="bg-white py-4 px-5 w-full rounded-full placeholder-slate-700"
          />

          <div className="absolute right-0 top-0 p-1 h-full">
            <button className="bg-primary rounded-full h-full py-3 px-4">
              <HvSearchIcon className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
