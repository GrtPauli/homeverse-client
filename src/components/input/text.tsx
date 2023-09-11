import { ErrorMessage, Field, useField } from 'formik'
import React, { HTMLInputTypeAttribute, useEffect } from 'react'

interface IProps {
  labelSmall?: boolean
  textarea?: boolean
  textAreaRows?: number
  label?: string
  type?: HTMLInputTypeAttribute
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

export const HvTextInput: React.FC<IProps> = ({
  labelSmall = false,
  label,
  textAreaRows,
  type,
  textarea = false,
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
    <div className="w-full">
      {label && <p 
      className={`text-dark-prussian-blue font-semibold mb-2 ${labelSmall == true ? "text-[13px]" : "text-[15px]"}`}>
        {label}
      </p>}

      {textarea ? (
        <textarea
          className={`
            text-sm leading-7 border border-colors-opal/40 w-full rounded py-3 outline-none px-5 resize-none     
          ${className}`}
          {...field}
          {...props}
          name={name}
          rows={textAreaRows || 8}
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
            text-[13px] border border-colors-opal/40 w-full rounded-lg py-3 outline-none px-5        
          ${className}`}
          placeholder={placeHolder}
        />
      )}

      <>{meta?.touched && meta.error && <div className="text-red-500">{meta.error}</div>}</>
    </div>
  )
}
