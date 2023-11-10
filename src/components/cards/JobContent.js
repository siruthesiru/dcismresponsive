import React from "react";
import { useNavigate } from "react-router-dom";
import { ApplyJob, GetAllAppliedJobs } from "../../services/alumni";
import { useDispatch } from "react-redux";

export default function JobContent({ data, user }) {
    const navigate = useNavigate();
    const role = user?.role.toLowerCase();
    const dispatch = useDispatch();

    const handleViewDetails = () => {
        const jobId = data.id;
        navigate(`/${role}/job/${jobId}`);
    };

    const handleApplyJob = () => {
        try {
            const credentials = {
                id: data.id,
            };
            const responseData = ApplyJob(dispatch, credentials);
            if (responseData) {
                GetAllAppliedJobs(dispatch);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div
            className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg"
        >
            <div className="flex flex-col">
                <h1 className="flex font-bold">{data?.position}</h1>
                <Content title="Company" desc={data?.company?.companyName} />
                <Content title="Location" desc={data?.location} />
                <Content title="Years of Exp" desc={data?.yearsOfExp} />
                <Content title="Salary" desc={data?.salary} />
                <div className="flex justify-between">
                    <p>Skills Required:</p>
                    <p className="font-bold">
                        {data?.targetSkills?.map((skill) => skill.skill).join(', ')}
                    </p>
                </div>

                <div className="flex flex-col">
                    <Content title="Slots" desc={data.slots} />
                    <p className="flex justify-end text-[#0098FF] cursor-pointer" onClick={handleViewDetails}>View Details</p>
                    {role === "company" && (
                        <p className="flex justify-end text-[#aa3636]">
                            Close Job Posting
                        </p>
                    )}
                    {role === "alumni" && (
                        <p className="flex justify-end text-[#317f6a] cursor-pointer" onClick={handleApplyJob}>
                            Apply Job
                        </p>
                    )}
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


