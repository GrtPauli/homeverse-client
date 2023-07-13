import { ApolloProvider } from '@apollo/client'
import AppContextProvider from './AppContext'
import AppClient from '@/constants/ApolloClient'

interface IProps {
  children: any
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <ApolloProvider client={AppClient}>
      <AppContextProvider>{children}</AppContextProvider>
    </ApolloProvider>
  )
}

export default AppProvider
