import React, { useState } from 'react'
import { TextInput } from './text'
import { EyeIcon, EyeSlashIcon } from '@/assets/icons'

interface IProps {
  labelSmall?: boolean
}

export const PasswordInput: React.FC<IProps> = ({ labelSmall }) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(true)

  return (
    <div className="relative">
      <TextInput
        labelSmall={labelSmall}
        type={togglePassword ? 'password' : 'text'}
        name="password"
        label="Password"
        // placeHolder="Enter your password"
      />

      <button
        type="button"
        className="absolute right-5 top-10 text-colors-cadet"
        onClick={() => setTogglePassword(!togglePassword)}
      >
        {togglePassword ? <EyeSlashIcon className='h-5 w-5'/> : <EyeIcon className='h-5 w-5'/>}
      </button>
    </div>
  )
}
