import React, { useState,useEffect, useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import ChangeProPic from '@/Components/ChangeProPic';
import './functions';
import InheritBot from '@/Components/InheritBot';
import ProfileRating from '@/Components/ProfileRating';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import ProfileUpdate from '@/Components/ProfileUpdate';
import LoadingIcons from 'react-loading-icons'

export default function Dashboard({ auth }) {
    
    const [current, setCurrent] = useState([]);
    const [inheritBot,setInheritBot] = useState(null);
    const [instructions,setInstructions] = useState(false);
    const [userRating, setUserRating] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const fetchRating = async () => {
            const response = await axios.get('/rating');
            setUserRating(response.data[0].rating);
            setIsLoading(false);
        }

        fetchRating()
    }, []);

    useEffect(() => {
        fetch(); 
    }, []);

    const handleUpdateProfilePic = useCallback(() => {
        fetch();
    }, []);

    const confirmInstruction = () => {
        setInstructions(true);
    }

    const closeModal = () => {
        setInstructions(false);
    };

    // console.log(current.name)

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
                                    <ChangeProPic onUpdate={handleUpdateProfilePic} />
                                </div>
                            </div>

                            <div className="col-md-5 card" id='gradient-box'>
                                <div className='d-flex justify-content-center p-3'>
                                    <img src="/images/user2.png"  className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                </div>
                                <InheritBot />
                            </div>

                            <div className="col-md-2 card flex-column " id='gradient-box'>
                                <div className="p-2 text-light text-center"> Your Profile Rating </div>

                                <center>
                                    <div className='p-2 mb-2'>
                                        <ProfileRating />
                                    </div>

                                    <p id='see-all' className='text-sm text-light hover:text-purple-700' onClick={confirmInstruction}> 
                                        <a> See all Stars & How to Upgrade </a>
                                    </p>
                                </center>
                            </div>

                        </div>

                        <div className='row mt-4'>

                            <div className="col-md-12 card" id='gradient-box'>

                                {/* <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            Accordion Item #1
                                        </button>
                                        </h2>
                                        <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                        style={{ height: '255px' }}
                                        >
                                        <div className="accordion-body">
                                            <div className='text-danger'>
                                            <strong>This is the first item's accordion body.</strong> It is shown by
                                            default, until the collapse plugin adds the appropriate classes that we
                                            use to style each element. These classes control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You can modify
                                            any of this with custom CSS or overriding our default variables. It's
                                            also worth noting that just about any HTML can go within the{" "}
                                            <code>.accordion-body</code>, though the transition does limit overflow.
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            Accordion Item #2
                                        </button>
                                        </h2>
                                        <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                        >
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            Accordion Item #3
                                        </button>
                                        </h2>
                                        <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                        >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        
                                        <div
                                        
                                        className="accordion-collapse collapse"
                                       
                                        >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className='card-header'>

                                    { isLoading ? (
                                        <>
                                            
                                            <center>
                                                <LoadingIcons.Bars />
                                            </center>
                                            
                                        </>
                                    ) : (
                                            <>             

                                        {userRating == 'Basic' ? 
                                            <>
                                                <center>
                                                    <div className="col-md-6 ">
                                                        <p className='text-center text-sm alert alert-warning m-1'> Hello <span className='text-capitalize'>{current.name}</span> . Your current profile rating is  <span className='badge text-bg-primary'>{userRating} </span> and your profile is ranked low. Complete your profile to become a Rockstar and rank above other applicants when you apply for a Job.  </p>
                                                    </div>
                                                </center>
                                            </> 
                                        : 
                                            <>
                                                <center>
                                                    <div className="col-md-6 ">
                                                        <p className='text-center alert alert-success m-1'> Your Profile is Top-Ranked  </p>
                                                    </div>
                                                </center>
                                            </>  
                                        }
                                        </>
                                    ) }                                  
                                    
                                </div>

                                <ProfileUpdate />

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Modal show={instructions} onClose={closeModal}>

                <div className="p-2 card text-center">                    

                    <div className='card-body'>
                        <p>  Here's how your profile rating translates to awesome benefits: </p>


                        <div className='mt-2 bg-dark text-light rounded p-2'>
                            
                            <ul id='profile-instruct' className='m-2'>
                                <li className='mb-3'> <b>Basic <span className='badge text-bg-success'> (Newcomer)</span>: </b> You just got started, but every step counts! Add your basic information and skills to get on the radar. </li>

                                <li className='mt-3 '> <b>Intermediate <span className='badge text-bg-primary'> (Rising Star)</span>: </b> You're climbing the ranks! Completing your work experience section unlocks more relevant job matches. </li>

                                <li className='mt-3'> <b>Advanced <span className='badge text-bg-info text-light'>(Ready to Shine)</span>:</b> Dazzle recruiters!  Showcase your skills and achievements with a complete profile. </li>

                                <li className='mt-3'> <b>Expert <span className='badge text-bg-warning text-light'>(Titan)</span>:</b> Become a force to be reckoned with!  Unlock exclusive job listings only available for top-ranked profiles. </li>

                                <li className='mt-3'> <b>Master <span className='badge text-bg-danger'>(Rock Star)</span>:</b> You've reached the pinnacle!  Inherit-Bot highlights you to recruiters seeking the best talent. </li>

                            </ul>
                        </div>

                        <div className='card-footer mt-3'>
                            <h1>
                                <b> Unlock the full potential of your <span id='roles'>Inherit-Bot to become a Rock Star! </span> </b> 
                            </h1>                             
                        </div>
                    </div>
                    
                  
                    <div className="mt-2 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                    </div>
                </div>

            </Modal>
        </AuthenticatedLayout>
    );
}
