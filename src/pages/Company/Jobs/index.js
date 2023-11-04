import React from 'react'
import { CompanyJobsData, PendingData, UserCardData } from '../../../data/mockAlumniData';
import JobContent from '../../../components/alumni-company/JobContent';
import CompanyCard from '../../../components/alumni-company/CompanyCard';
import Search from '../../../components/search';

const CompanyJobs = () => {
    const user = UserCardData[0];
    const pending = PendingData[0];
    const jobSections = CompanyJobsData[0];

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search />
                    <CompanyCard data={user} />
                </div>
                <div className="sm:w-[50%] space-y-2">
                    <div className="space-y-2">
                        <JobContent data={jobSections} />
                    </div>
                </div>

                <div className="sm:w-[25%]">
                    <JobContent data={pending} />
                </div>
            </div>
        </div>
    );
}

export default CompanyJobs