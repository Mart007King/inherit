import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        bot_name: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className='card card-header'>
                <h2 className="text-lg font-medium text-gray-900">Bot Personalization <span className="text-warning">(Earn 5 Stars)</span> (Coming Soon !!!)</h2>

                <p className="mt-1 text-sm text-gray-600">
                    You can choose a name for your Bot and select your Plan
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="bot_name" value="Bot Name" />

                    <TextInput
                        id="bot_name"
                        disabled
                        value={data.bot_name}
                        onChange={(e) => setData('bot_name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        placeHolder='Enter your Bot name'
                    />

                    <InputError message={errors.bot_name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Subscription Plan" />

                    <div className="mt-3">
                        <center>
                            <div className="d-flex">
                                <button type='button'>
                                    <div className="card m-3 bg-warning" style={{height: '150px', width: '200px'}}>
                                        <h1 className="text-center text-bg text-light mt-5" style={{fontSize:'large'}}> Your Current Plan </h1>
                                        <p className="text-center text-bg text-info "> (Freemium Package) </p>
                                    </div>
                                </button>


                               <button type="button">

                                    <div className="card m-3 bg-success" style={{height: '150px', width: '200px'}}>
                                        <h1 className="text-center text-bg text-light mt-5" style={{fontSize:'large'}}> Premium Plan </h1>
                                    </div>

                               </button>
                            </div>
                        </center>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled >Coming Soon</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
