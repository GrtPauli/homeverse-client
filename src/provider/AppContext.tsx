import { AgentContextProvider } from '@/modules/agent/context'
import { AuthContextProvider } from '@/modules/auth/context'
import { ChatContextProvider } from '@/modules/chat/context'
import { ContactContextProvider } from '@/modules/contacts/context'
import { FinderContextProvider } from '@/modules/finder/context'
import { ListingContextProvider } from '@/modules/listing/context'
import { MessageContextProvider } from '@/modules/messages/context'
import { ProfileContextProvider } from '@/modules/profile/context'
import React, { ComponentProps, FC } from 'react'

const CombineContext = (...components: FC[]): FC<any> => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      return ({ children }: ComponentProps<FC<any>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },

    ({ children }) => <>{children}</>,
  )
}

const providers = [
  AuthContextProvider, 
  ListingContextProvider, 
  ProfileContextProvider, 
  FinderContextProvider,
  ContactContextProvider,
  ChatContextProvider,
  AgentContextProvider,
  MessageContextProvider
] as any
const AppContextProvider = CombineContext(...providers)

export default AppContextProvider
