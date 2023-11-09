import { Button, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import placeholder from "../../assets/placeholder.webp"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditProfile, GetAlumniProfile } from "../../services/alumni";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAccount } from "../../app/authenticationSlice";
import { GetAdminProfile } from "../../services/admin_alumni";


const AlumniProfileCard = () => {
    const { email } = useSelector((state) => state.authentication)
    const [userData, setUserData] = useState(null);
    const [isEmailEdited, setIsEmailEdited] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await GetAlumniProfile(dispatch);
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
            // const base64Image = userData.picture.split(',')[1];

            await EditProfile(dispatch, userData);
            toast.success("Updated profile successfully");
            setIsEditing(false);
            await GetAdminProfile(dispatch);
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

    const handleImageInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                setCurrentlySelectedImage(imageData);
                setUserData({ ...userData, fileUpload: imageData });
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const imgSrc = userData?.fileUpload ? userData.fileUpload : (userData?.profileImage ? `data:image/jpeg;base64,${userData.profileImage}` : placeholder);
        setImgSrc(imgSrc);
    }, [userData]);

    return (
        <form>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col mx-auto justify-center items-center text-center">

                    {isEditing ? (
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
                                    src={currentlySelectedImage || placeholder}
                                    alt="User Profile"
                                    style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                                />

                            </label>
                            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                                Click the placeholder for adding image.
                            </Typography>
                        </>
                    ) : (
                        <>
                            <CardMedia
                                component="img"
                                sx={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                                image={imgSrc}
                                alt="Profile picture"
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
                            <label className="text-[12px] w-[100px]">Sex: </label>

                            {isEditing ? (
                                <select
                                    className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm "
                                    value={userData?.sex}
                                    onChange={(e) => setUserData({ ...userData, sex: e.target.value })} name="sex"
                                >
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            ) : (
                                <p className="font-bold "> {userData?.sex}</p>
                            )}
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Date of Birth: </label>

                            {isEditing ? (
                                <DatePicker
                                    className='date-picker-start'
                                    selected={userData?.birthdate}
                                    onChange={(date) => handleInputChange({ target: { name: 'birthdate', value: date } })}
                                    dateFormat="yyyy-MM-dd"
                                    fullWidth
                                />
                            ) : (
                                <p className="font-bold "> {userData?.birthdate ? userData.birthdate.toString() : 'N/A'}</p>
                            )}

                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Address: </label>

                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    placeholder='Input your Current Address'
                                    value={userData?.address}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.address}</p>
                            )}
                        </div>


                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Account Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">USC ID: </label>
                            <p className="font-bold "> {userData?.idNum}</p>
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
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Contact Number: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    placeholder='Input your contact Number'
                                    value={userData?.mobileNumber}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.mobileNumber}</p>
                            )}
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Academic Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Course Program: </label>

                            {isEditing ? (
                                <select
                                    className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm"
                                    value={userData?.course}
                                    onChange={(e) => setUserData({ ...userData, course: e.target.value })} name="course"
                                >
                                    <option value="BSIT">Bachelor of Science in Information Technology (BSIT)</option>
                                    <option value="BSCS">Bachelor of Science in Computer Science (BSCS)</option>
                                    <option value="BSICT">Bachelor of Science in Information and Communication Technology (BSICT)</option>
                                    <option value="BSIS">Bachelor of Science in Information Systems (BSIS)</option>
                                    <option value="BSMath">Bachelor of Science in Mathematics (BSMath)</option>
                                    <option value="BSLIS">Bachelor of Science in Library Information Systems (BSLIS)</option>
                                </select>
                            ) : (
                                <p className="font-bold "> {userData?.course}</p>
                            )}
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Year Graduated: </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    placeholder='What class batch you graduated'
                                    name="syGraduated"
                                    value={userData?.syGraduated}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.syGraduated}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Latin Honor: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Graduated with flying colors'
                                    name="honor"
                                    value={userData?.honor}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.honor}</p>
                            )}

                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Personal Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Employment Status: </label>
                            {isEditing ? (
                                <select
                                    className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm"
                                    value={userData?.employmentStatus}
                                    onChange={(e) => setUserData({ ...userData, employmentStatus: e.target.value })} name="employmentStatus"
                                >
                                    <option value="Employed">Employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                    <option value="SelfEmployed">Self-Employed</option>
                                </select>
                            ) : (
                                <p className="font-bold "> {userData?.employmentStatus}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Type the company name'
                                    name="companyName"
                                    value={userData?.companyName}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.companyName}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Type the company address'
                                    name="companyAddress"
                                    value={userData?.companyAddress}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.companyAddress}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Occupation: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Type your position in the company'
                                    name="occupation"
                                    value={userData?.occupation}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.occupation}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Previous Company: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Type the your previous company'
                                    name="previousCompany"
                                    value={userData?.previousCompany}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.previousCompany}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Previous Occupation: </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    placeholder='Type the your previous position'
                                    name="previousOccupation"
                                    value={userData?.previousOccupation}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.previousOccupation}</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Years of Experience: </label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    placeholder='Input your years of experience'
                                    name="years"
                                    value={userData?.years}
                                    onChange={handleInputChange}
                                    variant='outlined'
                                    className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <p className="font-bold "> {userData?.years}</p>
                            )}
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Skills</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Skills: </label>
                            {isEditing ? (
                                <textarea
                                    placeholder="Input your skills (comma-separated)"
                                    name="skills"
                                    value={userData?.skills?.join(', ') || ''}
                                    onChange={(e) => setUserData({ ...userData, skills: e.target.value.split(', ') })}
                                    variant="outlined"
                                    className="w-[100%] h-[60px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                                />
                            ) : (
                                <div>
                                    {userData?.skills?.map((skill, index) => (
                                        <div key={index} className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100">
                                            <div>{skill}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Resume</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Resume: </label>
                            {isEditing ? (
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    name="resume"
                                    value={userData?.resume}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                    {userData?.resume}
                                </Typography>
                            )}
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
        </form>
    );
}

export default AlumniProfileCard;
