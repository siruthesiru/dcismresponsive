import { Button, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import placeholder from "../../assets/placeholder.webp"
import { useNavigate } from "react-router-dom";


export default function EditAlumniProfileContent() {
    const { firstName,
        lastName,
        email,
        address,
        courseProgram,
        graduationDate,
        sex,
        birthDate,
        middleName,
        contactNumber,
        honor,
        occupation,
        companyAddress,
        companyName,
        employmentStatus,
        yearsExperience,
        previousCompany,
        previousOccupation,
        profilePicture
    } = useSelector((state) => state.authentication);

    const image = profilePicture || placeholder;
    const [formData, setFormData] = useState({
        firstName,
        lastName,
        middleName,
        email,
        contactNumber,
        address,
        courseProgram,
        sex,
        birthDate,
        graduationDate,
        honor,
        employmentStatus,
        companyName,
        companyAddress,
        occupation,
        yearsExperience,
        previousCompany,
        previousOccupation,
        profilePicture: image,
    });

    const navigate = useNavigate();


    return (
        <form>
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col mx-auto justify-center items-center text-center">
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        id="profile-picture-input"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    setFormData({ ...formData, profilePicture: e.target.result });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                    <label htmlFor="profile-picture-input">
                        <CardMedia
                            component="img"
                            sx={{ marginLeft: "2rem", width: 90, height: 90, borderRadius: "50%", cursor: "pointer" }}
                            image={formData.profilePicture}
                            alt="Profile picture"
                        />
                    </label>
                    <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                        Click the placeholder for adding profile.
                    </Typography>
                </div>

                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <Head head="Personal Information" />

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">First Name: </label>
                            <input
                                type="text"
                                placeholder='Input your First Name'
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Last Name: </label>
                            <input
                                type="text"
                                placeholder='Input your Last Name'
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Middle Name: </label>
                            <input
                                type="text"
                                placeholder='Input your Middle Name'
                                value={formData.middleName}
                                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Sex: </label>
                            <select
                                className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm "
                                value={formData.sex}
                                onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Date of Birth: </label>
                            <DatePicker
                                className='date-picker-start'
                                dateFormat="MM/dd/yyyy"
                                selected={formData.birthDate}
                                onChange={(birthDate) => setFormData({ ...formData, birthDate })}
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Address: </label>
                            <input
                                type="text"
                                placeholder='Input your Current Address'
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>


                        <Line />
                        <Head head="Account Information" />

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Email Address: </label>
                            <input
                                type="text"
                                placeholder='Input your Email Address'
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Contact Number: </label>
                            <input
                                type="text"
                                placeholder='Input your contact Number'
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <Line />
                        <Head head="Academic Information" />

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Course Program: </label>
                            <select
                                className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm"
                                value={formData.courseProgram}
                                onChange={(e) => setFormData({ ...formData, courseProgram: e.target.value })}
                            >
                                <option value="BSIT">Bachelor of Science in Information Technology (BSIT)</option>
                                <option value="BSCS">Bachelor of Science in Computer Science (BSCS)</option>
                                <option value="BSICT">Bachelor of Science in Information and Communication Technology (BSICT)</option>
                                <option value="BSIS">Bachelor of Science in Information Systems (BSIS)</option>
                                <option value="BSMath">Bachelor of Science in Mathematics (BSMath)</option>
                                <option value="BSLIS">Bachelor of Science in Library Information Systems (BSLIS)</option>
                            </select>
                        </div>
                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Date of Birth: </label>
                            <DatePicker
                                className='date-picker-start'
                                dateFormat="MM/dd/yyyy"
                                selected={formData.graduationDate}
                                onChange={(graduationDate) => setFormData({ ...formData, graduationDate })}
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Latin Honor: </label>
                            <input
                                type="text"
                                placeholder='Input your honors'
                                value={formData.honor}
                                onChange={(e) => setFormData({ ...formData, honor: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>

                        <Line />

                        <Head head="Professional Information" />

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Employment Status: </label>
                            <select
                                className="h-[30px] w-[100%] border-slate-200 bg-white border rounded-sm"
                                value={formData.employmentStatus}
                                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                            >
                                <option value="Employed">Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="SelfEmployed">Self-Employed</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>
                            <input
                                type="text"
                                placeholder='Input the Company Name'
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        {/* we will be using the google auto complete address */}
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>
                            <input
                                type="text"
                                placeholder='Input the Company Address'
                                value={formData.companyAddress}
                                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Occupation: </label>
                            <input
                                type="text"
                                placeholder='Input your position'
                                value={formData.occupation}
                                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Previous Company: </label>
                            <input
                                type="text"
                                placeholder='Input your previous company'
                                value={formData.previousCompany}
                                onChange={(e) => setFormData({ ...formData, previousCompany: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Previous Occupation: </label>
                            <input
                                type="text"
                                placeholder='Input your previous occupation'
                                value={formData.previousOccupation}
                                onChange={(e) => setFormData({ ...formData, previousOccupation: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Years of Experience: </label>
                            <input
                                type="number"
                                placeholder='Input your years of experience'
                                value={formData.yearsExperience}
                                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>

                        <Line />

                        <Head head="Resume" />
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Resume: </label>
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                            />
                        </div>

                        <div className="flex items-center px-6 mt-6">
                            <div className='flex gap-10 flex-1 justify-end'>
                                <Button
                                    type="button"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

const Line = () => {
    return (
        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
    );
};

const Head = ({ head = "" }) => {
    return <p className="font-bold ">{head}</p>;
};
