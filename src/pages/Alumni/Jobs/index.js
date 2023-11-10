import React, { useEffect, useState } from 'react';
import Search from '../../../components/search';
import AlumniUser from '../../../components/userCard/alumniCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllAppliedJobs, GetAllJobs, GetAlumniProfile } from '../../../services/alumni';
import JobContent from '../../../components/cards/JobContent';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
    const jobs = useSelector((state) => state.alumniUserSlice.jobList);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [appliedJobsLoaded, setAppliedJobsLoaded] = useState(null);
    const [loadingAppliedJobs, setLoadingAppliedJobs] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await GetAlumniProfile(dispatch);
                setUserData(userData);

                if (userData) {
                    const appliedJobsLoaded = await GetAllAppliedJobs(dispatch);
                    setAppliedJobsLoaded(appliedJobsLoaded);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingAppliedJobs(false);
            }
        };

        fetchData();
        GetAllJobs(dispatch);
    }, [dispatch]);


    const filteredActiveJobs = Object.values(jobs)
        .filter((job) => job.status && job.isActive)
        .filter((job) => job.position.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log(appliedJobsLoaded);

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search onChange={(e) => setSearchTerm(e.target.value)} />
                    {userData && (
                        <AlumniUser user={userData} />
                    )}
                </div>

                <div className="sm:w-[50%] space-y-2">
                    <div className="space-y-2">
                        {filteredActiveJobs.length === 0 ? (
                            <p className='mx-4 sm:mx-2'>No jobs available</p>
                        ) : (
                            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        <h1 className="font-bold text-[15px] uppercase ">
                                            LIST OF ACTIVE JOB POST
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
                        <h1 className="font-bold text-[15px] uppercase">List of Applied Jobs</h1>
                        <p className="text-slate-500 text-[12px]">All your placements</p>
                        {loadingAppliedJobs ? (
                            <p>Loading applied jobs...</p>
                        ) : (
                            appliedJobsLoaded.length ? (
                                <div className="flex flex-col text-[12px] space-y-2">
                                    {appliedJobsLoaded.map((appliedJob, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
                                        >
                                            <div className="flex flex-col">
                                                <h1 className="flex font-bold">{appliedJob.job.position}</h1>
                                                <Content title="Location" desc={appliedJob.job.location} />
                                                <Content title="Years of Exp" desc={appliedJob.job.yearsOfExp} />
                                                <Content title="Salary" desc={appliedJob.job.salary} />
                                                <div className="flex flex-col">
                                                    <Content title="Slots" desc={appliedJob.job.slots} />
                                                    <p className="flex justify-end text-[#0098FF] cursor-pointer" onClick={() => navigate(`/alumni/job/${appliedJob.job.id}`)}>View Details</p>
                                                    <p className="flex justify-end text-[#aa3636]">
                                                        Delete Application
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mx-4 sm:mx-2">No applied jobs available</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;

const Content = ({ title = "", desc = "" }) => {
    return (
        <div className="flex justify-between">
            <p>{title}</p>
            <p className="font-bold ">{desc}</p>
        </div>
    );
};
