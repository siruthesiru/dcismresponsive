// import React from 'react'
// import { NotifData, PendingData, UserCardData } from '../../../data/mockAlumniData';
// import CompanyCard from '../../../components/alumni-company/CompanyCard';
// import NotificationContent from '../../../components/alumni-company/NotificationContent';
// import PendingApplication from '../../../components/alumni-company/pendingApplication';

// const CompanyNotification = () => {
//     const user = UserCardData[0];
//     const pending = PendingData[0];
//     const notif = NotifData[0];
//     console.log("data", notif);


//     return (
//         <div className='bg-slate-100 min-h-screen'>
//             <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2'>

//                 <div className="sm:w-[25%] gap-2">
//                     <CompanyCard data={user} />
//                 </div>

//                 <div className='sm:w-[50%] space-y-2'>
//                     <NotificationContent data={notif} />
//                 </div>

//                 <div className='sm:w-[25%]'>
//                     <PendingApplication data={pending} />
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default CompanyNotification