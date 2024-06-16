
import { useCallback, useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ProfileOverview({ className = '' }) {
    const [userTitle,setUserTitle] = useState(null);
    const [updateInfo,setUpdateInfo] = useState(false);

    const { data, setData, errors, post, patch, reset, processing, recentlySuccessful } = useForm({
        profile_title: '',
    });

    const saveTitle = (e) => {
        e.preventDefault();

        post(route('title.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.profile_title) {
                    reset('profile_title');
                }
            },
        });
    };

    const getTitle = async () => {
        let response = await axios.get('/user-title');
        setUserTitle(response.data[0].profile_title);
    }

    useEffect(() => {
        getTitle()
    }, []);

    const confirmUpdateInfo = () => {
        setUpdateInfo(true);
    }

    const closeModal = () => {
        setUpdateInfo(false);
    };

    const handleEdit = (e) => {
        e.preventDefault();

        patch(route('title.edit'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.profile_title) {
                    reset('profile_title');
                }
            },
        });

        getTitle();
    };

    return (
        <section className={className}>
            <header className='card card-header'>
                <h2 className="text-lg font-medium text-gray-900" >Profile Title <span className="text-warning">(Earn 1 Star)</span></h2>

                <p className="mt-1 text-sm text-gray-600 p-2">
                    Enter a sentence tha describes your professional skills/experience (e.g. Expert Web Designer with Ajax experience)
                </p>
            </header>

            {userTitle ? (
                <>
                    <div className="p-3 d-flex mt-2">
                         <p className='alert alert-success text-lg'>{userTitle}</p>

                         <button className='mx-4 ' onClick={confirmUpdateInfo}>Edit Profile Title</button>
                    </div>
                    
                </>
            ) : (
                <>
                    <form onSubmit={saveTitle} className="mt-6 space-y-6">

                        <div>
                            {/* <InputLabel htmlFor="bot_name" value="Biography" /> */}

                            <TextInput
                                id="profile_title"
                                name="profile_title"
                                value={data.profile_title}
                                onChange={(e) => setData('profile_title', e.target.value)}
                                type="text"
                                className="mt-1 block w-full"
                                placeHolder='e.g. Expert Web Designer with Ajax experience' 
                            />

                            <InputError message={errors.profile_title} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing} >Save</PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved, You have earned half-a-star. </p>
                            </Transition>
                        </div>

                    </form>
                </>
            )}

            <Modal show={updateInfo} onClose={closeModal}>

                <div className="p-2 card text-center"> 

                    <div className="card-header">Edit Profile Title</div>                   

                    <div className='card-body'>
                        <form onSubmit={handleEdit} className="mt-6 space-y-6">

                            <div>
                                {/* <InputLabel htmlFor="bot_name" value="Biography" /> */}

                                <TextInput
                                    id="profile_title"
                                    name="profile_title"
                                    value={data.profile_title}
                                    onChange={(e) => setData('profile_title', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    placeHolder='e.g. Expert Web Designer with Ajax experience' 
                                />

                                <InputError message={errors.profile_title} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing} >Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Profile title updated successfully! </p>
                                </Transition>
                            </div>

                        </form>
                    </div>
                    
                  
                    <div className="mt-2 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                    </div>
                </div>

            </Modal>
            
        </section>
    );
}
