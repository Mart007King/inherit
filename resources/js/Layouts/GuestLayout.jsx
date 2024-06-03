import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return ( 
        <div className='container-fluid' id='register'>
            <div className='row'>
                <div className="card-lg flex flex-col sm:justify-center items-center pt-6 sm:pt-0 p-4"  >
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    </div>

                    <div id='reg-card' className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
