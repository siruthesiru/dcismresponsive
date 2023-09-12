import React from "react";
import { FaKey } from "react-icons/fa";
import AuthImage from "../../../components/authprops/authImage";

const ChangePassword = () => {
    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 mt-10">
            <AuthImage />

            <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <h1 className="text-4xl font-bold text-main">
                    Change <br /> Password
                </h1>

                <form className="space-y-8">
                    <div className="flex items-center border rounded-md shadow-md p-4 ">
                        <FaKey size={25} className="mr-2" />
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            className="outline-none"
                        />
                    </div>

                    <div className="flex items-center border rounded-md shadow-md p-4 ">
                        <FaKey size={25} className="mr-2" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Confirm Password"
                            className="outline-none"
                        />
                    </div>

                    <button className="w-full p-4 bg-main rounded-md text-white">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
