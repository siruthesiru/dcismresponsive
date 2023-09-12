import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthImage from "../../../components/authprops/authImage";

const ForgotPassword = () => {
    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 mt-10">
            <AuthImage />

            <div className="w-full md:w-[70%] lg:w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <h1 className="text-4xl font-bold text-main">
                    Forgot <br /> Password?
                </h1>
                <p className="text-main pb-8">Dont worry. We can help</p>

                <div className="space-y-8">
                    <div className="flex items-center border rounded-md shadow-md p-4 ">
                        <FaEnvelope size={25} className="mx-2" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="outline-none flex-1 "
                        />
                    </div>

                    <button className="w-full p-4 bg-main rounded-md text-white">
                        Continue
                    </button>
                </div>

                <p className="text-[16px] mt-[20px] mb-4 text-center">
                    Remember your password?{" "}
                    <span className=" text-second underline">
                        <Link to="/signin">Back to Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
