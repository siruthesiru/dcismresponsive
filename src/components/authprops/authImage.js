import React from "react";
import alumnischool from "../../assets/alumnischool.webp";

const AuthImage = () => {
    return (
        <div className="hidden md:flex md:w-[30%] lg:w-[40%]">
            <img
                src={alumnischool}
                alt="Alumni walking back to school"
                className="mb-4 w-full h-full object-cover"
            />
        </div>
    );
};

export default AuthImage;
