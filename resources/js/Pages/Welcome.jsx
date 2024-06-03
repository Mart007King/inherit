import { Link, Head } from '@inertiajs/react';
import './files';

import Sidebar from '@/Components/Sidebar';
import Search from '@/Components/Search';
import Feeds from '@/Components/Feeds';
import Profile from '@/Components/Profile';
import CVUpload from '@/Components/CVUpload';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="Welcome" />

                <aside id='aside'>

                    <div className='row border border-success mb-4'>

                                    <div className='col-md-12'>
                                       
                                        <div className='d-flex'>
                                                
                                                <div>
                                                    <img
                                                            alt="logo of inherit"
                                                            src="/images/logo.png"
                                                            className='img-fluid w-50 p-2'
                                                    />  
                                                </div>

                                                <div>

                                                    {auth.user ? (
                                                            <Link
                                                                href={route('dashboard')}
                                                                className="text-sm"
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        ) : (
                                                            <>

                                                                <div className='p-2'>
                                                                    <Link
                                                                        href={route('login')}
                                                                        className="tex-sm m-1"
                                                                    >
                                                                        Login
                                                                    </Link>

                                                                    <Link
                                                                        href={route('register')}
                                                                        className="text-sm"
                                                                    >
                                                                        Register
                                                                    </Link>
                                                                </div>
                                                                
                                                            </>
                                                    )}

                                                </div>
                                                
                                        </div>

                                       

                                    </div>

                    </div>

                    <div className='row'>

                        {auth.user ? (
                            <Sidebar />
                        ) : (
                            <>

                                <div className='p-2'>
                                    <h5 className='text-light text-center text-sm'>Yo! Kindly Register to enjoy all features</h5>
                                </div>

                                
                                                                
                            </>
                        )}      

                    </div>

                </aside>
                  
            <div className="container p-3" id='main'>

                    <div className='row justify-content-between'>

                        <div className='col-md-8'>

                            <section className='mb-3'>
                                <div className='row '>
                                    <Search />
                                </div>
                            </section>

                            <div className='mt-2 mb-3 m-4 card card-body p-2'>
                                    
                                    <video loop muted autoPlay>
                                        <source src="/explainer_vid.mp4" type="video/mp4" />
                                    </video>
                                    
                            </div>

                            <main className='mb-3'>
                                <div className='row '>
                                    <Feeds />
                                </div>
                            </main>

                            

                            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                                Laravel v{laravelVersion} (PHP v{phpVersion})
                            </footer>

                        </div>

                        <div className='col-md-4'>
                            <Profile />

                            {/* <div className="mt-6">
                                <CVUpload />
                            </div> */}
                        </div>

                    </div>   
                  
            </div>
        </>
    );
}
