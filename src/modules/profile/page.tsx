import { AppLoader, Button, Footer, Header } from '@/components'
import { Image } from 'antd'
import React, { FC, useEffect } from 'react'
import { useProfileContext } from './context'

interface IProps {
    id: string
}

export const ProfilePage: FC<IProps> = ({ id }) => {
    const { loading, getUserInfo, user, profile } = useProfileContext()
    useEffect(() => {
        getUserInfo(id)
    }, [])

    console.log(user, profile);

  return (
    <div className='bg-light-cultured-3'>
        <Header/>
        <div className="pt-[109px] flex flex-col justify-center items-center min-h-[100vh]">
            {loading && <AppLoader loading={loading} size='lg'/>}
            {
                !loading && (
                <div className='flex gap-16 w-[80%] pt-10 pb-20'>
                    <div>
                        <div className='flex gap-5 items-center'>
                            <Image
                                className='rounded-full'
                                preview={{
                                    maskClassName: "rounded-full"
                                }}
                                width="200px"
                                height="200px" 
                                src={user?.photo}
                            />

                            <div className='flex flex-col'>
                                <h1 className='font-bold text-2xl text-dark-prussian-blue mb-1'>{user?.firstname} {user?.lastname}</h1>
                                <p className='mb-2'>+2349134102236</p>
                                <p className='mb-2 text-sm text-colors-cadet'>My Location is this........</p>
                                <p className='text-sm'>My Professional Title</p>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <h1 className='font-extrabold text-3xl text-dark-prussian-blue mb-1'>About Me</h1>
                            <p className='mb-3 font-bold text-dark-prussian-blue'>Specialties : Buyer's agent, Listing agent, Relocation, Foreclosure</p>
                            <p className='text-[15px] text-colors-cadet leading-8'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Voluptate possimus ullam earum ut quos quam, nostrum consectetur
                                deserunt eveniet ipsam! <br/>

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
                                cum nesciunt! Nihil dolor sed, quibusdam accusantium beatae at,
                                corrupti aut omnis rem recusandae animi minima sit distinctio
                                harum ipsam ex, assumenda commodi officia. Rem pariatur laudantium,
                                necessitatibus beatae nobis quam doloremque laboriosam obcaecati,
                                sint saepe sequi reiciendis culpa temporibus porro!.
                                cum nesciunt! Nihil dolor sed, quibusdam accusantium beatae at,
                                corrupti aut omnis rem recusandae animi minima sit distinctio
                                harum ipsam ex, assumenda commodi officia. Rem pariatur laudantium,
                                necessitatibus beatae nobis quam doloremque laboriosam obcaecati,
                                sint saepe sequi reiciendis culpa temporibus porro!.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-10'>
                        <div className='w-96 shadow-lg py-3 bg-light-white'>
                            <h1 className='font-extrabold text-xl border-b pb-3 px-5'>Add as Your Agent</h1>
                            <p className='text-colors-cadet text-[15px] leading-7 mx-5 mt-3'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
                                aspernatur itaque neque fugiat, officia beatae doloribus voluptatibus
                                molestias deleniti asperiores.
                            </p>

                            <div className='mt-3 border-t pt-3 px-5'>
                                <Button title="Send Contact Request"/>
                            </div>
                        </div>

                        <div className='w-96 shadow-lg h-96 py-3 bg-light-white'>
                            <h1 className='font-extrabold text-xl border-b pb-3 px-5'>Professional Information</h1>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer/>
    </div>
  )
}