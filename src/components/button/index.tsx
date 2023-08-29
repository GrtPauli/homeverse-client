import React, { FC, ReactNode, useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface IProps {
  children?: ReactNode
  outline?: boolean
  btnLight?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  title?: ReactNode
  loadingText?: string
  loading?: boolean
  fullWidth?: boolean
  paddingY?: string
}

export const Button: FC<IProps> = ({
  outline,
  btnLight,
  className,
  children,
  onClick,
  type,
  disabled,
  title,
  loading,
  loadingText,
  fullWidth = true,
  paddingY
}) => {
  const [isLoading, setLoading] = useState(loading)
  useEffect(() => {
    setLoading(loading)
  }, [loading])

  const regClassName = `${paddingY ? paddingY : "py-3"} ${fullWidth ? 'w-full' : ''} 
  ${outline ? "border-primary text-primary border" : "bg-primary text-light-white"}
  rounded px-5 gap-2 text-sm flex justify-center items-center font-bold`

  const lightClassName = `${paddingY ? paddingY : "py-3"} ${fullWidth ? 'w-full' : ''} 
  ${outline ? "border-primary text-primary border" : "bg-light-cultured-2 text-colors-cadet"}
  rounded px-5 gap-3 text-[13px] flex justify-center items-center font-semibold`

  return (
    <button
      className={btnLight ? lightClassName : regClassName}
      type={type ? type : 'submit'}
      onClick={onClick}
      disabled={loading}
    >
      {isLoading ? (
        <div className="flex gap-3 items-center">
          <LoadingOutlined style={{ fontSize: 25 }} spin />
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
