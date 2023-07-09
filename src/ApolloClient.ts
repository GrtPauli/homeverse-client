import { ApolloClient, InMemoryCache } from "@apollo/client"

const AppClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: ""
})

export default AppClient