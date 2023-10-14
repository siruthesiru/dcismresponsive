import { Button } from '@mui/material';
import React, { useState } from 'react'
import RichTextEditor from '../forms/RichTextEditor';

const CreateJobPost = () => {
    const [formData, setFormData] = useState({
        position: '',
        location: '',
        yearsExperience: '',
        salary: '',
        slots: '',
        address: '',
        scheduledInterviewDate: '',
        scheduledInterviewTime: '',
        endDate: '',
        content: '',
    });

    const combineDateAndTime = () => {
        if (formData.scheduledInterviewDate && formData.scheduledInterviewTime) {
            const date = new Date(formData.scheduledInterviewDate);
            const time = new Date(`1970-01-01T${formData.scheduledInterviewTime}`);
            // Combine the date and time
            const scheduledInterview = new Date(date.getTime() + time.getTime());

            // Now 'scheduledInterview' is a valid datetime
            setFormData({ ...formData, scheduledInterview });
        }
    };

    const handleSubmit = () => {
        combineDateAndTime();
        // Now 'formData.scheduledInterview' contains the datetime value
        // You can send this data to the backend
    };

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <h1 className="font-bold text-[15px] uppercase ">CREATE NEW LISTING</h1>
            <p className="text-slate-500 text-[12px]">Post a new job offer for the Alumni of the University of San Carlos</p>
            <form onSubmit={handleSubmit}>
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
                                value={formData.yearsExperience}
                                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
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
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })
                                }
                                className="w-[100px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                            />
                        </div>

                        <div className="flex items-center my-4">
                            <label className="text-[12px] w-[100px]">Description: </label>
                            <div style={{ flex: 1 }}>
                                <RichTextEditor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} />
                            </div>
                        </div>

                        <div className="flex items-center px-6 mt-20">
                            <div className='flex gap-10 flex-1 justify-end'>
                                <Button
                                    type="button"
                                    variant="contained"
                                    style={{
                                        display: "block",
                                        padding: "10px",
                                        backgroundColor: "#221769",
                                        color: "#FFFFFF",
                                    }}
                                >
                                    Submit Application
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
                                >
                                    Discard Application
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateJobPost