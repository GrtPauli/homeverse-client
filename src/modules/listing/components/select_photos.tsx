import useImageDataURI from '@/hooks/imageDataURI'
import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react'

interface IProps {
  pictures: string[]
  setPictures: Dispatch<SetStateAction<string[]>>
}

export const SelectPhotos: FC<IProps> = ({ pictures, setPictures }) => {
  const pic = useRef<HTMLInputElement>(null)
  const inputForm = useRef<HTMLFormElement>(null)
  // const [pictures, setPictures] = useState<string[]>([])
  const [isBannerSelected, setIsBannerSelected] = useState(false)
  const [isBannerLoading, setIsBannerLoading] = useState(false)

  const FileInputHandler = async () => {
    const selectedPic = pic?.current?.files as FileList

    const result: any = await useImageDataURI(selectedPic[0], 1000000)
    if (result?.data) {
      let pics = [...pictures]
      pics.push(result?.data)
      setPictures(pics)
      setIsBannerLoading(true)
      console.log(pics)

      setTimeout(() => {
        setIsBannerLoading(false)
        setIsBannerSelected(true)
      }, 3000)
    } else {
      console.log(result?.error)
      inputForm?.current?.reset()
    }
  }

  return (
    <div>
      <button className="h-[150px] w-full">
        <div
          className="border-dashed border-2 border-colors-opal/40 file-input-button relative h-full w-full flex items-center justify-center"
          id="profile-pic-button"
        >
          <div className="flex flex-col gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-colors-opal w-14 h-14 text-center"
            >
              <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
              <path
                fillRule="evenodd"
                d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-colors-opal text-sm">Click to Add Photo</p>
          </div>

          <form ref={inputForm}>
            <input
              type="file"
              className="w-full h-full absolute left-0 top-0 opacity-0"
              onInput={FileInputHandler}
              ref={pic}
            />
          </form>
        </div>
      </button>
    </div>
  )
}
