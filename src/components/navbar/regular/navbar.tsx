import React from 'react'
import Logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import UserProfile from '../user'
import Link from 'next/link'
import { HvButton } from '../../button'
import { HvPopover } from '../../popover'
import { useAuthContext } from '@/modules/auth/context'
import { UserType } from '@/modules/profile/model'
import { HvHubIcon } from '@/assets/icons'
import UserImg from '../../../assets/images/user.png'
import { Auth } from 'firebase/auth'

export const Navbar = () => {
    const {userType} = useAuthContext()    
    const { firebaseInitLoading, firebaseAuth } = useAuthContext()

  return (
    <div className="bg-light-white py-1.5 px-12 flex justify-between items-center">
      <div className='flex items-center gap-12'>
          <Image src={Logo} alt="logo" width={180} height={80} />
          <div className='flex gap-8 items-center text- mt-1'>
              <Link href="">
                  <p className='font-regular text-[15px]'>Buy</p>
              </Link>

              <Link href="">
                  <p className='font-regular text-[15px]'>Rent</p>
              </Link>

              <Link href="">
                  <p className='font-regular text-[15px]'>Sell</p>
              </Link>

              {agentFinderContent()}

              <Link href="">
                  <p className='font-regular text-[15px]'>Help</p>
              </Link>
          </div>
      </div>

      <div className='flex items-center gap-8'> 
          {(userType as any) == UserType[1] ? (
            <>
                {myHubContent(firebaseAuth)}
            </>
          ) : (
            <UserProfile content={renderContent}/>
          )}
      </div>
    </div>
  )
}

const renderContent = () => {
  return (
      <div className='w-[280px]'>
          <div className='p-[5px]'>
            <Link href="/my/profile">
                  <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                      <h1 className='font-semibold mb-0.5'>My Profile</h1>
                      <p className='text-xs text-colors-cadet'>Manage your profile</p>
                  </div>
              </Link>

              <Link href="/my/tours">
                  <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                      <h1 className='font-semibold mb-0.5'>Tours</h1>
                      <p className='text-xs text-colors-cadet'>View your house tours</p>
                  </div>
              </Link>

              <Link href="/dashboard/profile">
                  <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                      <h1 className='font-semibold mb-0.5'>Saved Homes</h1>
                      <p className='text-xs text-colors-cadet'>View and edit your info</p>
                  </div>
              </Link>

              <Link href="/dashboard/past-sales">
                  <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                      <h1 className='font-semibold mb-0.5'>Saved Searches</h1>
                      <p className='text-xs text-colors-cadet'>View sales history</p>
                  </div>
              </Link>

              <Link href="/dashboard/settings">
                  <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                      <h1 className='font-semibold mb-0.5'>Recently Viewed</h1>
                      <p className='text-xs text-colors-cadet'>Manage your account</p>
                  </div>
              </Link>
          </div>

          <div className='text-[13px] border-t py-3 px-3'>
            <HvButton
              paddingY='py-3'
              title="Sign Out"
            />


              {/* <button className='hover:text-primary ease-in duration-150 h-full w-full'>
                  Sign Out
              </button> */}
          </div>
      </div>
  )
}

const agentFinderContent = () => (
  <HvPopover wrapper={<p className='font-regular text-[15px] cursor-pointer'>Agent Finder</p>}>
      <div className='w-[280px]'>
        <div className='p-[5px]'>
            <Link href="/dashboard/profile">
                <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Real Estate Agents</h1>
                    <p className='text-xs text-colors-cadet'>View and edit your info</p>
                </div>
            </Link>

            <Link href="/dashboard/past-sales">
                <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Create an Agent Account</h1>
                    <p className='text-xs text-colors-cadet'>View sales history</p>
                </div>
            </Link>

            <Link href="/dashboard/profile">
                <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Real Estate Agents</h1>
                    <p className='text-xs text-colors-cadet'>View and edit your info</p>
                </div>
            </Link>

            <Link href="/dashboard/past-sales">
                <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Create an Agent Account</h1>
                    <p className='text-xs text-colors-cadet'>View sales history</p>
                </div>
            </Link>
        </div>
      </div>
  </HvPopover>
)

const myHubContent = (firebaseAuth: Auth) => (
  <HvPopover 
    wrapper={
        <>
            <HvButton type='button' paddingY='py-2.5' paddingX='px-6'>
                My Hub <HvHubIcon className='w-5 h-5'/>
            </HvButton>
        </>
    }
  >
      <div className='w-[280px]'>
        <div className='text-[13px] leading-none border-b py-3 px-3 flex items-center gap-5'>
            <Image
                src={firebaseAuth?.currentUser?.photoURL || UserImg}
                alt="user"
                width={35}
                height={35}
                className="rounded-full"
            />
            <div className='flex flex-col gap-1'>
                <p className='font-bold text-sm'>{firebaseAuth?.currentUser?.displayName}</p>
                <p>{firebaseAuth?.currentUser?.email}</p>
            </div>
        </div>

        <div className='p-[5px]'>
            <Link href="/dashboard">
                <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Dashboard</h1>
                    <p className='text-xs text-colors-cadet'>View your dashboard info</p>
                </div>
            </Link>

            <Link href="/dashboard/listings">
                <div className='px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Listings</h1>
                    <p className='text-xs text-colors-cadet'>View and create listings</p>
                </div>
            </Link>

            <Link href="/dashboard/past-sales">
                <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Messages</h1>
                    <p className='text-xs text-colors-cadet'>View your messages</p>
                </div>
            </Link>

            <Link href="/dashboard/past-sales">
                <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Contacts</h1>
                    <p className='text-xs text-colors-cadet'>View your contacts and requests</p>
                </div>
            </Link>

            <Link href="/dashboard/past-sales">
                <div className='px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150'>
                    <h1 className='font-semibold mb-0.5'>Profile</h1>
                    <p className='text-xs text-colors-cadet'>View sand edit your profile info</p>
                </div>
            </Link>
        </div>

        <div className='text-[13px] border-t py-3 px-3'>
            <HvButton
              paddingY='py-3'
              title="Sign Out"
            />
        </div>
      </div>
  </HvPopover>
)