import { Button } from '@mui/material';
import React from 'react'

import { useNavigate } from "react-router-dom";

export default function ViewJob({ data }) {

    const navigate = useNavigate();


    return (
        <div className="flex flex-col text-[12px] space-y-2">
            <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                <h1 className='font-bold text-xl p-6'>{data.title}</h1>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Job Title: </label>
                    <span className='font-bold text-base'>{data.position}</span>
                </div>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Company: </label>
                    <span className='font-bold text-base'>{data.companyName}</span>
                </div>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Location: </label>
                    <span className='font-bold text-base'>{data.companyAddress}</span>
                </div>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Offer: </label>
                    <span className='font-bold text-base'>{data.offer}</span>
                </div>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Slot: </label>
                    <span className='font-bold text-base'>{data.slots}</span>
                </div>
                <div className="flex items-center px-6">
                    <label className="w-[100px] text-base font-regular">Year of Experience: </label>
                    <span className='font-bold text-base'>{data.yearsExperience}</span>
                </div>

                <div className="flex items-center px-6 mt-6">
                    <label className="text-base font-regular">{data.details}</label>
                </div>

                <div className="flex items-center px-6 mt-6">
                    <div className='flex gap-10 flex-1 justify-end'>
                        <Button
                            type="button"
                            variant="contained"
                            style={{
                                display: "block",
                                width: "10%",
                                padding: "10px",
                                backgroundColor: "#221769",
                                color: "#FFFFFF",
                            }}
                            onClick={() => navigate("/alumni/apply-job")}
                        >
                            Apply Job
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            style={{
                                display: "block",
                                width: "10%",
                                padding: "10px",
                                backgroundColor: "#666666",
                                color: "#FFFFFF",
                            }}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
}
