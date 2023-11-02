import { Button, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import placeholder from "../../assets/placeholder.webp"
import { useNavigate } from "react-router-dom";


export default function EditCompanyProfileContent() {
    const { firstName,
        lastName,
        email,
        middleName,
        contactNumber,
        companyAddress,
        companyName,
        profilePicture
    } = useSelector((state) => state.authentication);

    const image = profilePicture || placeholder;
    const [formData, setFormData] = useState({
        firstName,
        lastName,
        middleName,
        email,
        contactNumber,
        companyName,
        companyAddress,
        file: '',
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

                        <Head head="Company Information" />
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>
                            <input
                                type="text"
                                placeholder='Input your Company Name'
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>
                            <input
                                type="text"
                                placeholder='Input your Company Address'
                                value={formData.companyAddress}
                                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                                variant='outlined'
                                className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
                            />
                        </div>

                        <Line />
                        <Head head="Contact Person Information" />
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

                        <Head head="Affiliation" />

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add MOA: </label>
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
