

import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function ExperienceForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        bot_name: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className='card card-header'>
                <h2 className="text-lg font-medium text-gray-900" >Work Experience <span className="text-warning">(Earn 2 Stars)</span></h2>

                <p className="mt-1 text-sm text-gray-600">
                    Past job titles, company names, and dates of employment.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="bot_name" value="Job Title" />

                    <TextInput
                        id="bot_name"
                        
                        value={data.bot_name}
                        onChange={(e) => setData('bot_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        placeHolder='Enter your Bot name'
                    />

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bot_name" value="Company Name" />

                    <TextInput
                        id="bot_name"
                        
                        value={data.bot_name}
                        onChange={(e) => setData('bot_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        placeHolder='Enter your Bot name'
                    />

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bot_name" value="Years of Experience" />

                    <TextInput
                        id="bot_name"
                        
                        value={data.bot_name}
                        onChange={(e) => setData('bot_name', e.target.value)}
                        type="number"
                        className="mt-1 block w-full"
                        placeHolder='Enter your Bot name'
                    />

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="bot_name" value="Date of Employment" />

                    <div className="flex text-center gap-3 p-1"> 
                        <p className='text-sm'>Start:</p>
                        <TextInput
                            id="bot_name"
                            
                            value={data.bot_name}
                            onChange={(e) => setData('bot_name', e.target.value)}
                            type="date"
                            className="mt-1 block w-full"
                           
                        />
                        <p className='text-sm'>End:</p>
                        <TextInput
                            id="bot_name"
                            
                            value={data.bot_name}
                            onChange={(e) => setData('bot_name', e.target.value)}
                            type="date"
                            className="mt-1 block w-full"
                           
                        />
                    </div>

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <header className='card card-header'>
                    <h2 className="text-lg font-medium text-success" >Highly Recommended Details </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Increases searchability and understanding of experience.
                    </p>
                </header>

                <div>
                    <InputLabel htmlFor="bot_name" value="Location" />

                    <select className='form-control rounded' name="country" id="country">
                        <option value="">select a country</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Russia">Russia</option>
                    </select>
                </div>

                <div>
                    <InputLabel htmlFor="bot_name" value="Job Description" />

                    <textarea cols="20" placeholder='e.g. "Led the development of a new e-commerce platform, resulting in a 20% increase in sales." ' rows="5" name="profile_bio" className="form-control border border-info" id="profile_bio"></textarea>

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} >Save</PrimaryButton>

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
        </section>
    );
}
