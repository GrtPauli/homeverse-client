import React, { FC, ReactNode } from 'react'
import { ConfigProvider, MenuProps, Popover } from 'antd'

interface IProps {
    children: ReactNode
    wrapper: ReactNode
}

export const HvPopover: FC<IProps> = ({ children, wrapper }) => {
  return (
    <ConfigProvider
        theme={{
            token: {
                fontFamily: '',
                colorPrimary: '#FF7D01',
            },
        }}
    >
        <Popover
            zIndex={4000}
            placement="bottomRight"
            content={children}
            overlayInnerStyle={{ padding: 0, paddingTop: 0 }}
            overlayClassName="cus-sm:relative cus-sm:left-0 cus-sm:w-full"
        >
            {wrapper}
        </Popover>
    </ConfigProvider>
  )
}