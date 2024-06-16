import React, { useState,useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import GetCompany from '@/Components/GetCompany';


export default function Company({ auth })   {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Company</h2>}
        >
        <Head title="My Company"/>
        <GetCompany/>
        </AuthenticatedLayout>
    )
}