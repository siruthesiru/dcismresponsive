import React, { useEffect, useState } from 'react'
import Search from '../../../components/search';
import CompanyUser from '../../../components/userCard/companyCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllJobs, GetCompanyProfile } from '../../../services/company';
import JobContent from '../../../components/cards/JobContent';
import PendingApplication from '../../../components/cards/PendingApplication';

const CompanyJobs = () => {
    const jobs = useSelector((state) => state.companyUserSlice.jobPost);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await GetCompanyProfile(dispatch);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        GetAllJobs(dispatch);
    }, [dispatch]);

    const activeJobs = Object.values(jobs).filter((job) => job.status && job.isActive);
    const pending_jobs = Object.values(jobs).filter((job) => !job.status);

    const filteredActiveJobs = Object.values(activeJobs)
        .filter((job) => job.status && job.isActive)
        .filter((job) => job.position.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search onChange={(e) => setSearchTerm(e.target.value)} />
                    {userData && (
                        <CompanyUser user={userData} />
                    )}
                </div>
                <div className="sm:w-[50%] space-y-2">
                    <div className="space-y-2">
                        {filteredActiveJobs.length === 0 ? (
                            <p className='mx-4 sm:mx-2'>No active jobs available</p>
                        ) : (
                            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        <h1 className="font-bold text-[15px] uppercase ">
                                            YOUR ACTIVE POST
                                        </h1>
                                        <p className="text-slate-500 text-[12px]">
                                            All your job placements
                                        </p>
                                    </span>
                                </div>
                                {filteredActiveJobs.map((job, index) => (
                                    <div key={index} className="flex flex-col text-[12px] space-y-2">
                                        <JobContent data={job} user={userData} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                        <h1 className="font-bold text-[15px] uppercase ">List of Pending Job Post</h1>
                        <p className="text-slate-500 text-[12px]">All your placement</p>
                        {pending_jobs.length === 0 ? (
                            <p className='mx-4 sm:mx-2'>No pending jobs available</p>
                        ) : (
                            <div className="flex flex-col text-[12px] space-y-2">
                                {pending_jobs.map((job, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                                    >
                                        <PendingApplication data={job} user={userData} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyJobs