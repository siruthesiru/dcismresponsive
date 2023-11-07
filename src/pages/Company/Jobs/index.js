import React, { useEffect, useState } from 'react'
import JobContent from '../../../components/alumni-company/JobContent';
import Search from '../../../components/search';
import CompanyUser from '../../../components/userCard/companyCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllJobs, GetCompanyProfile } from '../../../services/company';
import PendingApplication from '../../../components/alumni-company/pendingApplication';
import { PendingData } from '../../../data/mockAlumniData';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CompanyJobs = () => {
    const jobs = useSelector((state) => state.companyUserSlice.jobPost) || [];

    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await GetCompanyProfile(dispatch);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
        GetAllJobs(dispatch);
    }, [dispatch]);

    const pending = PendingData[0];
    const navigate = useNavigate();

    console.log(jobs);

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search />
                    {userData && (
                        <CompanyUser user={userData} />
                    )}
                </div>
                <div className="sm:w-[50%] space-y-2">
                    <Button
                        variant="contained"
                        size="small"
                        style={{ backgroundColor: "#221769" }}
                        onClick={() => navigate("/company/post_job")}
                    >
                        Add Post
                    </Button>
                    <div className="space-y-2">
                        {Object.values(jobs).length === 0 ? (
                            <p className='mx-4 sm:mx-2'>No jobs available</p>
                        ) : (
                            Object.values(jobs).map((job, index) => (
                                <JobContent key={index} data={job} />
                            ))
                        )}
                    </div>
                </div>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <PendingApplication data={pending} />
                </div>
            </div>
        </div>
    );
}

export default CompanyJobs