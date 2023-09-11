import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { DetailsContent } from './components'
import { useListingContext } from '../context'
import { HvLoader, Footer, Header } from '@/components'
import { CTA } from '@/modules/home/components'

interface IProps {
  id: string
  agent?: boolean
}

export const ListingDetailPage: FC<IProps> = ({ id, agent = false }) => {
  const { loading, getListing, listing } = useListingContext()

  useEffect(() => {
    getListing(id)
  }, [])

  return (
    <>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <>
          {agent ? (
            <AgentHubLayout containerClassName="bg-light-cultured-3 h-full pt-[60px] pb-[100px]">
              <div className="pt-[100px]">
                <DetailsContent listing={listing}/>
              </div>
            </AgentHubLayout>
          ) : (
            <div className="w-full bg-light-cultured-3 relative">
              <Header />

              <div className="pt-[100px]">
                <DetailsContent listing={listing}/>
              </div>
              
              <div>
                <CTA />
                <Footer />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
