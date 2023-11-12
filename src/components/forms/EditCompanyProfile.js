import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditProfile, GetCompanyProfile } from "../../services/company";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();


const EditCompanyProfile = ({ profileData }) => {
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
    const dispatch = useDispatch();


    const [userData, setUserData] = useState({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        middleName: profileData.middleName,
        companyAddress: profileData.companyAddress,
        companyName: profileData.companyName,
        mobileNumber: profileData.mobileNumber,
        websiteLink: profileData.websiteLink,
        picture: profileData.profileImage,
        email: profileData.email,
        isVerified: profileData.isVerified,
        moa: profileData.moa
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                setCurrentlySelectedImage(imageData);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    picture: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        const isEditSucceed = await EditProfile(dispatch, userData);

        if (isEditSucceed) {
            const profileData = await GetCompanyProfile(dispatch);
            setUserData({
                ...userData,
                picture: profileData.profileImage,
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/company/profile');
        }
    };


    const navigate = useNavigate();

    const handleDownload = () => {
        const linkSource = `data:application/pdf;base64,${userData.moa}`;
        const downloadLink = document.createElement('a');
        const fileName = 'moa.pdf';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return (
        <form>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col mx-auto justify-center items-center text-center">
                    <>
                        <label htmlFor="fileInput">
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageInputChange}
                            />
                            <img
                                src={currentlySelectedImage || `data:image/jpeg;base64,${userData.picture}` || placeholder}
                                alt="User Profile"
                                style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                            />

                        </label>
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                            Click the placeholder for adding image.
                        </Typography>
                    </>
                </div>

                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <p className="font-bold ">Personal Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">First Name: </label>

                            <input
                                type="text"
                                name="firstName"
                                placeholder='Input your First Name'
                                value={userData?.firstName}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Last Name: </label>

                            <input
                                type="text"
                                name="lastName"
                                placeholder='Input your Middle Name'
                                value={userData?.lastName}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Middle Name: </label>

                            <input
                                type="text"
                                name="middleName"
                                placeholder='Input your Middle Name'
                                value={userData?.middleName}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Email Address: </label>
                            <p className="font-bold "> {userData?.email}</p>
                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Company Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Contact Number: </label>

                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder='Input your contact Number'
                                value={userData?.mobileNumber}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>

                            <input
                                type="text"
                                placeholder='Type the company name'
                                name="companyName"
                                value={userData?.companyName}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>

                            <input
                                type="text"
                                placeholder='Type the company address'
                                name="companyAddress"
                                value={userData?.companyAddress}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Website Link: </label>

                            <input
                                type="text"
                                placeholder="Paste the link"
                                name="websiteLink"
                                value={userData?.websiteLink}
                                onChange={handleInputChange}
                                variant="outlined"
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>

                        <div className="flex items-center">
                            {!userData.isVerified && (
                                <>
                                    <label className="flex gap-2">{userData?.moa ? "Change MOA File" : "Apply Verification Upload MOA"}</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setUserData({ ...userData, moa: e.target.files[0] })}
                                    />
                                </>
                            )}
                            {userData.isVerified && (
                                <div style={{ flex: 1 }}>
                                    <label className="text-[12px] w-[100px]">Uploaded Moa: </label>
                                    <button className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100" onClick={handleDownload}>
                                        Download MOA
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center px-6 mt-6">
                            <div className='flex gap-10 flex-1 justify-end'>

                                <>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        style={{
                                            display: "block",
                                            padding: "10px",
                                            backgroundColor: "#3da58a",
                                            color: "#FFFFFF",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        style={{
                                            display: "block",
                                            padding: "10px",
                                            backgroundColor: "#666666",
                                            color: "#FFFFFF",
                                        }}
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </Button>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </form >
    );
}

export default EditCompanyProfile