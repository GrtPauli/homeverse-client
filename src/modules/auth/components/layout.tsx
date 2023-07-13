import { ReactNode, FC } from 'react'
import Slide4 from '../../../assets/images/slide-4.jpg'
import Slide1 from '../../../assets/images/slide-1.jpg'
import Slide2 from '../../../assets/images/slide-2.jpg'
import Slide3 from '../../../assets/images/slide-3.jpg'
import { ConfigProvider, Carousel } from 'antd'

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
          },
        }}
      >
        <div className="relative">
          <Carousel
            dots={false}
            autoplay
            speed={1000}
            autoplaySpeed={5000}
            swipeToSlide
            dotPosition="left"
            pauseOnHover={false}
          >
            <div className="h-[100vh]">
              <div className="parallax h-full" style={{ backgroundImage: `url(${Slide4.src})` }} />
            </div>

            <div className="h-[100vh]">
              <div className="parallax h-full" style={{ backgroundImage: `url(${Slide2.src})` }} />
            </div>

            <div className="h-[100vh]">
              <div className="parallax h-full" style={{ backgroundImage: `url(${Slide3.src})` }} />
            </div>

            <div className="h-[100vh]">
              <div className="parallax h-full" style={{ backgroundImage: `url(${Slide1.src})` }} />
            </div>
          </Carousel>
        </div>
      </ConfigProvider>

      <div className="px-20 top-0 absolute w-full h-full bg-dark-jungle-green/50 flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}
