import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleAuth from '@/Components/GoogleAuth';
import '../files';
import './reg'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',        
        password: '',
        user_type: '',
        country: '',
        password_confirmation: '',
    });

    const [role, setRole] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const handleCreate = (e) => {
        e.preventDefault();        
    
        if (data.user_type) {
            setIsLoading(true);
            setRole(true)
        }else {
            alert("Kindly select a role")
        }
       
    };

    return (
        <GuestLayout>
            <Head title="Register" /> 

            {role ? (
                data.user_type == 'applicant' ? (
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="country" value="Country" />

                            <select className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' name="country" onChange={(e) => setData('country', e.target.value)}>
                                <option value=""> Please select your Country </option>
                                <option value="Nigeria"> Nigeria </option>
                                <option value="Russia"> Russia </option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Already registered?
                            </Link>
                            <GoogleAuth/>
                            <PrimaryButton className="ms-1" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Company name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Company Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="country" value="Country" />

                            <select className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full' name="country" onChange={(e) => setData('country', e.target.value)}>
                                <option value=""> Please select your Country </option>
                                <option value="Nigeria"> Nigeria </option>
                                <option value="Russia"> Russia </option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link
                                href={route('login')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Already registered?
                            </Link>
                            <GoogleAuth/>
                            <PrimaryButton className="ms-1" disabled={processing}>
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                )

            ): (

                <form onSubmit={handleCreate}>
                    <div className="card-body">

                        <h4 className="card-title mb-5 text-center">Join as an Applicant or a Recruiter </h4>

                        <div className="input-group col-10 mt-5 grid gap-5 column-gap-5 d-flex justify-content-between">

                            <div className="input-group-text col-5 p-3">
                                <div className="card box" id="box1" onClick={() => setData('user_type', 'recruiter')}>
                                    <div className="card-body box" id="box">
                                        <input className="form-check-input mt-0 cli" id="client" type="radio" name="sign" value="recruiter" onChange={(e) => setData('user_type', e.target.value)} aria-label="Radio button for following text input"  />
                                        <p  id="text1">I'm a <b id='roles'>Recruiter</b>,<br/> looking to employ a talent</p>
                                    </div>
                                </div>
                                                        
                            </div>
                                                    
                            <div className="input-group-text col-5 p-3">
                                <div className="card box" id="box2" onClick={() =>setData('user_type', 'applicant')}>
                                    <div className="card-body box" id="box">
                                        <input className="form-check-input mt-0 cli" id="free" type="radio" name="sign" value="applicant" aria-label="Radio button for following text input" onChange={(e) => setData('user_type', e.target.value)} />
                                        <p id="text2">I'm an <b id='roles'>Applicant</b>,<br/> looking to get employed</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                                
                        <div id='user-button' className='card-footer text-center'>
                            <button type="submit" className="btn btn-secondary mt-5 text-light" disabled={isLoading} >
                                {isLoading ? 'Loading...' : 'Create Account'}
                            </button>
                        </div>
                               
                                
                    </div>
                </form>  

            )}
        </GuestLayout>
    );
}
