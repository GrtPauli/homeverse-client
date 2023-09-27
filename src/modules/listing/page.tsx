import { AgentHubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import { ConfigProvider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useListingContext } from './context'
import { HvLoader, HvButton, Footer, Header, RegularLayout } from '@/components'
import { Image } from 'antd'
import NoHome from '../../assets/images/no-home (1).png'
import { CTA } from '../home/components'
import { Content, Hero } from './components'

export const ListingsPage = () => {
  const { getListings, loading } = useListingContext()

  useEffect(() => {
    getListings()
  }, [])

  return (
    <>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={loading} size="lg" />
        </div>
      )}
      {!loading && (
        <RegularLayout className="pt-[100px]">
          <Hero />
          <Content />
        </RegularLayout>
      )}
    </>
  )
}
