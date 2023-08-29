import React from 'react'
// import { MapContainer, TileLayer } from 'react-leaflet'
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import { Button } from '@/components';
import { useRouter } from 'next/router';


const MapContainer = dynamic(() => import('react-leaflet').then((item) => item.MapContainer), {
  ssr: false
})

const TileLayer = dynamic(() => import('react-leaflet').then((item) => item.TileLayer), {
  ssr: false
})

const LeafletControlGeocoder = dynamic(() => import('./geocoder'), {
    ssr: false
});

export const MapLocationSelector = ({ location, setLocation }: any) => {
    const position = [51.505, -0.09];
    const router = useRouter()

  return (
    <div className='w-full h-full mt-10'>
        <MapContainer  
            center={[51.505, -0.09]}
            zoom={13} 
            scrollWheelZoom={false}

            // style={{ height: "100vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"            
            />
            <LeafletControlGeocoder location={location} setLocation={setLocation}/>
        </MapContainer>

        <div className='flex justify-end items-center mt-8 gap-5'>
            <Button
              onClick={() => {router.push(`/dashboard/listings/create/${location}`)}}
              type='button'
              fullWidth={false}
              title="Confirm Location"
            />

            <Button
              type='button'
              fullWidth={false}
              title="Cancel Process"
            />
        </div>
    </div>
  )
}

// export default Map