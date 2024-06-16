import React from "react";
import { useEffect, useState } from 'react';
import Offcanvas from "./OffCanvas";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import { Head, Link, useForm } from '@inertiajs/react';
import SpaciousDiv from "./SpaciousDiv";
import Loading from "./Loading";


export default function OffCanvasEditSchedule({schedule})
{

    const {data, setData, post, errors} = useForm({
        id: '',
        interview_time: '',
        interview_date: '',
        location: '',
    })


    const [isLoading, setIsLoading] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [serverResp, setserverResp] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        if(schedule) {
            setData({
                id: schedule.id,
                interview_date: schedule.interview_date,
                interview_time: schedule.interview_time,
                location: schedule.location
            })
            setIsLoading(false)
        }
    }, [schedule])


    const submit = async (e) => {
        e.preventDefault();
        setIsRescheduling(true)
        try{
            const response = await axios.patch('/updateSchedule', data);
            setIsRescheduling(false)
            console.log(response)
            setserverResp(response.data)
        }catch(error)
        {
            console.log(error)
            setIsRescheduling(false)
        }
    }



    return(
        <Offcanvas
        id="editSchedule"
        title=
        {
            <SpaciousDiv>
                Edit Schedule
            </SpaciousDiv>
        }
        content=
        {isLoading ? (
            <>
            <Loading/>
            </>
            ) : ( 
                schedule ? (
                    <form onSubmit={submit}>
                                <SpaciousDiv>
                                    <TextInput
                                    type="time"
                                    name="interview_time"
                                    className="mt-1 block w-full"
                                    value={data.interview_time}
                                    onChange={(e) => setData('interview_time', e.target.value)}
                                    />
                                </SpaciousDiv>
                                <SpaciousDiv>
                                    <TextInput
                                    type="date"
                                    name="interview_date"
                                    className="mt-1 block w-full"
                                    value={data.interview_date}
                                    onChange={(e) => setData('interview_date', e.target.value)}
                                    />
                                </SpaciousDiv>
                                <SpaciousDiv>
                                    <TextInput
                                    name="location"
                                    className="mt-1 block w-full"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    />
                                </SpaciousDiv>
                                <SpaciousDiv>
                                    <PrimaryButton
                                    disabled={isRescheduling}
                                    >
                                        {isRescheduling ? (
                                            'Rescheduling..'
                                        ) : (
                                            'Reschedule'
                                        )}
                                    </PrimaryButton>
                                </SpaciousDiv>
                    </form>
                    ) :  (  
                        <>
                        <p>Error Fetching Schedule</p>
                        </>
    )
             )}
        />
    )
}