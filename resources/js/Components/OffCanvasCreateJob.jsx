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

export default function OffcanvasCreateJob() {
    const { data, setData, post, errors, reset } = useForm({
        title: '',
        description: '', 
        requirements: '',
        location: '',
        salary_range: '',
        job_type: '',
        application_deadline: '',
        employment_status: '',
        years_of_experience: '',
        category: '',
        skills: []
    });

    const [isLoading, setIsLoading] = useState(false);
    const [serverResp, setServerResp] = useState(null);
    const [categories, setCategories] = useState(null);
    const [skills, setSkills] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const getCategory = async () => {
        try {
            const response = await axios.get('/getCategories');
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSkills = async (categoryId) => {
        try {
            const response = await axios.get('/getSkills', { params: { categoryId } }); // Send categoryId as a query parameter
            if (response.data) {
                console.log(response)
                setSkills(response.data);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setData('category', selectedCategory);
        getSkills(selectedCategory);
    };

    const handleSkillChange = (skillId) => {
        setSelectedSkills(prevSkills => {
            if (prevSkills.includes(skillId)) {
                return prevSkills.filter(id => id !== skillId);
            } else {
                return [...prevSkills, skillId];
            }
        });
    };


    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Include selectedSkills in data before sending
            const formData = {
                ...data,
                skills: selectedSkills // Update skills array with selectedSkills
            };
            console.log('Submitting data:', formData);
            const response = await axios.post('/createJob', formData);
            setIsLoading(false);
            setServerResp(response.data.message);
            console.log('Server response:', response.data);
        } catch (error) {
            console.log('Error during job creation:', error);
            setIsLoading(false);
        }
    };

    return (
        <Offcanvas
            id='Id1'
            title={
                <SpaciousDiv>
                    <p className="h4">Create A Job</p>
                </SpaciousDiv>
            }
            content={
                <form onSubmit={submit} className="border-3 rounded p-3 border-danger">
                    <p>Complete the form to create a Job</p>
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
                name="nature"
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
                name="nature"
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
                        <InputLabel htmlFor="category" value="Category" />
                        <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="category"
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value=''>Select Category</option>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                ))
                            ) : (
                                <p>No Category Found</p>
                            )}
                        </select>
                        <InputError message={errors.category} className="mt-2" />
                    </SpaciousDiv>

                    <SpaciousDiv>
                        <InputLabel htmlFor="skills" value="Skills" />
                        {Array.isArray(skills) && skills.length > 0 ? (
                            skills.map(skill => (
                                <div key={skill.skill_id}>
                                    <input
                                        type="checkbox"
                                        className="mb-1 me-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        id={`skill-${skill.skill_id}`}
                                        checked={selectedSkills.includes(skill.skill_id)}
                                        value={skill.skill_id}
                                        onChange={() => handleSkillChange(skill.skill_id)}
                                    />
                                    <label htmlFor={`skill-${skill.skill_id}`}>{skill.skill_name}</label>
                                </div>
                            ))
                        ) : (
                            <p>No Skills Found</p>
                        )}
                        <InputError message={errors.skills} className="mt-2" />
                    </SpaciousDiv>
                    <SpaciousDiv>
                        <PrimaryButton className="mt-3" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create'}
                        </PrimaryButton>
                    </SpaciousDiv>
                </form>
            }
        />
    );
}
