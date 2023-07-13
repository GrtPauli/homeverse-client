import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png'
import Image from 'next/image'
import {
  ChevronDownIcon,
  CoinBaseIcon,
  MetamaskIcon,
  WalletConnectIcon,
  WalletIcon,
} from '@/assets/icons'
import { Button } from '../button'
import UserImg from '../../assets/images/user.png'

export const Navbar = () => {
  const [modal, setModal] = useState<{ open: boolean }>({ open: false })

  return (
    <div>
      <div className="bg-light-white py-2 px-16 flex justify-between items-center">
        <div>
          <Image src={Logo} alt="logo" width={200} height={100} />
        </div>

        <div className="flex gap-8 items-center font-medium">
          <p>Buy</p>
          <p>Rent</p>
          <p>Sell</p>
          <p>Agent Finder</p>

          <button className="border-gray-400 border-2 rounded-full">
            <Image src={UserImg} alt="user" width={35} height={35} />
          </button>
        </div>
      </div>
    </div>
  )
}
