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



export default function OffcanvasEditJob({ job })
{

    const {data, setData, post, errors, reset} = useForm({
        title : '' ,
        description : '', 
        requirements : '',
        location : '',
        salary_range : '',
        job_type : '',
        application_deadline : '',
        employment_status : '',
        years_of_experience : '',
        skills : ''
    })

    const [isLoading, setIsLoading] = useState(false);
    const [serverResp, setserverResp] = useState(null);
    
    useEffect(() => {
        setIsLoading(true)
        if (job) {
            // Update form data with the job's current values
            setData({
                id: job.id,
                title: job.title,
                description: job.description,
                requirements: job.requirements,
                location: job.location,
                salary_range: job.salary_range,
                job_type: job.job_type,
                application_deadline: job.application_deadline,
                employment_status: job.employment_status,
                years_of_experience: job.years_of_experience,
                skills: job.skills,
            });
            setIsLoading(false)
        }
    }, [job]); 
    

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try{
            const response = await axios.patch('/updateJob', data);
            setIsLoading(false)
            setserverResp(response.data)
            console.log(response)
        }catch(error)
        {
         console.log(error)   
         setIsLoading(false)
        }
    };

  

    return(
        <Offcanvas
            className="bg-secondary"
            id='EditJob'
            title=
            {
                <SpaciousDiv>
                <p className="h4">Edit Job</p>
                </SpaciousDiv>
            }
            content=
            {isLoading ? (
                <>
                <Loading/>
                </>
                ) : ( 
                    job ? (
                        <form onSubmit={submit}>
                            <SpaciousDiv>
                            <InputLabel htmlFor="title" value="Job title" />
        
                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.title} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="description" value="Job Description" />
        
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                autoComplete="description"
                                isFocused={true}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.description} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="location" value="Job Location" />
        
                            <TextInput
                                id="location"
                                name="location"
                                value={data.location}
                                className="mt-1 block w-full"
                                autoComplete="location"
                                isFocused={true}
                                onChange={(e) => setData('location', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.location} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="requirements" value="Job Requirements" />
        
                            <TextInput
                                id="requirements"
                                name="requirements"
                                value={data.requirements}
                                className="mt-1 block w-full"
                                autoComplete="requirements"
                                isFocused={true}
                                onChange={(e) => setData('requirements', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.requirements} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="salary_range" value="Salary range" />
        
                            <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="salaray_range"
                            value={data.salary_range}
                            onChange={(e) => setData('salary_range', e.target.value)}
                            >
                                <option value="">Select Salary range</option>
                                <option value="0-10000">0-10000</option>
                                <option value="10000-50000">10000-50000</option>
                                <option value="50000-100000">50000-100000</option>
                                <option value="100000-above">100000-above</option>
                            </select>
        
                            <InputError message={errors.salary_range} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="job_type" value="Job Type" />
        
                            <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="job_type"
                            value={data.job_type}
                            onChange={(e) => setData('job_type', e.target.value)}
                            >
                                <option value="">Select Job Type</option>
                                <option value="remote">Remote</option>
                                <option value="onsite">Onsite</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
        
                            <InputError message={errors.job_type} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="application_deadline" value="Application deadline" />
        
                            <TextInput
                                id="application_deadline"
                                name="application_deadline"
                                type="date"
                                value={data.application_deadline}
                                className="mt-1 block w-full"
                                autoComplete="application_deadline"
                                isFocused={true}
                                onChange={(e) => setData('application_deadline', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.application_deadline} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="employment_status" value="Employment Status" />
        
                            <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="employment_status"
                            value={data.employment_status}
                            onChange={(e) => setData('employment_status', e.target.value)}
                            >
                                <option value=''>Select Employment status</option>
                                <option value='contract'>Part-time</option>
                                <option value='contract'>Full-time</option>
                                <option value='contract'>Contract</option>
                            </select>
        
                            <InputError message={errors.employment_status} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="years_of_experience" value="Years of Experience" />
        
                            <TextInput
                                id="years_of_experience"
                                name="years_of_experience"
                                value={data.years_of_experience}
                                className="mt-1 block w-full"
                                autoComplete="years_of_experience"
                                isFocused={true}
                                onChange={(e) => setData('years_of_experience', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.years_of_experience} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                            <InputLabel htmlFor="skills" value="Needed Skills" />
        
                            <TextInput
                                id="skills"
                                name="skills"
                                value={data.skills}
                                className="mt-1 block w-full"
                                autoComplete="skills"
                                isFocused={true}
                                onChange={(e) => setData('skills', e.target.value)}
                                required
                            />
        
                            <InputError message={errors.skills} className="mt-2" />
                            </SpaciousDiv>
        
                            <SpaciousDiv>
                                <PrimaryButton className="mt-3" disabled={isLoading}>
                                    {isLoading ? (
                                        'Updating...'
                                    ) : (
                                        'Update'
                                    )}
                                </PrimaryButton>
                            </SpaciousDiv>
                        </form>
                        ) :  (  
                            <>
                            <p>Hello</p>
                            </>
        )
                 )}
        />
    )

}