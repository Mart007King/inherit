import { Link, Head } from '@inertiajs/react';
import './files';
import '@/Components/main.css';
import Sidebar from '@/Components/Sidebar';
import Search from '@/Components/Search';
import Feeds from '@/Components/Feeds';
import Profile from '@/Components/Profile';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

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

                    <div className='row border border-info'>

                        <Sidebar />         

                    </div>

                </aside>

                  
            <div className="container-fluid p-3" id='main'>

                    <div className='row justify-content-between p-3'>

                        <div className='col-md-8'>

                            <section className='mb-3'>
                                <div className='row '>
                                    <Search />
                                </div>
                            </section>

                            <main className='mb-3'>
                                <div className='row '>
                                    <Feeds />
                                </div>
                            </main>

                            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                                Laravel v{laravelVersion} (PHP v{phpVersion})
                            </footer>

                        </div>

                        <div className='col-md-3 border border-success'>
                            <Profile />
                        </div>

                    </div>

                    

                   

                
                  
            </div>
        </>
    );
}
