import React, { useState } from 'react'
import { RegTourItem } from './item'
import { HvButton, HvEmpty, HvModal } from '@/components'
import { InfoCircleFilled } from '@ant-design/icons'
import { HvChatIcon, HvEditIcon, HvHomeIcon, HvInfoIcon, HvTickCircleIcon } from '@/assets/icons'
import { useTourContext } from '@/modules/tour/context'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { ITourRequest, TourMethod, TourRequestStatus } from '../../model'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'

interface IModalData {
  open: boolean
  data?: ITourRequest
}

export const TourRequests = () => {
  const { tourRequests } = useTourContext()  
  const [showModal, setShowModal] = useState<IModalData>({open: false, data: null})

  const columns: ColumnsType<ITourRequest> = [
    {
      title: 'Tourist',
      dataIndex: 'touristName',
      key: 'touristName',
    },
    {
      title: 'Tour Scheduled Date',
      dataIndex: 'tourScheduledDate',
      key: 'tourScheduledDate',
      render: (value) => (
        <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>
      ),
    },
    {
      title: 'Tour Method',
      dataIndex: 'method',
      key: 'method',
      render: (value) => (
        <p>
          {value == TourMethod[0] ? "In Person" : "Video Call"}
        </p>
      ),
    },
    {
      title: 'Property ID',
      dataIndex: 'propertyId',
      key: 'propertyId',
    },
    {
      title: 'Property Listing Date',
      dataIndex: 'propertyListingDate',
      key: 'propertyListingDate',
      render: (value) => (
        <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>
      ),
    },
    {
      title: 'Request Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
      render: (value) => (
        <>
          {value == TourRequestStatus[1] && <p className='text-primary font-bold'>{value}</p>}
          {value == TourRequestStatus[0] && <p className='text-green-500 font-bold'>{value}</p>}
          {value == TourRequestStatus[2] && <p className='text-red-500 font-bold'>{value}</p>}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div className='flex items-center gap-5 justify-center'>
          <button className=''>
            <HvChatIcon className='w-5 h-5 text-colors-cadet'/>
          </button>

          <button onClick={() => setShowModal({open: true, data: record})}>
            <HvTickCircleIcon className='w-5 h-5 text-colors-cadet'/>
          </button>

          <button>
            <HvHomeIcon className='w-5 h-5 text-colors-cadet'/>
          </button>
        </div>
      ),
    },
];

  return (
    <div>      
        <div className='flex items-center gap-2 mb-5'>
            <HvInfoIcon className='text-blue-600'/>
            <p className='leading-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ad laudantium consectetur aperiam blanditiis delectus sapiente exercitationem fugiat.</p>
        </div>

        {tourRequests.length > 0 ? (
          <Table className='translate-y-2' bordered columns={columns} dataSource={tourRequests}/>
        ) : (<HvEmpty/>)}

        <HvModal
          title='Accept Tour Request'
          open={showModal.open}
          onDismiss={() => setShowModal({ open: false })}
        >
          <div>
            <div className='text-center'>
              <p className='font-bold text-lg mb-2'>{showModal?.data?.touristName}</p>
              <p className='mb-3'>Scheduled Date : {moment(showModal?.data?.tourScheduledDate).format(APP_DATE_TIME_FORMAT)}</p>
              <p>Do you want to accept the tour request ?</p>
            </div>
            
            <div className='flex justify-end gap-5 mt-10'>
              <HvButton paddingY='py-3' fullWidth={false} outline title="Cancel" onClick={() => setShowModal({ open: false })}/>
              <HvButton paddingY='py-3' fullWidth={false} title="Proceed"/>
            </div>
          </div>
        </HvModal>
    </div>
  )
}