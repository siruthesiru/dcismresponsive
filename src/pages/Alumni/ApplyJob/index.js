import React from 'react'
import { PendingData, UserCardData } from '../../../data/mockAlumniData';
import ApplyJobPage from '../../../components/alumni-company/ApplyJobPage';
import JobContent from '../../../components/alumni-company/JobContent';
import AlumniUser from '../../../components/userCard/alumniCard';

const ApplyJob = () => {
    const user = UserCardData[0];
    const pending = PendingData[0];

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="sm:w-[25%] gap-2">
                    <AlumniUser data={user} />
                </div>

                <div className='sm:w-[50%] space-y-2'>
                    <ApplyJobPage />
                </div>

                <div className='sm:w-[25%]'>
                    <JobContent data={pending} />
                </div>

            </div>
        </div>
    )
}

export default ApplyJob