
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
    const [rating,setRating] = useState(null);
    const [rate,setRate] = useState([]);
    const [starr,setStarr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStar = async () => {
        setIsLoading(true);    
        try {
            const response = await axios.get('/rating');
            const data = response.data.map(item => ( {star: item.star, level:item.level, rating:item.rating} ));

            setRate(data);

            if (data.length > 0) {
                setStarr(data[0].star);
                setIsLoading(false);    
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
        fetchStar();  

    }, []);

    useEffect(() => {
        setRating(starr);            
    }, [starr]);

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

                           {rating == 4 ? (<>
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
                                    
                                    <div className='alert alert-danger text-lg text-center'>
                                        Yo! Your bot is almost ready to get daily jobs that suits you. <br /> Your <b>Inherit-Bot</b> will work for you to the fullest when your profile has upto <b>4-star Rating</b>...
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
