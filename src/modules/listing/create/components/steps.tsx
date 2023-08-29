import React from 'react'
import { ConfigProvider, Steps } from 'antd';

const description = 'This is a description.';

export const CreationSteps = ({currentStep}: any) => {
  return (
    <div>
            <ConfigProvider
      theme={{
        token: {
          fontFamily: "",
        },
      }}
    >
                        <Steps
                    current={currentStep}
                    items={[
                    {
                        title: <p className='font-bold'>Select Location</p>,
                        description: <p className='text-sm w-full'>Location of the property</p>,
                    },
                    {
                        title: <p className='font-bold'>House Details</p>,
                        description: <p className='text-sm w-full'>Details of the property</p>,
                    },
                    {
                        title: <p className='font-bold'>Contact Information</p>,
                        description: <p className='text-sm w-full'>Verify the contact Information</p>,
                    },
                    ]}
                />
                </ConfigProvider>
    </div>
  )
}
