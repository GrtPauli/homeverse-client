import React, { FC, ReactNode } from 'react'
import { Button } from '@/components'
import FacebookIcon from "../../../assets/images/facebook.png"
import GoogleIcon from "../../../assets/images/google.png"
import Image from 'next/image'
import { MailIcon } from '@/assets/icons'
import Logo from '../../../assets/images/logo.png'

interface IProps {
    title: string
    onClickEmail: () => void
    footer: ReactNode
}

export const AuthMethodSelection:FC<IProps> = ({ title, onClickEmail, footer }) => {
  return (
    <>
        <div className='flex justify-center items-center mt-5'>
            <Image src={Logo} alt="logo" width={180} height={100} />
        </div>

        <div className="mt-8 text-center">
            <h1 className="font-bold text-lg mb-1">{title}</h1>
            <p className="text-xs leading-5">
                Lorem ipsum dolor, sit amet consectetur <br/>adipisicing elit. Delectus, commodi!
            </p>

            <div className='mt-8 flex flex-col gap-5'>
            <Button btnLight paddingY='py-3.5'>
                <Image src={GoogleIcon} alt="google" width={20} height={20} />
                <p>Continue With Google</p>
            </Button>
            <Button btnLight paddingY='py-3.5'>
                <Image src={FacebookIcon} alt="facebook" width={20} height={20} />
                <p>Continue With Facebook</p>
            </Button>
            <Button btnLight paddingY='py-3.5' onClick={onClickEmail}>
                <MailIcon className='w-[22px] h-[22px]'/>
                <p>Continue With Email</p>
            </Button>
            </div>
        </div>

        {footer}
    </>
  )
}
