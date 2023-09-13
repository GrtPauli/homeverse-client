import { RegularLayout } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { AgentPageContent, RegularPageContent } from './components'
import { useAuthContext } from '@/modules/auth/context'
import { HvLoader } from '@/components'
import { useTourContext } from './context'

interface IProps {
    agent?: boolean
}

const ToursPage: FC<IProps> = ({ agent = false }) => {

  const { initLoading, getTours, getTourInfo } = useTourContext()
  const { firebaseInitLoading, firebaseAuth } = useAuthContext()

  useEffect(() => {
    if(firebaseInitLoading == false){
      agent == true ? getTourInfo({ agentId: firebaseAuth?.currentUser?.uid })
      : getTourInfo({ touristId: firebaseAuth?.currentUser?.uid })
    }
  },[firebaseInitLoading])

  return (
    <>
      {initLoading && (
          <div className='flex h-screen w-full justify-center items-center'>
              <HvLoader loading={initLoading} size='lg'/>
          </div>
      )}

      {!initLoading && (
        <>
          {agent ? (
            <AgentHubLayout>
              <AgentPageContent/>
            </AgentHubLayout>
          ) : (
            <RegularLayout>
              <RegularPageContent/>
            </RegularLayout>
          )}
        </>
      )}
    </>
  )
}

export default ToursPage