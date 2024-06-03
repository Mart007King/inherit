import React from 'react';
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <div className='col-md-12 p-5'>
            <div className=" text-center">
                                            
                <nav id='main-menu'>

                    <ul>
                        <li class="colorlib-active"><a href="index.html"> <i className='fa fa-home'></i> Home</a></li>
                        <li><a href="fashion.html"> <i className='fa fa-people'></i> Messages</a></li>
                        <li><a href="travel.html"> <i className='fa fa-alert'></i> Notification</a></li>
                        <li><a href="about.html"> <i className='fa fa-briefcase'></i> Jobs</a></li>
                        <li><a href="contact.html"> <i className='fa fa-settings'></i> Settings</a></li>
                    </ul>

                </nav>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
