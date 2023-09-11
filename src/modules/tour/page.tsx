import { RegularLayout } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { RegularPageContent } from './components'

interface IProps {
    agent?: boolean
}

const ToursPage: FC<IProps> = ({ agent = false }) => {
  return (
    <>
      {agent ? (
        <AgentHubLayout>

        </AgentHubLayout>
      ) : (
        <RegularLayout>
          <RegularPageContent/>
        </RegularLayout>
      )}
    </>
  )
}

export default ToursPage