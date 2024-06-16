import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Offcanvas from "./OffCanvas";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import SpaciousDiv from "./SpaciousDiv";
import Loading from "./Loading";
import axios from 'axios';
import SecondaryButton from "./SecondaryButton";
import { FaArrowUp, FaSearch } from "react-icons/fa";


export default function RecruiterBot()
{
    const {data, setData, errors} = useForm({
        bot_name: '',
        application_ranking: [],
    })

    const [bot, setBot] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleFilterChange = (filterId) => {
        setSelectedFilters(prevFilter => {
            if(prevFilter.includes(filterId)){
                return prevFilter.filter(id => id != filterId);
            }else
            {
                return [...prevFilter, filterId];
            }
        })
    }


    const getBot = async (e) => {
        try
        {
            const response = await axios.get('/myBot');
            if(response)
            {
                setBot(response.data)
            }else
            {
                console.log("Bot not Found")
            }
        }catch(error)
        {
            console.log(error)
        }
    }


    const UpgradeBtn = () => {
        return(
            <SecondaryButton>
               Free (Upgrade)<FaArrowUp/>
            </SecondaryButton>
        )
    }
    
    useEffect(() => {
        getBot()
    })
    


    return(
        <Offcanvas
        id="recruiterBot"
        title={<><p className="h5">Bot Overview  <i>i</i> </p></>}
        content=
        {
            bot ? (
                <>
               <SpaciousDiv
               className="maincol text-center"
               >
                <h2 className="h2">{bot.bot_name}</h2>
                <ul>
                    <li>Plan : 
                        {
                        bot.subscription_type 
                        }</li>
                    <li>Type : {bot.type}</li>
                    <li>ID : {bot.unique_token}</li>
                    <li>Status : {bot.status}</li>
                    <li>Usage Count : {bot.usage_count ==  null ? ( 0 ) : ( bot.usage_count )}</li>
                </ul>
               </SpaciousDiv>

                <hr className="mt-5"/>
                    <p className="text-center">Bot Settings</p>
                <hr className="mt-1"/>

{/* 
               <SpaciousDiv>
                    <form onSubmit={UpdateBot}>
                        <SpaciousDiv>
                            <InputLabel htmlFor="bot_name" value="Bot Name" />
        
                            <TextInput
                                id="bot_name"
                                name="bot_name"
                                value={data.bot_name}
                                className="mt-1 block w-full"
                                autoComplete="bot_name"
                                onChange={(e) => setData('bot_name', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.bot_name} className="mt-2" />
                        </SpaciousDiv>

                        <SpaciousDiv>
                            <InputLabel htmlFor="application_ranking" value="Application Filtering" />
                                    <input
                                        type="checkbox"
                                        className="mb-1 me-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        id="location"
                                        checked={selectedFilters.includes('location')}
                                        value={'location'}
                                        onChange={() => handleFilterChange('location')}
                                    />
                                    <label htmlFor="location">Location</label>
                                    <br/>
                                    <input
                                        type="checkbox"
                                        className="mb-1 me-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        id="skills"
                                        checked={selectedFilters.includes('skills')}
                                        value={'skills'}
                                        onChange={() => handleFilterChange('skills')}
                                    />
                                    <label htmlFor="skills">Skills</label>
                            <InputError message={errors.application_ranking} className="mt-2" />
                        </SpaciousDiv>
                    </form>
               </SpaciousDiv> */}
               </>
            ) : (
                <p>Bad</p>
            )
        }
        />
    )

}