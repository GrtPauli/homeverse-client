import { ErrorMessage, Field, useField } from 'formik'
import React, { useEffect } from 'react'

interface IProps {
  label?: string
  type?: string
  name: string
  className?: string
  placeHolder?: string
  disabled?: boolean
  // onChange?:(value:string)=>void;
  props?: {
    [x: string]: any
  }
  containerClassName?: string | undefined
}

export const TextInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeHolder,
  containerClassName,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(name)

  useEffect(() => {
    // console.log(field);
  }, [field])

  return (
    <div
      style={{ marginBottom: 10, display: '', flexDirection: 'column' }}
      className={containerClassName}
    >
      {label && <p className="text-[13px] text-dark mb-3">{label}</p>}

      {type == 'textarea' ? (
        <textarea
          className={`form-control
          block
          w-full
          px-3
          py-1
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-gray-200 focus:outline-none
        ${className}`}
          {...field}
          {...props}
          name={name}
          rows={4}
          placeholder={placeHolder}
        ></textarea>
      ) : (
        <Field
          type={type}
          {...field}
          {...props}
          name={name}
          disabled={disabled || false}
          className={`
            text-xs bg-gray-100 placeholder-slate-700 w-full rounded-full py-3.5 outline-none px-5        
          ${className}`}
          placeholder={placeHolder}
        />
      )}

      <>{meta?.touched && meta.error && <div className="text-red-500">{meta.error}</div>}</>
    </div>
  )
}
