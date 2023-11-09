import { Button } from '@mui/material';
import React, { useState } from 'react'
import RichTextEditor from '../forms/RichTextEditor';
import { useDispatch } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { PostJob } from '../../services/company';

const CreateJobPost = () => {
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
        targetSkills: [
            {
                skill: '',
            },
        ]
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
        setFormData({
            ...formData,
            targetSkills: [
                ...formData.targetSkills,
                {
                    skill: '',
                },
            ],
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // if (id) {
        //     const currentDate = new Date();
        //     const editedFormData = {
        //         ...formData,
        //         updatedTime: currentDate.toISOString(),
        //     };

        //     const editSuccess = await EditAnnouncement(dispatch, editedFormData, id);
        //     if (editSuccess) {
        //         toast.success("Announcement edited successfully");
        //         await new Promise(resolve => setTimeout(resolve, 3000));
        //         navigate('/announcements');
        //     }
        // } else {
        const addSuccess = await PostJob(dispatch, formData);
        if (addSuccess) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/company/jobs');
        }
    };

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <ToastContainer position="top-right" autoClose={3000} />

            <h1 className="font-bold text-[15px] uppercase ">CREATE NEW LISTING</h1>
            <p className="text-slate-500 text-[12px]">Post a new job offer for the Alumni of the University of San Carlos</p>
            <form onSubmit={handleFormSubmit}>

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
                            />
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Required Resume: </label>
                            <select
                                value={formData.requiredResume}
                                onChange={(e) => setFormData({ ...formData, requiredResume: e.target.value })}
                                className="w-[100px] h-[30px] bg-white border border-slate-200  rounded-md"
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
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
                            <div className='flex gap-10 flex-1 justify-end'>
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
                                    Submit Post
                                </Button>
                                {/* <Button
                                    type="button"
                                    variant="contained"
                                    style={{
                                        display: "block",
                                        padding: "10px",
                                        backgroundColor: "#666666",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Discard Application
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateJobPost