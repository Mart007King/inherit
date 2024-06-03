
import React, { useState,useEffect } from 'react';

let progressInterval = null;

const ProgressBar = () => {

    const [loading, isLoading] = useState(false);
    const [progress,setProgress] = useState(0);

    useEffect(() => {        
        if (loading) {
            progressInterval = setInterval(() => {
                setProgress(prev => prev + 1);
            }, 1000);
        }
    }, [loading]);

    useEffect(() => {
        if (progress == 100) {
            clearInterval(progressInterval);
            isLoading(false);
        }
    }, [progress]);

  return (
    <>        
        <center>

            <div className='progress w-50' style={{height: 30}}>

                <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style={{width: `${progress}%`,backgroundColor: 'purple'}}> {progress}% </div>

            </div>

            <div className='p-3'>
                <button className='btn btn-sm mt-3 btn-success text-center' onClick={()=>{isLoading(true)}} disabled={loading}>
                    {loading ? 'Bot is getting jobs...' : 'Start Inherit Bot'}
                </button>
            </div>
        </center>

        
    </>
    
  )
}

export default ProgressBar
