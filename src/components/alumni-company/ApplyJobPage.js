import { Button } from '@mui/material';
import React, { useState } from 'react'

const ApplyJobPage = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        contactNumber: '',
        address: '',
        scheduledInterviewDate: '',
        scheduledInterviewTime: '',
        file: '',
        message: '',
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
            <h1 className="font-bold text-[15px] uppercase ">JOB APPLICATION FORM</h1>
            <p className="text-slate-500 text-[12px]">Please fill out the form below to submit your job application.</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">First Name: </label>
                            <input
                                type="text"
                                placeholder='Input your First Name'
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Last Name: </label>
                            <input
                                type="text"
                                placeholder='Input your Last Name'
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Middle Name: </label>
                            <input
                                type="text"
                                placeholder='Input your Middle Name'
                                value={formData.middleName}
                                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Email Address: </label>
                            <input
                                type="text"
                                placeholder='Input your Email Address'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Contact Number: </label>
                            <input
                                type="text"
                                placeholder='Input your contact Number'
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Applied Position: </label>
                            <input
                                type="text"
                                placeholder='Input your honors'
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Preferred Schedule Interview: </label>
                            <input
                                type="date"
                                value={formData.scheduledInterviewDate}
                                onChange={(e) => setFormData({ ...formData, scheduledInterviewDate: e.target.value })
                                }
                                className="w-[100px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                            />
                            <input
                                type="time"
                                value={formData.scheduledInterviewTime}
                                onChange={(e) => setFormData({ ...formData, scheduledInterviewDate: e.target.value })
                                } className="w-[100px] h-[30px] bg-white border border-slate-200 p-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Attached File: </label>
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                            />
                        </div>
                        <div className="flex items-center my-4">
                            <label className="text-[12px] w-[100px]">Message to the Company: </label>
                            <textarea
                                rows="4"
                                placeholder='Input your message'
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-[100%] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center px-6 mt-6">
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

export default ApplyJobPage