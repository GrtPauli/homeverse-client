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
    <div style={{ marginBottom: 10, display: '', flexDirection: 'column' }} className="w-full">
      {label && <p className="text-dark-prussian-blue font-medium mb-3">{label}</p>}

      {type == 'textarea' ? (
        <textarea
          className={`
            text-sm border border-colors-opal/40 w-full rounded py-3 outline-none px-5 resize-none     
          ${className}`}
          {...field}
          {...props}
          name={name}
          rows={8}
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
            text-sm border border-colors-opal/40 w-full rounded py-3 outline-none px-5        
          ${className}`}
          placeholder={placeHolder}
        />
      )}

      <>{meta?.touched && meta.error && <div className="text-red-500">{meta.error}</div>}</>
    </div>
  )
}
