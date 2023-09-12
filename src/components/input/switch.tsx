import React, { Dispatch, FC, SetStateAction } from 'react'
import { ConfigProvider, Switch } from 'antd';

interface IProps {
    label?: string
    checked: boolean
    setChecked: Dispatch<SetStateAction<boolean>>
}

const HvSwitchInput: FC<IProps> = ({ label, checked, setChecked }) => {
  return (
    <div className='flex items-center gap-3'>
        <ConfigProvider
            theme={{ token: { colorPrimary: '#FF5A3D' } }}
        >
            <Switch 
                checked={checked}
                className='bg-gray-500' 
                onChange={(checked: boolean) => setChecked(checked)} 
            />
        </ConfigProvider> 
        <p>{label}</p>  
    </div>
  )
}

export default HvSwitchInput