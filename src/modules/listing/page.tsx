import { DashboardLayout } from '@/components'
import { CreateListing, NoListing } from './components'
import { useState } from 'react'


const skills = [
  { value: 'React JS', label: 'React JS' },
  { value: 'Vue JS', label: 'Vue JS' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'Typescript', label: 'Typescript' },
  { value: 'Ghost Writing', label: 'Ghost Writing' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
]

export const MyListingsPage = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false)

  return (
    <DashboardLayout page="listings">
      <div className="px-10 w-full">
        {
          showCreate ? <CreateListing setShowCreate={setShowCreate}/>
          : <NoListing setShowCreate={setShowCreate}/>
        }
      </div>
    </DashboardLayout>
  )
}
