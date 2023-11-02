import React from 'react'
import AlumniProfilePage from '../../components/profileCard/AlumniProfilePage';


const A_EditProfile = () => {

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col justify-center sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[80%]">
          <AlumniProfilePage />
        </div>
      </div>
    </div>
  );
}

export default A_EditProfile