import React from 'react'

import UserCard from '../../components/alumni-company/UserCard';
import JobContent from '../../components/alumni-company/JobContent';

import { SearchData, UserCardData, PendingData } from "../../data/mockAlumniData";
import Search from '../../components/alumni-company/SearchBox';


function A_SearchPage() {
    const user = UserCardData[0];
    const pending = PendingData[0];


    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search />
                    <UserCard data={user} />
                </div>

                <div className='sm:w-[50%] space-y-2'>
                    {SearchData.map((section, index) => (
                        <JobContent key={index} data={section} />
                    ))}
                </div>

                <div className='sm:w-[25%]'>
                    <JobContent data={pending} />
                </div>


            </div>
        </div>
    )
}

export default A_SearchPage