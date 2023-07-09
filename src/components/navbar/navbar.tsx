import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png'
import Image from 'next/image'
import { ChevronDownIcon, CoinBaseIcon, MetamaskIcon, WalletConnectIcon, WalletIcon } from '@/assets/icons'

export const Navbar = () => {
  const [modal, setModal] = useState<{ open: boolean }>({ open: false });
  
  return (
    <div>
        <div className='bg-light-white py-2 px-16 flex justify-between items-center'>
            <div>
                <Image src={Logo} alt='logo' width={200} height={100}/>
            </div>

        </div>
    </div> 
  )
}
