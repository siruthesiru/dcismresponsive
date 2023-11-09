import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import placeholder from "../../assets/placeholder.webp";
import { EditProfile, GetCompanyProfile } from "../../services/company";


const EditProfileCompany = () => {
    const profileData = useSelector(state => state.companyUserSlice.companyProfile);
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
        email: profileData.email
    });


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
            setUserData(profileData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col mx-auto justify-center items-center text-center">
                    <label htmlFor="fileInput">
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageInputChange}

                            name="picture"
                        />
                        <img
                            src={currentlySelectedImage || `data:image/jpeg;base64,${userData.picture}` || placeholder}
                            alt="User Profile"
                            style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                        />
                    </label>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                        <button onClick={() => document.getElementById('fileInput').click()}>Choose Image</button>
                    </Typography>
                </div>


                <div className="flex items-center px-6 mt-6">
                    <div className='flex gap-10 flex-1 justify-end'>
                        <Button
                            type="button"
                            variant="contained"
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "10px",
                                marginTop: "2rem",
                                backgroundColor: "#666666",
                                color: "#FFFFFF",
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                display: "block",
                                padding: "10px",
                                backgroundColor: "#3da58a",
                                color: "#FFFFFF",
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileCompany;
