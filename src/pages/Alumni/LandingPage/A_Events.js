import React from 'react'
import EventContent from '../../../components/alumni-company/EventContent';
import UserCard from '../../../components/alumni-company/UserCard';

import { EventData, UserCardData } from "../../../data/mockAlumniData";

function Events() {
    const data = EventData[0];
    const user = UserCardData[0];
    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%]">

                    <UserCard data={user} />
                </div>
                <div className='sm:w-[75%] '>
                    <EventContent data={data} />
                </div>
            </div>
        </div>

    )
}

export default Events