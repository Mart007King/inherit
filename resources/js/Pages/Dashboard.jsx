import React, { useState,useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import ChangeProPic from '@/Components/ChangeProPic';
import './functions';
import InheritBot from '@/Components/InheritBot';

export default function Dashboard({ auth }) {
    
    const [current, setCurrent] = useState([]);
    const [inheritBot,setInheritBot] = useState(null);

    const fetch = async () => {
        try {
            const response = await axios.get('/user');
            // console.log(response)
            setCurrent(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetch();
        }, 5000);  
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
           
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='container overflow-hidden shadow-sm sm:rounded-lg'>

                        <div className='row justify-content-between'>

                            <div className="col-md-3 card" id='gradient-box'>
                                <div className='d-flex justify-content-center p-3'>
                                    {current.profile_picture ? (
                                        <img src={`/image/dp/${current.profile_picture}`} className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                    ) : (
                                        <img src="/images/user1.png" className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                    )}
                                </div>
                                <div className="card-body">
                                    <ChangeProPic />
                                </div>
                            </div>

                            <div className="col-md-5 card" id='gradient-box'>
                                <div className='d-flex justify-content-center p-3'>
                                    <img src="/images/user2.png"  className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                </div>
                                <InheritBot />
                            </div>

                            <div className="col-md-2 card" id='gradient-box'>
                                <div className="p-6 text-light">Inherit</div>
                            </div>

                        </div>

                        <div className='row mt-4'>

                            <div className="col-md-12 card" id='gradient-box'>
                                <div className="p-6 text-light"> cv upload and experience</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
