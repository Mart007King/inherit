
import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import Select from './Select'
import InputError from './InputError'
import TextInput from './TextInput'
import InputLabel from './InputLabel'

const ProfileUpdateForm = ( {step} ) => {

    const [formStep, setFormStep] = useState(step);

  return (
    <div>
        <form className="mt-6 space-y-6">

{formStep === 0 && (
    <section>
        <div>
            <InputLabel htmlFor="name" value="Name (You can edit your name under Profile settings) " />

            <TextInput
                id="name"
                className="mt-1 block w-full"
                value={user.name}
                disabled             
            />

            <InputError className="mt-2" message={errors.name} />
        </div>

        <div className='mt-2'>
            <InputLabel htmlFor="email" value="Email (You can edit your email under Profile settings)" />

            <TextInput
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={user.email}
                disabled
                
            />

            <InputError className="mt-2" message={errors.email} />
        </div>
    </section>
)}

{formStep === 1 && (
    <section>
        <div className='flex-column '>
            <div className='card-header'>
                <h1 style={{ fontSize: '2em', color: 'purple' }}>Choose a Category</h1>
                <p>A category represents the industry of your skills/expertise</p>
            </div>                   

            <div className='card-body'>                            

                <center>
                    <Select
                        ref={selectRef}
                        className="mt-1 block w-3/4"
                        id="category"
                        name="category"
                        required  
                        onChange={(e) => handleFetch(e)}   
                    />
                </center>
                
            </div>
        </div>
    </section>
)}

<div className="flex items-center gap-4">
    <PrimaryButton disabled={processing}>Next</PrimaryButton>

    <Transition
        show={recentlySuccessful}
        enter="transition ease-in-out"
        enterFrom="opacity-0"
        leave="transition ease-in-out"
        leaveTo="opacity-0"
    >
        <p className="text-sm text-gray-600">Saved.</p>
    </Transition>
</div>
</form>
    </div>
  )
}

export default ProfileUpdateForm
