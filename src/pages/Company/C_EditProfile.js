import React from 'react'
import EditCompanyProfileContent from '../../components/alumni-company/EditCompanyProfileContent';


const C_EditProfile = () => {

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col justify-center sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[80%]">
          <EditCompanyProfileContent />
        </div>
      </div>
    </div>
  );
}

export default C_EditProfile