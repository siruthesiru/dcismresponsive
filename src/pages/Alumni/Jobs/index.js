import React, { useEffect, useState } from 'react'
import { PendingData } from '../../../data/mockAlumniData';
import Search from '../../../components/search';
// import JobContent from '../../../components/alumni-company/JobContent';
import AlumniUser from '../../../components/userCard/alumniCard';
import PendingApplication from '../../../components/alumni-company/pendingApplication';
import { useDispatch } from 'react-redux';
import { GetAlumniProfile } from '../../../services/alumni';

const JobList = () => {
    // const jobs = useSelector((state) => state.alumniUserSlice.announcements);

    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await GetAlumniProfile(dispatch);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, [dispatch]);

    const pending = PendingData[0];

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>
                <div className="flex flex-col sm:w-[25%] gap-2">
                    <Search />
                    {userData && (
                        <AlumniUser user={userData} />
                    )}
                </div>

                <div className='sm:w-[50%] space-y-2'>
                    {/* {jobSections.map((section, index) => (
                        <JobContent key={index} data={section} />
                    ))} */}
                </div>

                <div className='sm:w-[25%]'>
                    <PendingApplication data={pending} />
                </div>


            </div>
        </div>
    )
}

export default JobList