import { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from '@/Components/Select';
import Modal from '@/Components/Modal'; // Assuming you have a Modal component
import axios from 'axios';

const decodeHtmlEntities = (str) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
};

export default function Skills({ className = '', userSkillsInitial = [] }) {
    const [userSkills, setUserSkills] = useState(null);
    const [userCategory, setUserCategory] = useState(null);
    const [allSkills, setAllSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState(userSkillsInitial.map(skill => skill.skill_id));

    const { data, setData, post, patch, reset, processing, recentlySuccessful } = useForm({
        category: '',
        skills: selectedSkills,
    });

    const fetchUserSkills = async () => {
        let response = await axios.get('/user/skills');
        setUserCategory(response.data[0].category_name);
        const data = response.data.map(item=>({ value:item.category_name, label:item.skill_name }));
        setUserSkills(data);
        
    }

    useEffect(() => {
        fetchUserSkills()
    }, []);

    const handleFetch = async (e) => {
        let url = `/skills/${e.target.value}`;

        try {
            const response = await fetch(url);
            let skillsData = await response.json();
            skillsData = skillsData.map(skill => ({
                ...skill,
                skill_name: decodeHtmlEntities(skill.skill_name),
            }));
            setAllSkills(skillsData);
            setData('category', e.target.value);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setData('skills', selectedSkills);
    }, [selectedSkills]);

    const toggleSkillSelection = (skill_id) => {
        setSelectedSkills(prevSelected => {
            if (prevSelected.includes(skill_id)) {
                return prevSelected.filter(id => id !== skill_id);
            } else {
                return [...prevSelected, skill_id];
            }
        });
    };

    const saveInitialSkills = (e) => {
        e.preventDefault();

        post(route('profile.skills.store'), {
            skills: selectedSkills,
            onSuccess: () => {
                fetchUserSkills();
                // setUserSkills(allSkills.filter(skill => selectedSkills.includes(skill.skill_id)));
            },
        });
    };

    const updateSkills = (e) => {
        e.preventDefault();

        patch(route('profile.skills.update'), {
            skills: selectedSkills,
            onSuccess: () => {
                setUserSkills(allSkills.filter(skill => selectedSkills.includes(skill.skill_id)));
                setShowModal(false);
            },
        });
    };

    return (
        <section className={className}>
            <header className='card card-header'>
                <h2 className="text-lg font-medium text-gray-900">
                    Skills/Expertise <span className="text-warning">(Earn 2 Stars)</span>
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Tell clients you have the skills/expertise they are looking for
                </p>
            </header>

            <div className='mt-2'>
                

                {userSkills ? (
                    <>
                        <div className="mt-3">

                            <h1 style={{ fontSize: '2em', color: 'purple' }}>Your Category/Skills</h1>
                            <p className='m-5'>Your category is: <span className='alert alert-info'> {userCategory} </span> </p>

                            <div className="mt-2">
                                {userSkills.map(item => (
                                    <span
                                        key={item.value}
                                        className="inline-block px-3 py-1 rounded-full bg-green-500 text-white mr-2 mb-2"
                                    >
                                        {item.label}
                                    </span>
                                ))}
                            </div>

                            <PrimaryButton onClick={() => setShowModal(true)}>Edit Skill Set</PrimaryButton>
                        </div>
                    </>
                ) : (
                    <div className="mt-3">
                        <h1 style={{ fontSize: '2em', color: 'purple' }}>Choose a Category</h1>
                        <p>A category represents the industry of your skills/expertise</p>

                        <Select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) => handleFetch(e)}
                        />
                        <h1 style={{ fontSize: '2em', color: 'purple' }}>Select your Skill</h1>
                        <p>This helps link your profile with a recruiter and makes your profile rich. You can select as many skills as possible that complement your work.</p>

                        <div className="mt-2">
                            {allSkills.map(skill => (
                                <span
                                    key={skill.skill_id}
                                    onClick={() => toggleSkillSelection(skill.skill_id)}
                                    className={`inline-block px-3 py-1 rounded-full cursor-pointer mr-2 mb-2 ${selectedSkills.includes(skill.skill_id) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    {skill.skill_name}
                                </span>
                            ))}
                        </div>

                        <form onSubmit={saveInitialSkills} className="mt-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                )}

                <div className="mt-3">
                    

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <div className="p-4">
                            

                            
                                <div className="mt-3">
                                    <h1 style={{ fontSize: '2em', color: 'purple' }}>Select your Skill</h1>
                                    <p>This helps link your profile with a recruiter and makes your profile rich. You can select as many skills as possible that complement your work.</p>

                                    <div className="mt-2">
                                        {allSkills.map(skill => (
                                            <span
                                                key={skill.skill_id}
                                                onClick={() => toggleSkillSelection(skill.skill_id)}
                                                className={`inline-block px-3 py-1 rounded-full cursor-pointer mr-2 mb-2 ${selectedSkills.includes(skill.skill_id) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                            >
                                                {skill.skill_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                          

                            <form onSubmit={updateSkills} className="mt-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        </section>
    );
}
