import React, { useState } from 'react'
import { TextInput } from './text'
import { EyeIcon, EyeSlashIcon } from '@/assets/icons'

export const PasswordInput = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(true)

  return (
    <div className='relative'>
      <TextInput
        type={togglePassword ? 'password' : 'text'}
        name='password'
        label='Password'
        placeHolder='Enter your password'
      />

      <button
        type='button' 
        className='absolute right-5 top-11 h-5 w-5 text-gray-500'
        onClick={() => setTogglePassword(!togglePassword)}
      >
        {
            togglePassword ? <EyeSlashIcon/> : <EyeIcon/>
        }
      </button>
    </div>
  )
}
