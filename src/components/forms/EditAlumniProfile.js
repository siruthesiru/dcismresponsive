import { Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import placeholder from "../../assets/placeholder.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditProfile, GetAlumniProfile } from "../../services/alumni";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { programs } from '../constant/helper';


const EditAlumniProfile = ({ profileData }) => {
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: profileData.email,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        middleName: profileData.middleName,
        birthday: profileData.birthday,
        gender: profileData.gender,
        alumniAddress: profileData.alumniAddress,
        idNum: profileData.idNum,
        companyAddress: profileData.companyAddress,
        programCode: profileData?.courses[0]?.programCode,
        programDescription: profileData?.courses[0]?.programDescription,
        educationLevel: profileData?.courses[0]?.educationalLevel,
        companyName: profileData.companyName,
        skills: profileData.skills,
        resume: profileData.resume,
        picture: profileData.profileImage,
        syGraduated: profileData.syGraduated,
        isEmployed: profileData.isEmployed,
        mobileNumber: profileData.mobileNumber,
        occupation: profileData.occupation
    });

    console.log(userData);


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
            const profileData = await GetAlumniProfile(dispatch);
            setUserData({
                ...userData,
                skills: profileData.skills,
                picture: profileData.profileImage,
            });
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigate('/alumni/profile');
        }
    };

    const handleSkillChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...userData.skills];
        updatedSkills[index] = { skill: value };
        setUserData({ ...userData, skills: updatedSkills });
    };

    const removeSkill = (index) => {
        const updatedSkills = [...userData.skills];
        updatedSkills.splice(index, 1);
        setUserData({ ...userData, skills: updatedSkills });
    };

    const addSkill = () => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            skills: [...prevUserData.skills, { skill: '' }],
        }));
    };


    const navigate = useNavigate();

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
                                required
                            />

                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Gender: </label>

                            <div className="flex items-center justify-center gap-3">
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    checked={userData?.gender === "Female"}
                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    required
                                />
                                <label htmlFor="female">Female</label>

                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    checked={userData?.gender === "Male"}
                                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                    required
                                />
                                <label htmlFor="male">Male</label>
                            </div>

                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Date of Birth: </label>
                            <input
                                type="date"
                                value={userData?.birthday ? userData.birthday.split("T")[0] : ""}
                                onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-5 rounded-md"
                                name="birthday"
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Address: </label>
                            <input
                                type="text"
                                name="alumniAddress"
                                placeholder='Input your Current Address'
                                value={userData?.alumniAddress}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                required
                            />

                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Account Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">USC ID: </label>
                            <p className="font-bold "> {userData?.idNum}</p>
                        </div>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Email Address: </label>
                            <p className="font-bold "> {userData?.email}</p>
                        </div>
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
                                required
                            />

                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Academic Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Course Program: </label>

                            {(userData?.courses?.length === 0) ? (
                                <Select
                                    id="program"
                                    value={userData?.programDescription || ''}
                                    onChange={(e) => {
                                        const selectedProgramDescription = e.target.value;
                                        const selectedProgram = programs.find(program => program.description === selectedProgramDescription);
                                        if (selectedProgram) {
                                            let educationalLevel = "Bachelor";
                                            if (selectedProgramDescription.startsWith("Master")) {
                                                educationalLevel = "Master";
                                            } else if (selectedProgramDescription.startsWith("Doctor")) {
                                                educationalLevel = "Doctor";
                                            }
                                            setUserData({
                                                ...userData,
                                                programDescription: selectedProgram.description,
                                                programCode: selectedProgram.code,
                                                educationLevel: educationalLevel,
                                            });
                                        }
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {programs.map((program) => (
                                        <MenuItem key={program.description} value={program.description}>
                                            {program.description}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <p className="font-bold">
                                    {userData.programDescription}
                                </p>

                            )}
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Year Graduated: </label>

                            <input
                                type="number"
                                placeholder='What class batch you graduated'
                                name="syGraduated"
                                value={userData?.syGraduated}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />

                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Work Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Employment Status: </label>

                            <div className="flex items-center justify-center gap-3">
                                <input
                                    type="radio"
                                    id="employed"
                                    name="isEmployed"
                                    value="true"
                                    checked={userData?.isEmployed === true}
                                    onChange={(e) => setUserData({ ...userData, isEmployed: e.target.value === "true" })}
                                    required
                                />
                                <label htmlFor="employed">Employed</label>

                                <input
                                    type="radio"
                                    id="unemployed"
                                    name="employmentStatus"
                                    value="false"
                                    checked={userData?.isEmployed === false}
                                    onChange={(e) => setUserData({ ...userData, isEmployed: e.target.value === "true" })}
                                    required
                                />
                                <label htmlFor="unemployed">Unemployed</label>
                            </div>

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
                            <label className="text-[12px] w-[100px]">Occupation: </label>

                            <input
                                type="text"
                                placeholder='Type your position in the company'
                                name="occupation"
                                value={userData?.occupation}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />

                        </div>

                        {/* <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Years of Experience: </label>

                            <input
                                type="number"
                                placeholder='Input your years of experience'
                                name="years"
                                value={userData?.years}
                                onChange={handleInputChange}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />

                        </div> */}
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Skills</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Skills: </label>

                            <div className="flex flex-col my-2">
                                {userData.skills.map((skillObj, index) => (
                                    <div key={index} className="flex items-center my-2">
                                        <input
                                            type="text"
                                            placeholder="Enter a skill"
                                            value={skillObj.skill}
                                            onChange={(e) => handleSkillChange(e, index)}
                                            className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(index)}
                                                className="text-red-600 ml-2"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="text-blue-600 mt-2"
                                >
                                    Add Skill
                                </button>
                            </div>

                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <div className="flex items-center">
                            <>
                                <label className="flex mr-2">{userData?.resume ? "Change Resume File" : "Add Resume"}</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setUserData({ ...userData, resume: e.target.files[0] })}
                                />
                            </>
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
            </div>
        </form>
    );
}

export default EditAlumniProfile;