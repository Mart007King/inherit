

import React, { useState, forwardRef, useEffect, useContext} from "react";
import axios from "axios";

const Select = forwardRef(( props, ref ) =>
{
    const { key='', children= '', value='',  className = '', isFocused = false, ...rest } = props;  
    const [categories, setCategories] = useState([]);
   

    useEffect( ()=>{

        if (isFocused) {
            input.current.focus();
        }
    } );

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/categories');
            const data = response.data.map(item=>({ value:item.category_id, label:item.category_name }));
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    

        return (
            <select
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className}
                ref={ ref } 
                { ...rest } 
                         
            >
              <option value="">  Select a Category  </option>  

                {categories.map( item => (

                    <option key={item.value} value={item.value}> 
                        {item.label}  
                    </option>

                ) ) }

            </select>
        );


});

export default Select;