import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EventsCard from '../../../components/eventsCard';
import { GetAllEvents, GetCompanyProfile } from '../../../services/company';
import CompanyUser from '../../../components/userCard/companyCard';

const CompanyEvents = () => {
    const events = useSelector((state) => state.companyUserSlice.events);

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
        GetAllEvents(dispatch);
    }, [dispatch]);


    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%]">
                    {userData && (
                        <CompanyUser user={userData} />
                    )}
                </div>
                <div className='sm:w-[75%]'>
                    {events.length === 0 ? (
                        <p className='mx-4 sm:mx-2'>No scheduled events available</p>
                    ) : (
                        events.map((event, index) => (
                            <EventsCard key={index} events={event} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyEvents; 
