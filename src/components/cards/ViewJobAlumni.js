import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getJobError } from '../../app/companyUserSlice';
import placeholder from "../../assets/placeholder.png";
import { formatDate } from '../constant/helper';
import { GetJob } from '../../services/alumni';


export default function ViewJobAlumni() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        const fetchJobPosting = async () => {
            try {
                if (id) {
                    const jobData = await GetJob(dispatch, id);
                    if (jobData) {
                        setJobData(jobData);
                    }
                }
            } catch (error) {
                dispatch(getJobError());
                console.error('Error:', error);
            }
        };

        fetchJobPosting();
    }, [id, dispatch]);

    console.log(jobData);

    if (!jobData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col justify-center sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[80%]">
                    <div className="mx-4 sm:mx-0">
                        <div className="bg-white border border-slate-200 p-4 mb-2 rounded-lg flex">
                            <div className="flex-shrink-0 sm:w-1/9 md:w-1/7 lg:w-1/8">
                                {jobData.company && (
                                    <img
                                        src={jobData.company.profileImage ? `data:image/jpeg;base64,${jobData.company.profileImage}` : placeholder}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full border border-slate-300"
                                    />
                                )}
                            </div>
                            <div className="sm:w-8/9 md:w-6/7 lg:w-7/8 ml-4">
                                <h1 className="font-bold">{jobData.position}</h1>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500 ">
                                    Posted By: <span className="font-bold">{jobData.company.firstName} {jobData.company.lastName}</span> on {formatDate(jobData.posted_Date)}
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Company Name: <span className="font-bold">{jobData.company.companyName} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Company Address: <span className="font-bold">{jobData.company.companyAddress} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Company Number: <span className="font-bold">{jobData.company.mobileNumber} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Company Email: <span className="font-bold">{jobData.company.email} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500 mb-2">
                                    Job Description: <span className="font-bold"><div className="text-[12px] text-justify mr-8" dangerouslySetInnerHTML={{ __html: jobData.description }} />
                                    </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Job Location: <span className="font-bold">{jobData.location} </span>
                                </p>

                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Application End: <span className="font-bold"> {formatDate(jobData.expiration_Date)} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Slots: <span className="font-bold">{jobData.slots} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Years of Experience: <span className="font-bold">{jobData.yearsOfExp} </span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Status: <span className="font-bold">{jobData.isVerified ? 'true' : 'false'}</span>
                                </p>
                                <p className="flex items-center gap-2 text-[12px] text-slate-500">
                                    Skills Required: <span className="font-bold">
                                        {jobData?.targetSkills?.map((skill) => skill.skill).join(', ')}
                                    </span>
                                </p>
                                {!jobData.status && (
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
                                                Edit Post
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
                                                onClick={() => navigate(-1)}
                                            >
                                                Delete Job Post
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {jobData.status && !jobData.company.isVerified && (
                                    <div className="flex items-center px-6 mt-20">
                                        <div className='flex gap-10 flex-1 justify-end'>
                                            <Button
                                                type="button"
                                                variant="contained"
                                                style={{
                                                    display: "block",
                                                    padding: "10px",
                                                    backgroundColor: "#666666",
                                                    color: "#FFFFFF",
                                                }}
                                                onClick={() => navigate(-1)}
                                            >
                                                Close Job Post
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {jobData.company && jobData.company.isVerified && jobData.status && (
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
                                                onClick={() => navigate('/company/view_candidates')}
                                            >
                                                View Candidates
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
                                                onClick={() => navigate(-1)}
                                            >
                                                Close Application
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
