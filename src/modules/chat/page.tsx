import { AppLoader } from '@/components'
import React, { useEffect, useState } from 'react'
import { ChatBox, ChatRoom, ConversationItem, IntroBox } from './components'
import { AgentHubLayout } from '@/components/layout/hub'
import { useContactContext } from '../contacts/context'
import { useHvFirebaseContext } from '../firebase/context'
import { useChatContext } from './context'

export const MessagesPage = () => {
  const [showIntroBox, setShowIntroBox] = useState<boolean>(true)
  const [userId, setUserId] = useState<string>(null)

  const { getConversationListId } = useContactContext()
  const { loading: authLoading, auth, firestoreDb } = useHvFirebaseContext()
  const { getConversationList, conversationList } = useChatContext()

  useEffect(() => {
    if (authLoading == false) {
       getConversationListId(firestoreDb, auth?.currentUser?.uid)
       .then((ref) => {
            getConversationList(ref)
       })
    }
  }, [authLoading])

  return (
    <AgentHubLayout noFooter containerClassName="w-full bg-light-cultured-3">
      <div className="h-screen w-full flex">
        <div className="bg-light-cultured-2 h-full w-[25%] pt-[60px]">
          <div className="py-[15px] px-5">
            <h1>Messages</h1>
          </div>

            {conversationList?.map((item, i) => (
                <ConversationItem item={item} key={i}/>
            ))}
        </div>

        <div className="h-full w-[75%] pt-[60px] relative">
          {showIntroBox && <IntroBox />}
          {/* {!showIntroBox && <ChatRoom userId={recipientId}/>} */}
        </div>
      </div>
    </AgentHubLayout>
  )
}
