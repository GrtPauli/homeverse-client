import React from 'react'
import Logo from '../../assets/images/logo.png'
import Image from 'next/image'
import UserProfile from './user'

export const Navbar = () => {
  const renderContent = () => {
    return (
        <div>
          ffffffffffffff
        </div>
    )
  }

  return (
    <div>
      <div className="bg-light-white py-1.5 px-12 flex justify-between items-center">
        <div>
          <Image src={Logo} alt="logo" width={180} height={80} />
        </div>

        <div className="flex gap-8 items-center ">
          <p>Buy</p>
          <p>Rent</p>
          <p>Sell</p>
          <p>Agent Finder</p>

          <UserProfile content={renderContent}/>
        </div>
      </div>
    </div>
  )
}
