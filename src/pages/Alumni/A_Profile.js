import React from "react";
import JobContent from "../../components/alumni-company/JobContent";
import Profile from "../../components/alumni-company/AlumniProfileContent";
import { getAlumniProfile } from "../../services/alumniProfile";

//import { SkillsData, PendingData, ProfileData, FilesData } from "../../data/mockAlumniData";
import { SkillsData, PendingData, ProfileData, FilesData } from "../../data/mockAlumniData";
import { useDispatch } from "react-redux";

export default function A_Profile() {
  const pending = PendingData[0];
  const profile = ProfileData[0];
  const skills = SkillsData;
  const files = FilesData;

  const dispatch = useDispatch();
  getAlumniProfile(dispatch);
  
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto flex flex-col sm:flex-row py-4 gap-2">
        <div className="flex flex-col sm:w-[60%]">
        <Profile data={profile} skills={skills} files={files}/>

        </div>
        <div className="sm:w-[40%]">
          <JobContent data={pending} />
        </div>
      </div>
    </div>
  );
}

