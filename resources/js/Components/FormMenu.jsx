
import React, { forwardRef, useEffect, useState } from 'react'

const FormMenu = ( {props} ) => 
{    
    const [formStep,setFormStep] = useState(props);
    // setInterval(() => {
    //     setFormStep(props)
    // }, 1000);

  return (
    <div>
        <div className=' col-md-12 flex-column'>

        {formStep == 0 ? (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '40px', height: '30px' }}> 1 </div>

                        <div className='flex-column m-1'>
                            
                            <p className="text-light"> BASIC INFO </p>
                        </div>
                    
                </div>
            </center>
        </>
        ) : (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '40px', height: '30px' }}> 1 </div>

                        <div className='flex-column m-1'>
                            
                            <p style={{color: 'GrayText'}}> BASIC INFO </p>
                        </div>
                    
                </div>
            </center>
        </>
        )}

        {formStep == 1 ? (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle border bg-light text-center m-1 mx-2' style={{ width: '70px', height: '30px',color: 'GrayText' }}> 2 </div>

                        <div className='flex-column m-1'>
                            
                            <p className="text-light"> CATEGORY </p>
                        </div>
                    
                </div>
            </center>
        </>
        ) : (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '70px', height: '30px',color: 'GrayText' }}> 2 </div>

                        <div className='flex-column mt-1'>
                            
                            <p style={{color: 'GrayText'}}> CATEGORY </p>
                        </div>
                    
                </div>
            </center>
        </>
        )}

        {formStep == 2 ? (
        <>
            <center>
                <div className='d-flex p-3'>
                    
                        <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '30px', height: '30px',color: 'GrayText' }}> 3 </div>

                        <div className='flex-column m-1'>
                            
                            <p className="text-light"> SKILLS </p>
                        </div>
                    
                </div>
            </center>
        </>
        ) : (
        <>
            <center>
                <div className='d-flex p-3'>
                    
                        <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '30px', height: '30px',color: 'GrayText' }}> 3 </div>

                        <div className='flex-column m-1'>
                            
                            <p style={{color: 'GrayText'}}> SKILLS </p>
                        </div>
                    
                </div>
            </center>
        </>
        )}

        {formStep == 3 ? (
        <>
            <center>
                <div className='d-flex p-3 '>
                    
                        <div className='rounded-circle bg-light text-center m-1 ' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 4 </div>

                        <div className='flex-column'>
                            
                            <p className="text-light"> WORK EXPERIENCE </p>
                        </div>
                    
                </div>
            </center>
        </>
        ) : (
        <>
            <center>
                <div className='d-flex p-3 '>
                    
                        <div className='rounded-circle border border-light text-center m-1 ' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 4 </div>

                        <div className='flex-column'>
                            
                            <p style={{color: 'GrayText'}}> WORK EXPERIENCE </p>
                        </div>
                    
                </div>
            </center>
        </>
        )}

        {formStep == 4 ? (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle bg-light text-center m-1 mx-2' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 5 </div>

                        <div className='flex-column m-1'>
                            
                            <p className="text-light"> CV UPLOAD </p>
                        </div>
                    
                </div>
            </center>
        </>
        ) : (
        <>
            <center>
                <div className='d-flex m-3'>
                    
                        <div className='rounded-circle border border-light text-center m-1 mx-2' style={{ width: '40px', height: '30px', color: 'GrayText' }}> 5 </div>

                        <div className='flex-column m-1'>
                            
                            <p style={{color: 'GrayText'}}> CV UPLOAD </p>
                        </div>
                    
                </div>
            </center>
        </>
        )}

        </div>
    </div>
  )
};

export default FormMenu
