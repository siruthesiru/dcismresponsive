import React, { useEffect, useState } from 'react';
import Search from '../../../components/search';
import AlumniUser from '../../../components/userCard/alumniCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllJobs, GetAlumniProfile } from '../../../services/alumni';
import JobContent from '../../../components/cards/JobContent';

const JobList = () => {
    const jobs = useSelector((state) => state.alumniUserSlice.jobList);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await GetAlumniProfile(dispatch);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        GetAllJobs(dispatch);
    }, [dispatch]);

    console.log(jobs);

    //for testing only status true and s
    const activeJobs = Object.values(jobs).filter((job) => job.status && job.isActive);

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search />
                    {userData && (
                        <AlumniUser user={userData} />
                    )}
                </div>

                <div className="sm:w-[50%] space-y-2">
                    <div className="space-y-2">
                        {activeJobs.length === 0 ? (
                            <p className='mx-4 sm:mx-2'>No jobs available</p>
                        ) : (
                            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        <h1 className="font-bold text-[15px] uppercase ">
                                            YOUR VERIFIED POST
                                        </h1>
                                        <p className="text-slate-500 text-[12px]">
                                            All your job placements
                                        </p>
                                    </span>
                                </div>
                                {activeJobs.map((job, index) => (
                                    <div key={index} className="flex flex-col text-[12px] space-y-2">
                                        <JobContent data={job} user={userData} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;
