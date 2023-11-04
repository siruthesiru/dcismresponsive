import React, { useEffect, useState } from 'react'
import AnnouncementCard from '../../../components/announcementCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetCompanyProfile } from '../../../services/company';
import CompanyUser from '../../../components/userCard/companyCard';

const LandingPageCompany = () => {
    const announcements = useSelector((state) => state.companyUserSlice.announcements);

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
        //  GetAllAnnouncements(dispatch);
    }, [dispatch]);

    console.log(userData);

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%]">
                    {userData && (
                        <CompanyUser user={userData} />
                    )}
                </div>
                <div className='sm:w-[75%]'>
                    {announcements.length === 0 ? (
                        <p className='mx-4 sm:mx-2'>No announcements available</p>
                    ) : (
                        announcements.map((announcement, index) => (
                            <AnnouncementCard key={index} announcement={announcement} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPageCompany