import React, { useState } from 'react'
import { ConfigProvider, Empty, Image, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ITour, TourMethod, TourStatus } from '../model'
import moment from 'moment'
import { APP_DATE_FORMAT, APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { HvChatIcon, HvEditIcon, HvHomeIcon, HvInfoIcon, HvTickCircleIcon } from '@/assets/icons'
import { useTourContext } from '../context'
import HvSwitchInput from '@/components/input/switch'

export const ToursTable = ({ agent }: any) => {
  const { tours } = useTourContext()

  const columns: ColumnsType<ITour> = [
    {
      title: agent ? 'Tourist' : 'Agent',
      key: agent ? 'tourist' : 'agent',
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full"
            width="30px"
            height="30px"
            src={agent ? record.touristPhoto : record.agentPhoto}
          />
          <p>{agent ? record.touristName : record.agentName}</p>
        </div>
      ),
    },
    {
      title: 'Tour Scheduled Date',
      dataIndex: 'tourScheduledDate',
      key: 'tourScheduledDate',
      render: (value) => <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'tourStatus',
      key: 'tourStatus',
      render: (value) => (
        <>
          {value == TourStatus[1] && <p className="text-primary font-bold">{value}</p>}
          {value == TourStatus[0] && <p className="text-green-500 font-bold">{value}</p>}
          {value == TourStatus[2] && <p className="text-red-500 font-bold">{value}</p>}
          {value == TourStatus[3] && <p className="text-blue-500 font-bold">{value}</p>}
        </>
      ),
    },
    {
      title: 'Tour Method',
      dataIndex: 'method',
      key: 'method',
      render: (value) => <p>{value == TourMethod[0] ? 'In Person' : 'Video Call'}</p>,
    },
    {
      title: 'Property ID',
      dataIndex: 'propertyId',
      key: 'propertyId',
      render: (value) => <>{value.slice(0, 6)}</>,
    },
    {
      title: 'Tour Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Listing Date',
      dataIndex: 'propertyListingDate',
      key: 'propertyListingDate',
      render: (value) => <>{moment(value).format(APP_DATE_FORMAT)}</>,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-5 justify-center">
          {agent && record.tourStatus == (TourStatus[3] as any) && (
            <button onClick={() => {}}>
              <HvTickCircleIcon className="w-5 h-5 text-colors-cadet" />
            </button>
          )}

          <button className="">
            <HvChatIcon className="w-5 h-5 text-colors-cadet" />
          </button>

          <button>
            <HvHomeIcon className="w-5 h-5 text-colors-cadet" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="pt-3">
      <TableFilter />
      {tours.length > 0 ? (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '',
              colorPrimary: '#FF5A3D',
            },
          }}
        >
          <Table className="translate-y-2" bordered columns={columns} dataSource={tours} />
        </ConfigProvider>
      ) : (
        <Empty />
      )}
    </div>
  )
}

const TableFilter = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="flex items-center gap-10 mt-2 mb-8">
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Tour Requests" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Pending Tours" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Completed Tours" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Cancelled Tours" />
    </div>
  )
}
