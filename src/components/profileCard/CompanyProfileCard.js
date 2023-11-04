import React, { useEffect, useState } from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import placeholder from "../../assets/placeholder.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile, GetCompanyProfile } from "../../services/company";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAccount } from "../../app/authenticationSlice";


const CompanyProfileCard = () => {
    const { email } = useSelector((state) => state.authentication)
    const [userData, setUserData] = useState(null);
    const [isEmailEdited, setIsEmailEdited] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await GetCompanyProfile(dispatch);
            setUserData(profileData);
        };

        fetchProfileData();
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (name === "email" && value !== email) {
            setIsEmailEdited(true);
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async () => {
        try {
            console.log(userData);
            await EditProfile(dispatch, userData);
            toast.success("Updated profile successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }

        if (isEmailEdited) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            toast.success("Please sign in again for the new email");
            dispatch(clearAccount(null));
        }
    };

    const navigate = useNavigate();

    return (
        <form>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col items-center bg-slate-100 min-h-screen">
                <div className="container mx-auto w-full sm:w-1/2 p-4">
                    <div className="flex flex-col bg-white border rounded-lg space-y-2">
                        <div className="flex flex-col mx-auto justify-center items-center text-center">
                            {isEditing ? (
                                <>
                                    <input
                                        type="file"
                                        name="profileImage"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="profile-picture-input"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    setUserData({ ...userData, profilePicture: e.target.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label htmlFor="profile-picture-input">
                                        <CardMedia
                                            component="img"
                                            sx={{ marginLeft: "2rem", width: 90, height: 90, borderRadius: "50%", cursor: "pointer" }}
                                            image={userData?.profilePicture}
                                            alt="Profile picture"
                                        />
                                    </label>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                                        Click the placeholder for adding profile.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={userData?.profilePicture || placeholder}
                                        alt="placeholder"
                                        className="w-[90px] h-[90px] rounded-full border border-slate-300 "
                                    />
                                    <h1 className="font-bold py-2 capitalize">{userData?.firstName} {userData?.lastName}</h1>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col text-[12px] space-y-2">
                            <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                                <p className="font-bold ">Personal Information</p>
                                <div className="flex items-center">
                                    <label className="text-[12px] w-[100px]">First Name: </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder='Input your First Name'
                                            value={userData?.firstName}
                                            onChange={handleInputChange}
                                            variant='outlined'
                                            className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                        />
                                    ) : (
                                        <p className="font-bold "> {userData?.firstName}</p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <label className="text-[12px] w-[100px]">Last Name: </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder='Input your Middle Name'
                                            value={userData?.lastName}
                                            onChange={handleInputChange}
                                            variant='outlined'
                                            className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                        />
                                    ) : (
                                        <p className="font-bold "> {userData?.lastName}</p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <label className="text-[12px] w-[100px]">Middle Name: </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="middleName"
                                            placeholder='Input your Middle Name'
                                            value={userData?.middleName}
                                            onChange={handleInputChange}
                                            variant='outlined'
                                            className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                        />
                                    ) : (
                                        <p className="font-bold "> {userData?.middleName}</p>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <label className="text-[12px] w-[100px]">Email Address: </label>

                                    {isEditing ? (
                                        <input
                                            type="text"
                                            placeholder='Input your Email Address'
                                            name="email"
                                            value={userData?.email}
                                            onChange={handleInputChange}
                                            variant='outlined'
                                            className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                        />
                                    ) : (
                                        <p className="font-bold "> {userData?.email}</p>
                                    )}
                                </div>

                                <div className="flex flex-col text-[12px] space-y-2">
                                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                                        <p className="font-bold">Company Information</p>
                                        <div className="flex items-center">
                                            <label className="text-[12px] w-[100px]">Company Name: </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    placeholder='Input your Company Name'
                                                    name="companyName"
                                                    value={userData?.companyName}
                                                    onChange={handleInputChange}
                                                    variant='outlined'
                                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                                />
                                            ) : (
                                                <p className="font-bold">{userData?.companyName}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <label className="text-[12px] w-[100px]">Company Address: </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    placeholder='Input your Company Address'
                                                    name="companyAddress"
                                                    value={userData?.companyAddress}
                                                    onChange={handleInputChange}
                                                    variant='outlined'
                                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                                />
                                            ) : (
                                                <p className="font-bold">{userData?.companyAddress}</p>
                                            )}
                                        </div>
                                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                                    </div>

                                    <div className="flex items-center px-6 mt-6">
                                        <div className='flex gap-10 flex-1 justify-end'>
                                            {isEditing ? (
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
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    onClick={toggleEditing}
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        padding: "10px",
                                                        marginTop: "2rem",
                                                        backgroundColor: "yellow",
                                                        color: "black",
                                                    }}
                                                >
                                                    Edit Profile
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CompanyProfileCard

