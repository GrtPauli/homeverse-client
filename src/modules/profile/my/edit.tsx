import { ApFileInput, AppCheckInput, AppLoader, AppSelectInput, Button, LocationSelector, TextInput } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import { Formik, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useProfileContext } from '../context'
import { years } from '@/constants/Helper'
import { AgentSpecialties, IProfile, Languages } from '../model'

export const EditProfilePage = () => {
  const { loading, getMyProfile, profile, updateProfile, updateLoading } = useProfileContext()
  const [photo, setPhoto] = useState<string>(null)
  const [country, setCountry] = useState<any>(null)
  const [countryFlag, setCountryFlag] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [city, setCity] = useState<any>(null)

  useEffect(() => {
    getMyProfile()
  }, [])

  const handleSubmit = (val: any) => {
    val.photo = photo
    val.photo == undefined && delete val.photo
    
    if(country == null || state == null || city == null ){
        updateProfile(val)
    }
    else{
        updateProfile({
            country: country?.name,
            countryFlag: country?.label?.props?.children[0]?.props?.src,
            state: state?.name,
            city: city?.name,
            ...val
        })
    }
  }
  const handleUpdatePhoto = (fl: any) => {
    // setStoreImage({
    //   filename: fl.file.name,
    //   base64Str: fl.uri,
    //   filetype: fl.file.type,
    // });

    setPhoto(fl.uri)
  };

  return (
    <>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <AppLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <AgentHubLayout>
          <div className="w-full flex justify-center">
            <div className="w-full bg-light-white rounded shadow-lg px-10 py-8">
              <h1 className="font-extrabold text-3xl mb-1">Edit Your Profile Information</h1>
              <p className="text-sm text-colors-cadet mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam facere doloremque hic
                sit velit similique!
              </p>

              <Formik
                initialValues={{
                  professionalTitle: profile?.professionalTitle,
                  brokerageName: profile?.brokerageName,
                  brokerageAddress: profile?.brokerageAddress,
                  primaryPhone: profile?.primaryPhone,
                  brokeragePhone: profile?.brokeragePhone,
                  inBusinessSince: profile?.inBusinessSince,
                  profileVideo: profile?.profileVideo,
                  website: profile?.website,
                  blog: profile?.blog,
                  facebook: profile?.facebook,
                  twitter: profile?.twitter,
                  linkedIn: profile?.linkedIn,
                  about: profile?.about,
                }}
                onSubmit={handleSubmit}
              >
                {(props: FormikProps<any>) => (
                  <div className="mt-10">
                    <div className="mb-10">
                      <h1 className="font-bold text-lg border-b pb-3 mb-5">Primary Info</h1>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Professional Title" name="professionalTitle" />
                        <AppSelectInput
                          options={years}
                          name="inBusinessSince"
                          defaultSelect='Select Year'
                          label="In Business Since"
                        />
                      </div>

                      <div className="flex justify-between gap-8 mb-5">
                        <div className='w-full'>
                            <TextInput label="About Me" name="about" textarea textAreaRows={10} />
                        </div>

                        {/* <div className='w-[50%]'>
                            <h1 className='text-dark-prussian-blue font-medium mb-3 pb-3 text-[15px] border-b'>Language Fluency</h1>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-[19px]'>
                                    {Object.values(Languages).slice(0, 6).map((item, i) => (
                                        <AppCheckInput name={item} label={item} key={i}/>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-[19px]'>
                                    {Object.values(Languages).slice(6, 12).map((item, i) => (
                                        <AppCheckInput name={item} label={item} key={i}/>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-[19px]'>
                                    {Object.values(Languages).slice(12, 18).map((item, i) => (
                                        <AppCheckInput name={item} label={item} key={i}/>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-[19px]'>
                                    {Object.values(Languages).slice(18, 24).map((item, i) => (
                                        <AppCheckInput name={item} label={item} key={i}/>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                      </div>

                      <div className="mb-5">
                        <h1 className='text-dark-prussian-blue font-medium mb-3 text-[15px]'>Profile Photo</h1>
                        <ApFileInput
                            title=""
                            onRemove={(file) => setPhoto(null)}
                            maxCount={1}
                            accept={"image/*"}
                            inputId="photo"
                            onSelected={(res: any) => {                                
                                if (res) {
                                    handleUpdatePhoto(res[0]);
                                }
                            }}
                            className="my-4 bg-cyan-500 text-white rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="mb-10">
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

                    <div className="mb-10">
                      <h1 className="font-bold text-lg border-b pb-3 mb-5">Brokerage Info</h1>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Brokerage Name" name="brokerageName" />
                        <TextInput label="Brokerage Address" name="brokerageAddress" />
                      </div>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Primary Phone Number" name="primaryPhone" />
                        <TextInput label="Brokerage Phone Number" name="brokeragePhone" />
                      </div>
                    </div>

                    <div className="mb-10">
                      <h1 className="font-bold text-lg border-b pb-3 mb-5">Social Info</h1>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Profile Video" name="profileVideo" />
                        <TextInput label="Website" name="website" />
                      </div>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Blog" name="blog" />
                        <TextInput label="Facebook" name="facebook" />
                      </div>
                      <div className="flex justify-between gap-8 mb-5">
                        <TextInput label="Twitter" name="twitter" />
                        <TextInput label="LinkedIn" name="linkedIn" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-5">
                      <Button onClick={() => props.handleSubmit()} title="Update Profile" fullWidth={false} />
                      <Button onClick={() => {}} title="Cancel Update" fullWidth={false} />
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </AgentHubLayout>
      )}
    </>
  )
}
