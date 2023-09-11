<AgentHubLayout>
<div className='w-full flex justify-center'>
  <div className='w-full flex justify-between gap-8 items-start'>
    <div className='bg-light-white rounded shadow-lg w-[70%] px-10 py-8'>
      <div className='flex items-center gap-5 mb-10'>
        <div className='w-[120px] h-[120px]'>
            <Image
                className='rounded-full object-cover'
                // preview={{
                //     maskClassName: "rounded-full"
                // }}
                width="100%"
                height="100%" 
                src={profile?.photo || UserImg.src}
            />
        </div>

        <div>
          <h1 className='font-extrabold text-2xl mb-1'>{user?.firstname} {user?.lastname}</h1>
          <p className='text-sm text-colors-cadet'>{user?.email}</p>
          {/* <p className='text-sm text-colors-cadet'>{user?.userType}</p> */}
        </div>
      </div>

      <div className='flex flex-col gap-10'>
        <div>
          <h1 className='font-extrabold text-xl mb-0.5 border-b pb-5'>About Me</h1>
          <div className='pt-5'>
            <p className='text-sm leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nisi qui accusantium eligendi quisquam! Consectetur vel illo quisquam odio eius expedita laboriosam tenetur, odit enim ipsa dolorum mollitia voluptatem doloremque fugit vero earum nam illum veritatis sapiente corrupti, nostrum adipisci magni dicta dolore. A, minima itaque. Corrupti saepe non reiciendis!</p>
          </div>
        </div>

        <div>
          <h1 className='font-extrabold text-xl mb-0.5 border-b pb-5'>Personal Info</h1>
          <div className='pt-5'>
            <p className='text-sm leading-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nisi qui accusantium eligendi quisquam! Consectetur vel illo quisquam odio eius expedita laboriosam tenetur, odit enim ipsa dolorum mollitia voluptatem doloremque fugit vero earum nam illum veritatis sapiente corrupti, nostrum adipisci magni dicta dolore. A, minima itaque. Corrupti saepe non reiciendis!</p>
          </div>
        </div>

        <div>
          <h1 className='font-extrabold text-xl mb-0.5 border-b pb-5'>Ratings & Reviews</h1>
        </div>
      </div>
    </div>

    <div className='w-[30%] h-full flex flex-col gap-8'>
      <div className='w-full bg-light-white rounded shadow-lg'>
        <h1 className='font-bold text-lg border-b py-3 px-5'>Manage Profile</h1>
        <p className='mx-5 text-sm mt-3 leading-7 text-colors-cadet'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.</p>
        <div className='px-5 py-5 flex flex-col gap-5'>
          <Button 
            title="Edit Profile"
            paddingY='py-3.5'
            onClick={() => router.push("/dashboard/profile/edit")}
          />
          <Button 
            title="Change Password"
            paddingY='py-3.5'
          />
          <Button 
            title="Account Settings"
            paddingY='py-3.5'
          />
        </div>

        {/* <div className='px-5 py-5 flex flex-col gap-5'>
          <Button 
            outline
          >
            <Image src={EditIcon} alt="edit" width={25} height={25} />
            Edit Profile
          </Button>

          <Button 
            outline
            paddingY='py-2.5'
          >
            <Image src={EditP} alt="edit" width={30} height={30} />
            Change Password
          </Button>

          <Button 
            outline
            paddingY='py-1.5'
          >
            <Image src={Settings} alt="edit" width={40} height={40} />
            Account Settings
          </Button>
        </div> */}
      </div>  

      <div className='w-full bg-light-white rounded shadow-lg'>
        <h1 className='font-bold text-lg border-b py-3 px-5'>Profile Status</h1>

        <div className='pl-5 pr-2 py-5'>
          <Progress percent={100} />
          <p className='text-sm mt-1 text-colors-cadet'>Your profile is 0% complete</p>
        </div>

        <div className='px-5 pb-5 flex flex-col gap-5'>
          <div className='flex gap-3 items-center'>
            <div className='w-[32px] h-[32px] text-[14px] text-center leading-8 rounded-[32px] bg-colors-cadet text-light-white'>
              <span>1</span>
            </div>

            <h1 className='text-sm'>Add a photo</h1>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-[32px] h-[32px] text-[14px] text-center leading-8 rounded-[32px] bg-colors-cadet text-light-white'>
              <span>2</span>
            </div>

            <h1 className='text-sm'>Add "About me"</h1>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-[32px] h-[32px] text-[14px] text-center leading-8 rounded-[32px] bg-colors-cadet text-light-white'>
              <span>3</span>
            </div>

            <h1 className='text-sm'>Add "About me"</h1>
          </div>
          <div className='flex gap-3 items-center'>
            <div className='w-[32px] h-[32px] text-[14px] text-center leading-8 rounded-[32px] bg-colors-cadet text-light-white'>
              <span>4</span>
            </div>

            <h1 className='text-sm'>Add "About me"</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</AgentHubLayout>