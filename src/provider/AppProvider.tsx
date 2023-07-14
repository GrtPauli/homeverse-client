import { ApolloProvider } from "@apollo/client";
import AppContextProvider from "./AppContext";
import AppClient from "@/constants/ApolloClient";
import { SessionProvider } from "next-auth/react";

interface IProps {
    children: any;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
    return (
        <SessionProvider>
            <ApolloProvider client={AppClient}>
                <AppContextProvider>
                    {children}
                </AppContextProvider>
            </ApolloProvider>
        </SessionProvider>
    )
}

export default AppProvider