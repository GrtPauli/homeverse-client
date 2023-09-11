import { Footer, Header } from '@/components'
import { CTA } from '@/modules/home/components'
import React, { useState } from 'react'
import { ProfileDetails } from './components'
import { HvButton, HvModal, HvTextInput } from '@/components'
import { Formik, FormikProps } from 'formik'
import { HvSendMailIcon } from '@/assets/icons'
import SendMailImg from "../../../../../assets/images/mail.png"
import MailSentImg from "../../../../../assets/images/mail-check.png"
import Image from 'next/image'

interface IModalData {
  open: boolean
  content?: "name" | "screen-name" | "verify-email" | "edit-email" | "change-password"
}

export const RegularProfile = () => {
  const [showModal, setShowModal] = useState<IModalData>(null)

  return (
    <>
      <div className="w-full bg-light-cultured-3">
          <Header/>
          <div className="pt-[100px]"> 
              <ProfileDetails setShowModal={setShowModal}/>
          </div>

          <div>
              <CTA/>
              <Footer/>
          </div>
      </div>

      <HvModal
        open={showModal?.open}
        onCancel={() => setShowModal({ open: false })}
        onDismiss={() => setShowModal({ open: false })}
        title={
          showModal?.content == "name" ? "Edit Your Name" : 
          showModal?.content == "screen-name" ? "Edit Your Screen Name" :
          showModal?.content == "verify-email" ? "Verify Your Email" :
          showModal?.content == "edit-email" ? "Change Your Email" :
          "Change Your Password"
        }
      >
        {showModal?.content == "name" && <EditName/>}
        {showModal?.content == "screen-name" && <EditScreenName/>}
        {showModal?.content == "verify-email" && <VerifyEmail/>}
        {showModal?.content == "edit-email" && <EditEmail/>}
        {showModal?.content == "change-password" && <ChangePassword/>}
      </HvModal>
    </>
  )
}


const EditName = () => (
  <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props: FormikProps<any>) => (
          <div className='flex flex-col gap-5'>
            <HvTextInput name='firstname' label='First Name'/>
            <HvTextInput name='lastname' label='Last Name'/>

            <div className='flex justify-end gap-3 mt-5'>
              <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
              <HvButton paddingX='px-8' paddingY='py-3' fullWidth={false} title="Apply"/>
            </div>
          </div>
        )}
      </Formik>
  </div>
)

const EditScreenName = () => (
<div>
    <Formik initialValues={{}} onSubmit={() => {}}>
      {(props: FormikProps<any>) => (
        <div className='flex flex-col gap-5'>
          <HvTextInput name='screenName' label='Screen Name'/>

          <div className='flex justify-end gap-3 mt-5'>
            <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
            <HvButton paddingX='px-8' paddingY='py-3' fullWidth={false} title="Apply"/>
          </div>
        </div>
      )}
    </Formik>
</div>
)

const VerifyEmail = () => {
  const [mailSent, setMailSent] = useState<boolean>(false)

  return (
    <>
      {mailSent ? (
        <div>
          <div className='flex flex-col items-center justify-center mb-5 text-center gap-3'>
            <Image alt='mail' src={MailSentImg} width={100} height={100}/>
            <p className='leading-7'>
              To verify your account open the email sent to <span className='font-bold '>paul.asynctechs@gmail.com</span>
            </p>
          </div>

          <div className='flex justify-end gap-3 mt-8'>
            <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
            <HvButton paddingX='px-8' paddingY='py-3' fullWidth={false} title="Resend Email"/>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex flex-col items-center justify-center mb-5 text-center gap-3'>
            <Image alt='mail' src={SendMailImg} width={100} height={100}/>
            <p className='leading-7'>To verify your email, select "Send verification email"<br/> and then check your inbox.</p>
          </div>
    
          <div className='flex justify-end gap-3 mt-8'>
            <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
            <HvButton onClick={() => setMailSent(true)} paddingX='px-8' paddingY='py-3' fullWidth={false} title="Send Verification Email"/>
          </div>
        </div>
      )}
    </>
  )
}

const EditEmail = () => (
  <div>
    <p className='mb-3'>
      Your current email is <span className='font-bold inline-block'>paul.asynctechs@gmail.com.</span>
    </p>
    <Formik initialValues={{}} onSubmit={() => {}}>
      {(props: FormikProps<any>) => (
        <div className='flex flex-col gap-5'>
          <HvTextInput name='firstname' label='New Email'/>
          <HvTextInput name='lastname' label='Your Password'/>

          <div className='flex justify-end gap-3 mt-5'>
            <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
            <HvButton paddingX='px-8' paddingY='py-3' fullWidth={false} title="Apply"/>
          </div>
        </div>
      )}
    </Formik>
  </div>
)

const ChangePassword = () => (
  <div>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props: FormikProps<any>) => (
          <div className='flex flex-col gap-5'>
            <HvTextInput name='firstname' label='Current Password'/>
            <HvTextInput name='lastname' label='New Password'/>
            <HvTextInput name='lastname' label='Confirm Password'/>

            <div className='flex justify-end gap-3 mt-5'>
              <HvButton outline paddingX='px-8' paddingY='py-3' fullWidth={false} title="Cancel"/>
              <HvButton paddingX='px-8' paddingY='py-3' fullWidth={false} title="Apply"/>
            </div>
          </div>
        )}
      </Formik>
  </div>
)