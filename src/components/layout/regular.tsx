import React, { FC, ReactNode } from 'react'
import { Header } from '../navbar/regular'
import { Footer } from '../footer'

interface IProps {
    children: ReactNode
}

export const RegularLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="w-full">
        <Header />

        <div className="pt-[100px]">
            {children}
            
            <section className="cta translate-y-14">
                <div className="container">
                    <div className="cta-card">
                    <div className="card-content">
                        <h2 className="h2 card-title">Looking for a dream home?</h2>

                        <p className="card-text">We can help you realize your dream of a new home</p>
                    </div>

                    <button className="btn cta-btn">
                        <span>Explore Properties</span>

                        {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
                    </button>
                    </div>
                </div>
            </section>
        </div>

        <Footer />
    </div>
  )
}