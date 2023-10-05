import React from "react";
import JobContent from "../../components/alumni-company/JobContent";
import Profile from "../../components/alumni-company/CompanyProfileContent";


import { PendingData,CompanyProfileData} from "../../data/mockAlumniData";

export default function C_Profile() {
  const pending = PendingData[0];
  const profile = CompanyProfileData[0];

  console.log("profile",profile)

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[60%]">
        <Profile data={profile} />

        </div>
        <div className="sm:w-[40%]">
          <JobContent data={pending} />
        </div>
      </div>
    </div>
  );
}

