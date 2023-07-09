import React, { ComponentProps, FC } from "react";

const CombineContext = (...components: FC[]): FC<any> => {
    return components.reduce(
        (AccumulatedComponents: any, CurrentComponent: any) => {
            return ({ children }: ComponentProps<FC<any>>): JSX.Element => {
                return (
                    <AccumulatedComponents>
                      <CurrentComponent>{children}</CurrentComponent>
                    </AccumulatedComponents>
                  );
            }
        },

        ({ children }) => <>{children}</>
    )
}

const providers = [] as any
const AppContextProvider = CombineContext(...providers)

export default AppContextProvider