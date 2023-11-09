import React from 'react'
import { PendingData } from '../../../data/mockAlumniData';
import CompanyProfileCard from '../../../components/profileCard/CompanyProfileCard';
import PendingApplication from '../../../components/alumni-company/pendingApplication';

const CompanyProfile = () => {
    const pending = PendingData[0];

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
                <div className="flex flex-col sm:w-[60%]">
                    <CompanyProfileCard />
                </div>
                <div className="sm:w-[40%]">
                    <PendingApplication data={pending} />
                </div>
            </div>
        </div>
    );
}

export default CompanyProfile