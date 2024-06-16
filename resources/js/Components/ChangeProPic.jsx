
import {React, useEffect, useState} from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const ChangeProPic = ( {onUpdate} ) => {

    const [picture, setPicture] = useState(false);
    const [current, setCurrent] = useState([]);
    const [userPicture, setUserPicture] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('propic', file);

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('/upload-picture', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

            setUserPicture(response.data);
            setIsLoading(false);
            fetch();
            if(onUpdate) onUpdate();
            
        } catch (error) {
            console.error(error);
            setError(error);
            setIsLoading(false);
        }
    };

    const confirmPicture = () => {
        setPicture(true);
    }

    const closeModal = () => {
        setPicture(false);
    };

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
                <button className="btn btn-light rounded-pill text-start" type="button" onClick={confirmPicture}> <b>Change Profile Picture</b> </button>
            </div>

            <Modal show={picture} onClose={closeModal}>
                <div className="p-6">

                    <div className="mt-1 text-sm text-gray-600 d-flex">
                        
                        <div className='col-md-6 '>
                            <center>
                                {current.profile_picture ? (
                                    <img src={`/image/dp/${current.profile_picture}`} className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                ) : (
                                    <img src="/images/user1.png" className='img-fluid w-20 rounded-circle' alt="user profile pic" />
                                )}
                            </center>
                        </div>

                        <div className="col-md-6 m-3">

                            <form onSubmit={handleUpload}>
                                <input type="file" accept=".jpeg,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} required className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' />

                                <button className='btn mt-2 btn-success' type="submit" disabled={isLoading}>
                                    {isLoading ? 'Uploading...' : 'Upload Profile Picture'}
                                </button>
                                {error && <p className="error">{error}</p>}
                            </form>
                        
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

export default ChangeProPic
