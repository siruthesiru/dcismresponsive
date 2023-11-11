import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RichTextEditor from './RichTextEditor';
import { useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, useParams } from 'react-router-dom';
import { GetAllJobs, GetJob, UpateJobPost } from '../../services/company';

const EditJobPostForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        position: '',
        description: '',
        location: '',
        salary: '',
        yearsOfExp: '',
        slots: '',
        requiredResume: 'true',
        status: false,
        expiration_Date: '',
        targetSkills: [{ skill: '' }],
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [postDataLoaded, setPostDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const jobData = await GetJob(dispatch, id);
                    if (jobData) {
                        setFormData({
                            id: jobData.id,
                            position: jobData.position,
                            location: jobData.location,
                            yearsOfExp: jobData.yearsOfExp,
                            slots: jobData.slots,
                            salary: jobData.salary,
                            expiration_Date: jobData.expiration_Date,
                            requiredResume: jobData.requiredResume,
                            description: jobData.description,
                            targetSkills: jobData.targetSkills.map((skill) => ({
                                ...skill,
                            })),

                        });
                        setPostDataLoaded(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching job data:', error);
                toast.error('An error occurred while fetching job data');
            }
        };

        if (id) {
            fetchData();
        } else {
            setPostDataLoaded(true);
        }
    }, [id, dispatch]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                console.log(formData);
                const updateSuccess = await UpateJobPost(dispatch, {
                    ...formData,
                    requireResume: formData.requiredResume,
                });
                if (updateSuccess) {
                    await GetAllJobs(dispatch);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    navigate('/company/jobs');
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSkillChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...formData.targetSkills];
        updatedSkills[index].skill = value;
        setFormData({ ...formData, targetSkills: updatedSkills });
    };

    const removeSkill = (index) => {
        const updatedSkills = [...formData.targetSkills];
        updatedSkills.splice(index, 1);
        setFormData({ ...formData, targetSkills: updatedSkills });
    };

    const addSkill = () => {
        const firstSkill = formData.targetSkills[0];
        const newSkill = { skill: firstSkill.skill || 'New Skill' };

        setFormData({
            ...formData,
            targetSkills: [
                ...formData.targetSkills,
                newSkill,
            ],
        });
    };



    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="font-bold text-[15px] uppercase ">EDIT LISTING</h1>
            <p className="text-slate-500 text-[12px]">Edit the job offer for the Alumni of the University of San Carlos</p>

            <form onSubmit={handleFormSubmit}>
                {postDataLoaded ? (
                    <div className="flex flex-col text-[12px] space-y-2">
                        <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                            <div className="flex items-center">
                                <label className="text-[12px] w-[100px]">Position: </label>
                                <input
                                    type="text"
                                    placeholder='Ex. Human Resource Representative'
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="text-[12px] w-[100px]">Location: </label>
                                <input
                                    type="text"
                                    placeholder='Ex. USC Talamban'
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="text-[12px] w-[100px]">Years of Experience: </label>
                                <input
                                    type="number"
                                    placeholder='2 years'
                                    value={formData.yearsOfExp}
                                    onChange={(e) => setFormData({ ...formData, yearsOfExp: e.target.value })}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="text-[12px] w-[100px]">Slots: </label>
                                <input
                                    type="number"
                                    placeholder='5 slots'
                                    value={formData.slots}
                                    onChange={(e) => setFormData({ ...formData, slots: e.target.value })}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="text-[12px] w-[100px]">Salary: </label>
                                <input
                                    type="text"
                                    placeholder='Php 16,000.00-Php 20,000.00'
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center my-2">
                                <label className="text-[12px] w-[90px]">End of Posting: </label>
                                <input
                                    type="datetime-local"
                                    value={formData.expiration_Date}
                                    onChange={(e) => setFormData({ ...formData, expiration_Date: e.target.value })
                                    }
                                    className="w-[200px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex items-center my-2">
                                <label className="text-[12px] w-[90px]">Required Resume: </label>
                                <select
                                    value={formData.requiredResume}
                                    onChange={(e) => setFormData({ ...formData, requiredResume: e.target.value === 'true' })}
                                    className="w-[100px] h-[30px] bg-white border border-slate-200 rounded-md"
                                >
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <label className="text-[12px] w-[90px]">Target Skills: </label>
                                <div className="flex flex-col my-2">
                                    {formData.targetSkills.map((skillObj, index) => (
                                        <div key={index} className="flex items-center my-2">
                                            <input
                                                type="text"
                                                placeholder="Enter a skill"
                                                value={skillObj.skill}
                                                onChange={(e) => handleSkillChange(e, index)}
                                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                                required
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(index)}
                                                    className="text-red-600 ml-2"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="text-blue-600 mt-2"
                                    >
                                        Add Skill
                                    </button>
                                </div>
                            </div>


                            <div className="flex items-center my-4">
                                <label className="text-[12px] w-[100px]">Description: </label>
                                <div style={{ flex: 1 }}>
                                    <RichTextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
                                </div>
                            </div>

                            <div className="flex items-center px-6 mt-20">
                                <div className="flex gap-10 flex-1 justify-end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{
                                            display: "block",
                                            padding: "10px",
                                            backgroundColor: "#221769",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        Update Post
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        style={{
                                            display: "block",
                                            padding: "10px",
                                            backgroundColor: "#666666",
                                            color: "#FFFFFF",
                                        }}
                                        onClick={() => navigate('/company/jobs')}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading post data...</p>
                )}
            </form>
        </div>
    )
}

export default EditJobPostForm