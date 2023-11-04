import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholder from "../../assets/placeholder.webp";

const CompanyUser = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-6">
            <div className="flex flex-col mx-auto justify-center items-center text-center">
                <img
                    src={user?.profilePicture || placeholder}
                    alt="placeholder"
                    className="w-[90px] h-[90px] rounded-full border border-slate-300"
                />
                <h1 className="font-bold py-2 capitalize">{user.firstName} {user.lastName}</h1>
                <h1 className="text-[12px]">{user.companyName}</h1>
            </div>

            <div className="flex justify-center">
                <p className="text-[#0098FF] cursor-pointer" onClick={() => navigate("/company/profile")}>View Profile</p>
            </div>
        </div>
    );
}

export default CompanyUser;
