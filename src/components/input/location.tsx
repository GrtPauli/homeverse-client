import React, { useState } from 'react'
import {
  CountrySelector,
  StateSelector,
  CitySelector
} from 'volkeno-react-country-state-city'
import 'volkeno-react-country-state-city/dist/index.css'

export const LocationSelector = ({ 
  setCountry,
  country,
  setState,
  state,
  setCity,
  city,
}: any) => {
  // const [country, setCountry] = useState<any>('')
  // const [state, setState] = useState<any>('')
  // const [city, setCity] = useState<any>('')

  const handleCountrySelect = (option: any) => {
    setCountry(option)
  }

  const handleStateSelect = (option: any) => {
    setState(option)
  }

  const handleCitySelect = (option: any) => {
    setCity(option)
  }

  return (
    <div className='flex w-full justify-between location-selector gap-5'>
      <div className='w-[33.3%]'>
        <p className="text-dark-prussian-blue font-medium mb-3 text-[15px]">Country</p>
        <CountrySelector
          containerClass=' w-full'
          onChange={handleCountrySelect}
          name='country'
          placeholder='Select a country'
          value={country}
        />
      </div>

      <div className='w-[33.3%]'>
        <p className="text-dark-prussian-blue font-medium mb-3 text-[15px]">State</p>
        <StateSelector
          containerClass=' w-full'
          country={country}
          name='state'
          value={state}
          countryPlaceholder='Select a country first'
          onChange={handleStateSelect}
        />
      </div>

      <div className='w-[33.3%]'>
        <p className="text-dark-prussian-blue font-medium mb-3 text-[15px]">City</p>
        <CitySelector
          containerClass=' w-full'
          state={state}
          name='city'
          value={city}
          statePlaceholder='Select a state first'
          onChange={handleCitySelect}
        />
      </div>
    </div>
  )
}