import React from 'react'
import { AgentNavbar } from '../navbar/navbar2'
import { Footer } from '../footer'
import { CTA } from '@/modules/home/components'

interface IProps {
    children: React.ReactNode
    containerClassName?: string
    noFooter?: boolean
}

export const AgentHubLayout: React.FC<IProps> = ({ children, containerClassName, noFooter = false }) =>  {
    return (
        <div className='bg-light-cultured-3'>
            <AgentNavbar/>
            <div className={containerClassName ? containerClassName : 'bg-light-cultured-3 h-full pt-[110px] pb-[100px] px-12'}>
                {children}
            </div>

            {
                noFooter == false && (
                    <div>
                        <CTA/>
                        <Footer/>
                    </div>
                )
            }
        </div>
    )
}