//theres a hidden error on this page but all is going well though.
import {React, useEffect, useState} from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import axios from 'axios';

export default function UpdateRecruiterInformation({status, className = '', auth }) {
    const user = usePage().props.auth.user;
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, patch, errors, processing,} = useForm({
        name: user.name || '',
        email: user.email || '',
        country: user.country || '',
        category: user.category || '',
        company_size: user.company_size || '',
        website_url: user.website_url || '',
        company_description: user.company_description || '',
        phone_number: user.phone_number || '',
        linkedin_profile: user.linkedin_profile || '',
    });

    const [recentlySuccessful, setrecentlySuccessful] = useState(false);
    const [categories, setCategories]  = useState([]);



    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await axios.post('/profileUpdate', data);

        if(response)
        {
        setrecentlySuccessful(true);
        setIsLoading(false);
        }else
        {
        console.log(response);
        }
        }catch(error)
        {
        console.log(error);
        setIsLoading(false);
        alert("Good")

        }
    };


    const getCategories = async () => {
        try
        {
            const response = await axios.get('/getCategories');
            if(response)
            {
                setCategories(response.data)
            }else
            {
                console.log(response)
            }
        }catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    })

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className={className}>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Update your Company's profile information
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Company name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        // required
                                        isFocused
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        disabled={true}
                                        className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        // required
                                        autoComplete="username"
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                {/* Country Selection */}
                                <div>
                                    <InputLabel htmlFor="country" value="Country" />
                                    <select
                                        id="country"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                    >
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Russia">Russia</option>
                                    </select>
                                    <InputError className="mt-2" message={errors.country} />
                                </div>

                                {/* Industry */}
                                <div>
                                    <InputLabel htmlFor="category" value="Category" />
                                    <select
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        name="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        required
                                    >
                                        <option value=''>Select Category</option>
                                        {Array.isArray(categories) && categories.length > 0 ? (
                                            categories.map(category => (
                                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                            ))
                                        ) : (
                                            <p>No Category Found</p>
                                        )}
                                    </select>
                                    <InputError className="mt-2" message={errors.category} />
                                </div>

                                {/* Company Size */}
                                <div>
                                    <InputLabel htmlFor="company_size" value="Company Size" />
                                    <select
                                        id="company_size"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.company_size}
                                        onChange={(e) => setData('company_size', e.target.value)}
                                    >
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-500">201-500</option>
                                        <option value="501-1000">501-1000</option>
                                        <option value="1001+">1001+</option>
                                    </select>
                                    <InputError className="mt-2" message={errors.company_size} />
                                </div>

                                {/* Website URL */}
                                <div>
                                    <InputLabel htmlFor="website_url" value="Website URL" />
                                    <TextInput
                                        id="website_url"
                                        className="mt-1 block w-full"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        // required
                                        autoComplete="url"
                                    />
                                    <InputError className="mt-2" message={errors.website_url} />
                                </div>

                                {/* Company Description */}
                                <div>
                                    <InputLabel htmlFor="company_description" value="Company Description" />
                                    <textarea
                                        id="company_description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.company_description}
                                        onChange={(e) => setData('company_description', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.company_description} />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                                    <TextInput
                                        id="phone_number"
                                        className="mt-1 block w-full"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        // required
                                        autoComplete="tel"
                                    />
                                    <InputError className="mt-2" message={errors.phone_number} />
                                </div>

                                {/* LinkedIn Profile */}
                                <div>
                                    <InputLabel htmlFor="linkedin_profile" value="LinkedIn Profile" />
                                    <TextInput
                                        id="linkedin_profile"
                                        className="mt-1 block w-full"
                                        value={data.linkedin_profile}
                                        onChange={(e) => setData('linkedin_profile', e.target.value)}
                                        // required
                                        autoComplete="url"
                                    />
                                    <InputError className="mt-2" message={errors.linkedin_profile} />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={isLoading}>
                                        {isLoading ? 'Saving..' : 'Save'}
                                    </PrimaryButton>
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
