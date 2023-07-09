import { ApolloProvider } from "@apollo/client";
import AppClient from "./ApolloClient";
import AppContextProvider from "./AppContext";

interface IProps {
    children: any;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
    return (
        <ApolloProvider client={AppClient}>
            <AppContextProvider>
                {children}
            </AppContextProvider>
        </ApolloProvider>
    )
}

export default AppProvider