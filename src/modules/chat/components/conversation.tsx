import React from 'react'
import { Image } from 'antd'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import User from '../../../assets/images/user.png'

export const ConversationItem = ({ item, setShowIntroBox, setUserId }: any) => {
  return (
    <button
      onClick={() => {
        setUserId(item?.id)
        setShowIntroBox(false)
      }}
      className="flex w-full cursor-pointer items-center gap-3 py-3 px-5 hover:bg-primary/10 transition-all ease-in duration-150"
    >
      <Image
        className="rounded-full object-cover"
        width="55px"
        height="50px"
        src={item?.photo || User?.src}
      />

      <div className="flex flex-col gap-1 justify-between w-full">
        <div className="flex justify-between items-start">
          <p className="font-bold text-sm">{item?.name}</p>
          <p className="text-[11px] text-colors-cadet">
            {moment(item?.updatedAt).format(APP_DATE_TIME_FORMAT)}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-[13px] text-colors-cadet">
            {item?.message === 'CTSC' ? 'Click to start conversation' : item?.message}
          </p>
          {/* <div className="bg-primary rounded-full text-light-white text-xs text-center font-medium min-h-[20px] min-w-[20px] flex justify-center items-center">
          {item?.unread_num}
        </div> */}
        </div>
      </div>
    </button>
  )
}
