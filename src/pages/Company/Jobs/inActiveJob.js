import React, { useEffect, useState } from 'react'
import Search from '../../../components/search';
import CompanyUser from '../../../components/userCard/companyCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllJobs, GetCompanyProfile } from '../../../services/company';
import PendingApplication from '../../../components/cards/PendingApplication';
import { formatDate } from '../../../components/constant/helper';
import { useNavigate } from 'react-router-dom';

const CompanyInactiveJobs = () => {
    const jobs = useSelector((state) => state.companyUserSlice.jobPost);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const inactiveJobs = Object.values(jobs).filter((job) => job.status && !job.isActive);
    const pending_jobs = Object.values(jobs).filter((job) => !job.status);

    const filteredActiveJobs = Object.values(inactiveJobs)
        .filter((job) => job.status && !job.isActive)
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
                            <p className='mx-4 sm:mx-2'>No inactive jobs available</p>
                        ) : (
                            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        <h1 className="font-bold text-[15px] uppercase ">
                                            ENDED JOB POST
                                        </h1>
                                        <p className="text-slate-500 text-[12px]">
                                            All your job placements
                                        </p>
                                    </span>
                                </div>
                                {filteredActiveJobs.map((job, index) => (
                                    <div key={index} className="flex flex-col text-[12px] space-y-2">
                                        {/* <JobContent data={job} user={userData} /> */}
                                        <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                                            <div className="flex flex-col">
                                                <h1 className="flex font-bold">{job.position}</h1>
                                                <Content title="Company" desc={job.company.companyName} />
                                                <Content title="Location" desc={job.location} />
                                                <Content title="Years of Exp" desc={job.yearsOfExp} />
                                                <Content title="Salary" desc={job.salary} />
                                                <div className="flex justify-between">
                                                    <p>Skills Required:</p>
                                                    <p className="font-bold">
                                                        {job.targetSkills.map((skill) => skill.skill).join(", ")}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col">
                                                    <Content title="Slots" desc={job.slots} />
                                                    <Content title="Ends By:" desc={formatDate(job.expiration_Date)} />
                                                    <p
                                                        className="flex justify-end text-[#0098FF] cursor-pointer"
                                                        onClick={() => navigate(`/company/job/${job.id}`)}
                                                    >
                                                        View Details
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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

export default CompanyInactiveJobs

const Content = ({ title = "", desc = "" }) => {
    return (
        <div className="flex justify-between">
            <p>{title}</p>
            <p className="font-bold ">{desc}</p>
        </div>
    );
};
