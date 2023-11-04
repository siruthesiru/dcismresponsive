import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from 'react-pdf';


export default function AlumniProfileContent({ data }) {
  const { 
    profileImage,
    firstName, 
    middleName, 
    lastName, 
    gender, 
    birthday,
    alumniAddress, 
    email, 
    idNum, 
    mobileNumber, 
    courses, 
    department, 
    syGraduated, 
    isEmployed, 
    companyName, 
    companyAddress, 
    occupation,
    alumni_Profiles,
    skills,
    resume 
  } = useSelector((state) => state.alumniProfile);
  
    const navigate = useNavigate();

    const formatBirthday = (birthday) => {
      if (birthday) {
        const date = new Date(birthday);
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        return date.toLocaleDateString("en-SG", options);
      }
      return <span style={{ color: "gray" }}>No Birthday</span>;
    };

    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const handleDownload = () => {
      const linkSource = `data:application/pdf;base64,${resume}`;
      const downloadLink = document.createElement('a');
      const fileName = 'resume.pdf';
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    };

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url,
    ).toString();

  return (
    <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
      <div className="flex flex-col mx-auto justify-center items-center text-center">
        <img
          src={`data:image/jpeg;base64,${profileImage}`} 
          alt="Alumni Profile"
          className="w-[90px] h-[90px] rounded-full border border-slate-300 "
        />
        <h1 className="font-bold py-2">{firstName+" "+middleName+" "+lastName}</h1>
      </div>

      <div className="flex flex-col text-[12px] space-y-2">
        <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
          <Head head="Personal Information" />
          <Content title="Gender" desc={gender != null ? gender : <span style={{ color: "gray" }}>No Gender</span>} />
          <Content title="Birthday" desc={formatBirthday(birthday)}/>
          <Content title="Address" desc={alumniAddress != null ? alumniAddress : <span style={{ color: "gray" }}>No Alumni Address</span> }/>

          <Line />
          <Head head="Account Information" />

          <Content title="Email" desc={email} />
          <Content title="Id Number" desc={idNum} />
          <Content title="Mobile Number" desc={mobileNumber != null ? mobileNumber : <span style={{ color: "gray" }}>No Mobile Number</span>} />
          
          <Line />
          <Head head="Academic Information" />
          <div>
            {courses && courses.map((course, index) => (
              <div key={index}>
                <Content title="Degree" desc={course.program} />
                <Content title="Educational Level" desc={course.educationalLevel} />
              </div>
            ))}
          </div>

          
          <Content title="Department" desc={department} />
          <Content title="SY Graduated" desc={syGraduated } />

          <Line />
          <Head head="Professional Information" />

          <Content
            title="Status"
            desc={isEmployed != null ? "Employed" : <span style={{ color: "gray" }}>Not Employed</span>}
          />
          <Content title="Company Name" desc={companyName != null ? companyName : <span style={{ color: "gray" }}>No Current Company</span>} />
          <Content title="Company Address" desc={companyAddress != null ? companyAddress : <span style={{ color: "gray" }}>No Current Company Address</span>} />
          <Content title="Occupation" desc={occupation != null ? occupation : <span style={{ color: "gray" }}>No Current Occupation</span>} />
          <div>
            {alumni_Profiles && alumni_Profiles.map((alumni_Profile, index) => (
              <div key={index}>
                <Content title="Previous Company" desc={alumni_Profile.previousCompany != null ? alumni_Profile.previousCompany : <span style={{ color: "gray" }}>No Previous Company</span>} />
                <Content title="Previous Occupation" desc={alumni_Profile.previousOccupation != null ? alumni_Profile.previousOccupation  : <span style={{ color: "gray" }}>No Previous Occupation</span>} />
                <Content title="Years Of Experience" desc={alumni_Profile.yearsExperience != null ? alumni_Profile.yearsExperience   : <span style={{ color: "gray" }}>No Previous Experience</span>} />
              </div>
            ))}
          </div>
          
          <Line />

          <Head head="Skills" />

          <div>
            {skills && skills.map((skill, index) => (
              <div key={index} className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100">
                <div>{skill.skill != null ? skill.skill : <span style={{ color: "gray" }}>No Skills</span>}</div>
              </div>
            ))}
          </div>

          <Line />

          <Head head="Resume" />
          <div className="flex">
          {resume ? (
            <div style={{ flex: 1 }}>
              <Document file={{ data: atob(resume) }} onLoadSuccess={onDocumentLoadSuccess}>
                {/* <Page pageNumber={pageNumber} /> */}
                <Page pageNumber={1} />
              </Document>
              <p>Page 1 of {numPages}</p>
              <button className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100" onClick={handleDownload}>Download Resume</button>
            </div>
          ): 
          (
            <div>
              <span style={{ color: "gray" }}>No Resume</span>
            </div>
          )}
        </div>

          <div className="flex justify-center" onClick={() => navigate("/alumni/edit-profile")}>
            <div className="w-1/2 hover:cursor-pointer border-2 p-2 bg-[#221769] text-white uppercase mt-8 rounded-xl flex justify-center items-center ">
              <p>Edit Profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Content = ({ title = "", desc = "" }) => {
  return (
    <div className="flex justify-between">
      <p>{title}</p>
      <p className="font-bold ">{desc}</p>
    </div>
  );
};

const Line = () => {
  return (
    <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
  );
};

const Head = ({ head = "" }) => {
  return <p className="font-bold ">{head}</p>;
};
