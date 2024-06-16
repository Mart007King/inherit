import React from "react";
import { useEffect, useState } from 'react';
import Offcanvas from "./OffCanvas";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import SpaciousDiv from "./SpaciousDiv";
import ConfirmPassword from "@/Pages/Auth/ConfirmPassword";
import Loading from "./Loading";


export default function OffCanvasApplicantApplication({loading, application, error })
{
    const {data, setData, post, errors} = useForm({
        id: '',
        schedule_name: '',
        application_id: '',
        applicant_id: '',
        status : '',
        interview_date: '',
        interview_time: '',
        location: '',
        company_id: '',
    })

    useEffect(() => {
        if (application) {
            setData({
                ...data,
                id: application.id,
                application_id: application.id,
                applicant_id: application.applicant_id,
            });
        }
    }, [application]);


    const [isLoading, setIsLoading] = useState(false);

    

    const submit = async (e) => {
        if(data.status == 'Scheduled')
        {
            e.preventDefault();
            if(data.location && data.interview_date && data.interview_time)
            {
                setIsLoading(true)
                try {
                    const response =  await axios.post(`/createSchedules`, data)
                    const respond =  await axios.post(`/respondToApplicaton`, data)
                    console.log(response)
                    setIsLoading(false)
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            }
        }
        
        if(data.status !== 'Scheduled')
        {
            e.preventDefault();
            setIsLoading(true)
            try {
                const response =  await axios.post(`/respondToApplicaton`, data)
                console.log(response)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
    }



    return(
        <Offcanvas
        id="applicantApplication"
        title=
        {
            <SpaciousDiv>
                <p className="h4">This Application</p>
            </SpaciousDiv>
        }
        content=
        {isLoading ? (
                <p>
                    <Loading/>
                </p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                {application ? (
                    <>
                        <SpaciousDiv
                        className='border border-2 p-2 border-danger'
                        >
                            <li>{application.cover_letter}</li>
                            <li>{application.resume_link}</li>
                            <li>{application.status}</li>
                            <hr/>
                            <form
                            onSubmit={submit}
                            >
                            <input
                            type="hidden"
                            name="application_id"
                            value={application.id}
                            />
                            <input
                            type="hidden"
                            name="id"
                            value={application.id}
                            />
                            <input
                            type="hidden"
                            name="applicant_id"
                            value={application.applicant_id}
                            />
                            <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value=''>Select a Response</option>
                                <option value='shortlisted'>ShortList</option>
                                <option value='Scheduled'>Interview</option>
                                <option value='Rejected'>Reject</option>
                            </select>
                            {data.status == 'Scheduled' ? (
                                <>
                                <SpaciousDiv>
                                    <TextInput
                                    name="schedule_name"
                                    className="mt-1 block w-full"
                                    value={data.schedule_name}
                                    onChange={(e) => setData('schedule_name', e.target.value)}
                                    />
                                </SpaciousDiv>
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
                                </>
                            ) : (
                                <></>
                            )}
                            <SpaciousDiv>
                            <PrimaryButton
                            disabled={isLoading}
                            >
                            {isLoading ? (
                                <span>Responding...</span>
                            ) : (
                                'Respond'
                            )}
                                
                            </PrimaryButton>
                            </SpaciousDiv>
                            </form>
                        </SpaciousDiv>
                    </>
                ) : (
                    <p>Application Not found</p>
                )}
                </>
            )}
        />
    )


}