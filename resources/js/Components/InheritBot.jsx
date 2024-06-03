
import {React, useEffect, useState} from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import ProgressBar from './ProgressBar';

const InheritBot = () => {

    const [picture, setPicture] = useState(false);
    const [info, setInfo] = useState([]);
    const [userPicture, setUserPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
       

    const fetchProfile = async () => {

        // setIsLoading(true);
        // setError(null);

        try {
            const response = await axios.get('/user-information');
            setInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const confirmPicture = () => {
        setPicture(true);
    }

    const closeModal = () => {
        setPicture(false);
    };

    const change = (e) => {
        e.preventDefault();
    }

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
        fetch();
        
    }, []);

  return (
    <div>

            <div className="text-light text-center" id='enlarge-text'>
                <button className="btn btn-light rounded-pill text-start" type="button" onClick={confirmPicture}> <b>Start Your Inherit-Bot</b> </button>
            </div>

            <Modal show={picture} onClose={closeModal}>
                <div className="p-6">

                    <div className="mt-1 text-sm text-gray-600 d-flex">

                        <div className="col-md-12 m-3 flex-column">

                           {info.experience ? (<>
                                <div className='mt-2 mb-3 m-4 card card-body p-2'>
                                    
                                    <video loop muted autoPlay>
                                        <source src="/explainer_vid.mp4" type="video/mp4" />
                                    </video>
                                        
                                </div>
    
                                <div>
                                    <ProgressBar />
                                </div>
                           </>):(<>
                                <div className='mt-2 mb-3 m-4 card card-body p-2'>
                                    
                                    <div className='alert alert-danger text-lg'>
                                        Yo! You need to complete your profile to get the most out of your Inherit-Bot. Focus on adding your work experience and skills..
                                    </div>
                                        
                                </div>
    
                           </>)}

                        </div>
                        
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </div>
            </Modal>
      
    </div>

    
  )
}

export default InheritBot
