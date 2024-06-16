
import React, { useEffect, useRef, useState } from 'react'
import CVUpload from './CVUpload'
import SecondaryButton from './SecondaryButton';
import Modal from './Modal';
import axios from 'axios';
import Select from './Select';
import './functions';
import './animate.css';
import { Link, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';
import InputError from './InputError';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import { useForm } from 'react-hook-form';


const ProfileUpdate = () => {

    const user = usePage().props.auth.user;

    const [updateSkills,setUpdateSkills] = useState(false);
    const [updateLinks, setUpdateLinks] = useState(false);
    const [userCategory, setUserCategory] = useState(null);   
    const [skills, setSkills] = useState(null);
    const [formStep, setFormStep] = useState(0);

    const { register, handleSubmit, setError, clearErrors, formState: { errors, isValid } } = useForm({mode: 'all'});


    const completeFormStep = () => {
        setFormStep(cur => cur + 1);
    }

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const handleFetch = async (e) => {
    //     const response = await axios.get(`/skills/${e.target.value}`);
    //    const data = response.data;
    //    setSkills(data);
    //     console.log(skills)

        let url = `/skills/${e.target.value}`

    
        fetch(url)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(data)
        {
             setSkills(data);
             console.log(skills)
            // setSkills(data);
            
            
        })
        .catch(function(err)
        {
            console.log(err)
            
        })
    }    

    const confirmUpdateSkills = () => {
        setUpdateSkills(true);
    }

    const confirmUpdateLinks = () => {
        setUpdateLinks(true);
    }

    const closeModal = () => {
        setUpdateSkills(false);
        setUpdateLinks(false);
    };
    
    const selectRef = useRef(null);

    // console.log(user)

    const buttonRender = () => {
        if (formStep > 4) {
            return ( 'undefined')
        }else if (formStep == 4) {
            return (
                <>
                    <div className="flex items-center gap-4">
                        <PrimaryButton type='button' onClick={completeFormStep}>Complete Profile</PrimaryButton>

                        {/* <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition> */}
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="flex items-center gap-4">
                        <PrimaryButton type='button' disabled={!isValid} onClick={completeFormStep}>Next Step</PrimaryButton>

                        {/* <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition> */}
                    </div>
                </>
            )
        }
    }

  return (
    <div>

                <div className='row mt-2'>
                    {/* <div className="p-4 text-light text-start" id='enlarge-text'> Skills/Experience</div> */}

                        <div className=' w-50 m-4 card card-body p-5'>
                            <center>

                                <Link id='pulse-button' href={route('profile.edit')}>Complete Your Profile </Link>
                        
                            </center>
                        </div>
                </div>


                <Modal show={updateSkills} onClose={closeModal}>

                    <div className="p-2 card text-center"> 

                        
                                <div className='container'>
                                    <div className='row'>

                                        <div className='col-md-3 rounded' id='profile-background' style={{ height: '500px', width: '200px' }}>

                                            <div className='container'>

                                                <div className='row'>
                                                    <div className=' col-md-12 flex-column'>

                                                    {formStep == 0 ? (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '40px', height: '30px' }}> 1 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p className="text-light"> BASIC INFO </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '40px', height: '30px' }}> 1 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p style={{color: 'GrayText'}}> BASIC INFO </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    )}

                                                    {formStep == 1 ? (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '40px', height: '30px',color: 'GrayText' }}> 2 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p className="text-light"> CATEGORY </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '70px', height: '30px',color: 'GrayText' }}> 2 </div>

                                                                    <div className='flex-column mt-1'>
                                                                        
                                                                        <p style={{color: 'GrayText'}}> CATEGORY </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    )}

                                                    {formStep == 2 ? (
                                                    <>
                                                        <center>
                                                            <div className='d-flex p-3'>
                                                                
                                                                    <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '30px', height: '30px',color: 'GrayText' }}> 3 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p className="text-light"> SKILLS </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <center>
                                                            <div className='d-flex p-3'>
                                                                
                                                                    <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '30px', height: '30px',color: 'GrayText' }}> 3 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p style={{color: 'GrayText'}}> SKILLS </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    )}

                                                    {formStep == 3 ? (
                                                    <>
                                                        <center>
                                                            <div className='d-flex p-3 '>
                                                                
                                                                    <div className='rounded-circle bg-light text-center m-1 ' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 4 </div>

                                                                    <div className='flex-column'>
                                                                        
                                                                        <p className="text-light"> WORK EXPERIENCE </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <center>
                                                            <div className='d-flex p-3 '>
                                                                
                                                                    <div className='rounded-circle border border-light text-center m-1 ' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 4 </div>

                                                                    <div className='flex-column'>
                                                                        
                                                                        <p style={{color: 'GrayText'}}> WORK EXPERIENCE </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    )}

                                                    {formStep == 4 ? (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 5 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p className="text-light"> CV UPLOAD </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    ) : (
                                                    <>
                                                        <center>
                                                            <div className='d-flex m-3'>
                                                                
                                                                    <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 5 </div>

                                                                    <div className='flex-column m-1'>
                                                                        
                                                                        <p style={{color: 'GrayText'}}> CV UPLOAD </p>
                                                                    </div>
                                                                
                                                            </div>
                                                        </center>
                                                    </>
                                                    )}

                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className='col-md-8 m-2'>

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

                                                        <div className='mt-2'>
                                                            <InputLabel htmlFor="bot" value="Bot Name" />

                                                            <TextInput
                                                                id="bot"
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                                name="botName"
                                                                {...register('botName', {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Please enter a name for your Bot"
                                                                    }
                                                                })}
                                                                                                                               
                                                                
                                                            />
                                                                {errors.text && <p className='text-danger text-sm mt-2 mt-1'>{errors.text.message}</p>}


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

                                                {buttonRender()}

                                            </form>

                                            
                                        </div>
                                    </div>
                                </div>
                    
                        <div className="mt-2 flex justify-end">
                            <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                        </div>
                    </div>

                </Modal>

    </div>
  )
}

export default ProfileUpdate
