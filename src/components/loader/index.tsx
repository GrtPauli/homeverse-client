import { LoadingOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import HashLoader from "react-spinners/HashLoader"

interface IProps {
    loading: boolean
    color?: "primary" | "white"
    size?: "sm" | "lg"
}

export const AppLoader: FC<IProps> = ({ 
    loading, 
    color = "primary",
    size = "sm"
}) => {

  return (
    <div className='flex justify-center items-center w-full h-full'>
      {/* <LoadingOutlined className='text-primary text-4xl'/> */}
      <HashLoader 
        size={ size == "lg" ? 50 : 30 }
        loading={loading}
        color={ color == "primary" ? "#FF5A3D" : "#ffffff" }
      />
    </div>
  )
}