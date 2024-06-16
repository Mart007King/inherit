
import React, { useState, forwardRef, useEffect} from "react";
import axios from "axios";

const SelectDropdown = forwardRef(( props, ref ) =>
{
    const { className = '', isFocused = false, ...rest } = props;

    const [options, setOptions] = useState([]);

    
    // console.log(setId);

    useEffect( ()=>{

       fetchData();

        if (isFocused) {
            input.current.focus();
        }
    }, [] );

      const fetchData = async () => {
       
          try {
            const response = await axios.get('/states');
            // console.log(response);
            setOptions(response.data.map(item => ({ value: item.state_id, label: item.state_name })));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
   
        
      }

    if (Array.isArray(options)) {
        // Use .map() function safely
        return (
            <select
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className}
                ref={ ref } 
                { ...rest }
            >
              <option value="">  Please select a state  </option>
                { options.map( item => (
                    <option key={ item.value } value={ item.value }>                      
                        { item.label } 
                    </option>
                ))}
            </select>
        );
      } else {
        // Handle the case where data is not an array
        return (
          <div>
            Error: Data is not an array
          </div>
        );
      }

    // return (
    //     <select
    //         className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className}
    //          ref={ ref } 
    //          { ...rest }
    //     >
    //         { data.map( item => (
    //             <option key={ item.id } value={ item.name }> 
    //                 { item.name } 
    //             </option>
    //         ))}
    //     </select>
    // );



});


export default SelectDropdown;