import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { DocumentData, DocumentReference, Firestore, doc, getDoc } from 'firebase/firestore'

interface IChatState {
  loading: boolean
  conversationList: any[]
  getConversationList: (ref: DocumentReference<DocumentData, DocumentData>) => Promise<void>
}

const ChatContext = createContext<IChatState>({
  loading: true,
  conversationList: [],
  getConversationList() {
    return null as any
  },
})

const useChatContext = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('app dispatch must be used within app global provider')
  }
  return context
}

interface ChatContextProviderProps {
  children: ReactNode
}

const ChatContextProvider: FC<ChatContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [conversationList, setConverstionList] = useState<any[]>([])

  const getConversationList = async (ref: DocumentReference<DocumentData, DocumentData>) => {
    const docSnap = await getDoc(ref)
    setConverstionList(docSnap.data().list)
  }

  return (
    <ChatContext.Provider
      value={{
        loading,
        getConversationList,
        conversationList,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContextProvider, useChatContext }
