import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobContent({ data, user }) {
    const navigate = useNavigate();
    const role = user.role.toLowerCase();

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <div className="flex justify-between">
                <span>
                    <h1 className="font-bold text-[15px] uppercase ">
                        {role === "company" ? "Your POSTINGS" : "List of Job Post"}
                    </h1>
                    <p className="text-slate-500 text-[12px]">
                        {role === "company" ? "All your job placements" : "List of posts"}
                    </p>
                </span>
            </div>
            <div className="flex flex-col text-[12px] space-y-2">
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
                            <p>Skills Required</p>
                            {data?.targetSkills.map((skill) => (
                                <p key={skill.id} className="font-bold">
                                    {skill.skill}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col">
                            <Content title="Slots" desc={data.slots} />

                            <p className="flex justify-end text-[#0098FF] cursor-pointer" onClick={() => navigate("/alumni/job")}>View Details</p>

                            {role === "company" && (
                                <p className="flex justify-end text-[#aa3636]">
                                    Cancel Posting
                                </p>
                            )}
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
