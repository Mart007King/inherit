import { React, useEffect, useState} from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import '@/Pages/files'
import '@/Pages/Auth/reg'
import axios from 'axios';


export default function GoogleAuth()    {


    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };


    return (
        <>
            <button className='ms-2 btn btn-danger fa-brands fa-google'
            onClick={handleGoogleLogin}
            >
            </button>
        </>
    )
}