
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import LoadingIcons from 'react-loading-icons'

const ProfileRating = () => {

    const [rating,setRating] = useState(null);
    const [rate,setRate] = useState([]);
    const [starr,setStarr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetch = async () => {
        setIsLoading(true);    
        try {
            const response = await axios.get('/rating');
            const data = response.data.map(item => ( {star: item.star, level:item.level, rating:item.rating} ));

            setRate(data);

            if (data.length > 0) {
                setStarr(data[0].star);
                setIsLoading(false);    
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
        fetch();  

    }, []);

    useEffect(() => {
        setRating(starr);            
    }, [starr]);



  return (
    <>

       { isLoading ? (
        <>
            
            <LoadingIcons.Bars />
            
        </>
       ) : (
            <>             

                    {rate.map((item) => (
                        <div className='mb-3'>
                                
                            <p id='rates' className='badge text-bg-primary'>Rating: <span id='rate-word'> {item.rating} </span></p>
                            <p id='rates' className='badge text-bg-success'>Level: <span id='rate-word'> {item.level} </span></p>
                                
                        </div>
                    ))}

                    {[...Array(5)].map((_,index )=> {

                        const currentRate = index + 1;

                        return (
                            
                            <>                

                                <label>

                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        id="check-rating" 
                                        value={currentRate} 
                                        defaultChecked={currentRate === starr}
                                                                  
                                    />

                                    <FaStar 
                                        size={50}
                                        color={ currentRate <= starr ? 'yellow':'grey' }
                                    />

                                </label>

                            </>
                        )

                    })}
            </>
        ) }

    </>
  )
}

export default ProfileRating
