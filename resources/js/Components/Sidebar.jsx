import React from 'react';
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div>
      <div className='col-md-12 p-5'>
            <div className=" text-center">
                                            
                <nav id='main-menu'>

                    <ul>
                        <li class="colorlib-active"><a href="index.html">  Home</a></li>
                        <li><a href="fashion.html">Fashion</a></li>
                        <li><a href="travel.html">Travel</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>

                </nav>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
