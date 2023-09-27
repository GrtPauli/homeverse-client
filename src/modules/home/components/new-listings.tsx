import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ListItem } from './listitem'
import { useHomeContext } from '../context'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 30,
  },
}

export const NewListings = () => {
  const { newListings } = useHomeContext()
  return (
    <div className="py-16 pb-10 bg-light-white px-14">
      <h1 className="text-dark-jungle-green font-extrabold text-3xl">New Listings</h1>
      <p className="mt-2 text-colors-cadet text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, error!
      </p>

      <div className="relative mt-8 pb-14">
        <Carousel
          swipeable={false}
          draggable={false}
          ssr={true}
          renderDotsOutside={true}
          showDots
          itemClass="my-5"
          // dotListClass="pt-5"
          partialVisible={true}
          responsive={responsive}
        >
          {newListings.map((item, i) => (
            <ListItem item={item} key={i} />
          ))}
        </Carousel>
      </div>
    </div>
  )
}
