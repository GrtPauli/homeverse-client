import { AgentHubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import { Image } from 'antd'
import UserImg from '../../../assets/images/user.png'
import EditIcon from '../../../assets/images/edit.png'
import EditP from '../../../assets/images/lock.png'
import Settings from '../../../assets/images/settings.png'
import { Progress } from 'antd';
import { Steps } from 'antd';
import { useProfileContext } from '../context'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/modules/auth/context'
import { HvLoader } from '@/components'
import { UserType } from '../model'
import { AgentProfile, RegularProfile } from './components'

export const MyProfilePage = () => {
  const {firebaseInitLoading, firebaseAuth, userType} = useAuthContext()
  const {getUserProfile, loading, profile} = useProfileContext()

  useEffect(() => {
    if(firebaseInitLoading == false){
      getUserProfile(firebaseAuth?.currentUser?.uid)
    }
  },[firebaseInitLoading])

  return (
    <>
      {loading && (
          <div className='flex h-screen w-full justify-center items-center'>
              <HvLoader loading={loading} size='lg'/>
          </div>
      )}

      {!loading && (
        <>
          {profile.userType == UserType.AGENT ? <AgentProfile/> : <RegularProfile/>}
        </>
      )}
    </>
  )
}