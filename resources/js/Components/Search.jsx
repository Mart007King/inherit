import {React, useEffect, useState} from 'react';
import Modal from './Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

const Search = () => {

    const [post, setPost] = useState(false);

    const confirmPost = () => {
        setPost(true);
    }

    const closeModal = () => {
        setPost(false);

        reset();
    };

  return (
    <div>
        <div className='col-12 card search rounded'>

            <div className='card-body all d-flex gap-2'>

                <div className='col-2'> <img src="/images/user1.png" id='pic' className='rounded-circle img-fluid' alt="user profile picture" /> </div>

                <div className='d-grid col-9 '>
                    <button class="btn btn-light rounded-pill text-start" type="button" onClick={confirmPost}> <b>Start a Post</b> </button>
                </div>
                
            </div>

            <Modal show={post} onClose={closeModal}>
                <form  className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3">
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>

        </div>
    </div>
  )
}

export default Search
