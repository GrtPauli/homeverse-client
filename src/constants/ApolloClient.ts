import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { API_URL } from "./Routes"

const httpLink = createHttpLink({
    uri: `${API_URL}/graphql`,
    credentials: 'same-origin'
})

const AppClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
})

export default AppClient