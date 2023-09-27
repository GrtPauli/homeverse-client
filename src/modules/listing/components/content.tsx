import React, { useState } from 'react'
import { ListItem } from './listitem'
import { useListingContext } from '../context'
import { BedsAndBathsFilter, FilterItem, LocationFilter, PriceRangeFilter } from './filter'
import { HvLoader2, ILocationInput } from '@/components'

export const Content = () => {
  const { getListings, filterLoading, listings } = useListingContext()
  const [location, setLocation] = useState<ILocationInput>({ city: null, state: null })
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: null,
    max: null,
  })
  const [bedsAndBaths, setBedsAndBaths] = useState<{ bedrooms: string; bathrooms: string }>({
    bathrooms: 'Any',
    bedrooms: 'Any',
  })

  const handleFilter = () => {
    getListings({
      bathrooms: bedsAndBaths.bathrooms,
      bedrooms: bedsAndBaths.bedrooms,
      city: location.city?.name,
      state: location.state?.name,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    })
  }

  return (
    <div className="gap-14 pb-36">
      <div className="flex gap-5 items-center px-10 bg-light-white w-full h-[60px] shadow-lg sticky top-[98px] z-[10]">
        <FilterItem title="Location">
          <LocationFilter
            handleFilter={handleFilter}
            location={location}
            setLocation={setLocation}
          />
        </FilterItem>

        <FilterItem title="Price Range">
          <PriceRangeFilter
            handleFilter={handleFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </FilterItem>

        <FilterItem title="Beds and Baths">
          <BedsAndBathsFilter
            handleFilter={handleFilter}
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
          />
        </FilterItem>
      </div>

      <div className="px-10 w-full flex flex-col justify-center items-center mt-14">
        {filterLoading ? (
          <div>
            <HvLoader2 loading={filterLoading} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {listings.map((item, i) => (
              <ListItem item={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
