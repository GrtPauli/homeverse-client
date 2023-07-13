import React, { FC, ReactNode, useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface IProps {
  children?: ReactNode
  outline?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  title?: ReactNode
  loadingText?: string
  loading?: boolean
  fullWidth?: boolean
}

export const Button: FC<IProps> = ({
  outline,
  className,
  children,
  onClick,
  type,
  disabled,
  title,
  loading,
  loadingText,
  fullWidth = true,
}) => {
  const [isLoading, setLoading] = useState(loading)
  useEffect(() => {
    setLoading(loading)
  }, [loading])

  return (
    <button
      className={`bg-primary py-2.5 ${fullWidth ? 'w-full' : ''} 
        rounded text-light-white px-5 flex justify-center items-center font-bold`}
      type={type ? type : 'submit'}
      onClick={onClick}
      disabled={loading}
    >
      {isLoading ? (
        <div className="flex gap-3 items-center">
          <LoadingOutlined style={{ fontSize: 25, color: '#fff' }} spin />
          {loadingText ? loadingText : ''}
        </div>
      ) : title ? (
        title
      ) : (
        children
      )}
    </button>
  )
}
