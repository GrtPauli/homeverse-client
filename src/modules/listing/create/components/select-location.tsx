import { AgentHubLayout } from '@/components/layout/hub'
import React, { useState } from 'react'
import { CreationSteps, MapLocationSelector } from '.'
import { LocationSelector } from '@/components'


export const SelectLocationPage = () => {
    const [location, setLocation] = useState<string>("")
    const [country, setCountry] = useState<any>(null)
    const [countryFlag, setCountryFlag] = useState<any>(null)
    const [state, setState] = useState<any>(null)
    const [city, setCity] = useState<any>(null)
  
    return(
        <AgentHubLayout>
        <div className='w-full flex justify-center'>
            <div className='w-[95%] bg-light-white rounded shadow-lg px-10 py-8'>
                <h1 className='font-extrabold text-3xl mb-1'>Create New Listing</h1>
                <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p>

                <CreationSteps currentStep={0}/>
                <div className="my-10">
                    <h1 className="font-bold text-lg border-b pb-3 mb-5">Location</h1>
                    <LocationSelector
                        setCountry={setCountry}
                        country={country}
                        countryFlag={countryFlag}
                        setCountryFlag={setCountryFlag}
                        setState={setState}
                        state={state}
                        setCity={setCity}
                        city={city}
                    />
                </div>

                {/* <MapLocationSelector location={location} setLocation={setLocation}/> */}
            </div>
        </div>
        </AgentHubLayout>
    )
}