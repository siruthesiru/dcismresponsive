import React, { useEffect } from 'react'
import AnnouncementCard from '../../../components/announcementCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllAnnouncements, GetCompanyProfile } from '../../../services/company';
import CompanyUser from '../../../components/userCard/companyCard';

const LandingPageCompany = () => {

    const announcements = useSelector((state) => state.companyUserSlice.announcements);
    const userData = useSelector((state) => state.companyUserSlice.companyProfile);

    const dispatch = useDispatch();

    useEffect(() => {
        GetCompanyProfile(dispatch);
        GetAllAnnouncements(dispatch);
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