import React from 'react'
import User from '../../assets/images/user.png'
import Image from 'next/image'
import { Header } from '@/components'

interface Props {
  children: React.ReactNode
  page?: 'listings' | 'offers' | 'transactions' | 'profile'
}

export const DashboardLayout: React.FC<Props> = ({ children, page }) => {
  return (
    <div>
      <Header />
      {/* <DashboardHeader/> */}
      <div className="bg-light-cultured-2 min-h-[100vh]">
        <div className="flex">
          <div className="fixed pt-[130px] flex flex-col justify-between px-5 w-64 bg-dark-prussian-blue h-screen pb-3 text-light-white">
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-3 mb-5 items-center">
                <div className="relative h-14 w-[58px]">
                  <Image alt="user" src={User} fill className="rounded-full" />
                </div>

                <div className="text-sm">
                  <h1 className="font-bold mb-1">Andrew Paul</h1>
                  <p className="text-[13px]">+2349037186714</p>
                </div>
              </div>

              <div
                className={`${page == 'listings' ? 'bg-primary rounded py-3 px-3' : 'py-3 px-3'}`}
              >
                <p>Listings</p>
              </div>

              <div
                className={`${page == 'offers' ? 'bg-primary rounded py-3 px-3' : 'py-3 px-3'}`}
              >
                <p>Offers</p>
              </div>

              <div
                className={`${
                  page == 'transactions' ? 'bg-primary rounded py-3 px-3' : 'py-3 px-3'
                }`}
              >
                <p>Transactions</p>
              </div>

              <div
                className={`${page == 'profile' ? 'bg-primary rounded py-3 px-3' : 'py-3 px-3'}`}
              >
                <p>Profile</p>
              </div>
            </div>

            <div className="py-3 px-3 text-sm">
              <p>Logout</p>
            </div>
          </div>

          <div className="pl-64 pt-[100px] flex justify-center items-center w-full min-h-[100vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
