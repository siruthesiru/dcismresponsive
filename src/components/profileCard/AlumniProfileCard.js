import { Button, CardMedia } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import React from "react";
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlumniProfileCard = () => {
    const userData = useSelector((state) => state.alumniUserSlice.alumniProfile);
    const navigate = useNavigate();

    const handleDownload = () => {
        const linkSource = `data:application/pdf;base64,${userData.resume}`;
        const downloadLink = document.createElement("a");
        const fileName = "moa.pdf";

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
                        <CardMedia
                            component="img"
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: "50%",
                                cursor: "pointer",
                            }}
                            src={userData.profileImage ? `data:image/jpeg;base64,${userData.profileImage}` : placeholder}
                            alt="Profile picture"
                        />
                        <h1 className="font-bold py-2 capitalize">
                            {userData?.firstName} {userData?.lastName}
                        </h1>
                    </>
                </div>

                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                        <p className="font-bold ">Personal Information</p>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">First Name: </label>

                            <p className="font-bold "> {userData?.firstName}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Last Name: </label>

                            <p className="font-bold "> {userData?.lastName}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Middle Name: </label>

                            <p className="font-bold "> {userData?.middleName}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Gender: </label>

                            <p className="font-bold"> {userData?.gender}</p>
                        </div>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Date of Birth: </label>

                            <p className="font-bold ">{userData?.birthday ? userData.birthday.split("T")[0] : "N/A"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Address: </label>

                            <p className="font-bold "> {userData?.alumniAddress}</p>
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

                            <p className="font-bold "> {userData?.mobileNumber}</p>
                        </div>
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Academic Information</p>
                        {userData?.courses?.map((course, index) => (
                            <div className="flex items-center" key={index}>
                                <label className="text-[12px] w-[100px]"> Program Graduated: </label>
                                <p className="font-bold">
                                    {course.programDescription}
                                </p>
                            </div>
                        ))}

                        <div className="flex items-center my-2">
                            <label className="text-[12px] w-[90px]">Year Graduated: </label>

                            <p className="font-bold "> {userData?.syGraduated}</p>
                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Work Information</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">
                                Employment Status:{" "}
                            </label>

                            <p className="font-bold">
                                {userData?.isEmployed === true ? "Employed" : "Unemployed"}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Name: </label>

                            <p className="font-bold "> {userData?.companyName}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Company Address: </label>

                            <p className="font-bold "> {userData?.companyAddress}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Occupation: </label>

                            <p className="font-bold "> {userData?.occupation}</p>
                        </div>

                        {/* <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">
                                Years of Experience:{" "}
                            </label>

                            <p className="font-bold "> {userData?.years}</p>
                        </div> */}
                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <p className="font-bold ">Skills</p>

                        <div className="flex items-center">
                            <label className="text-[12px] w-[100px]">Add Skills: </label>
                            <div>
                                <div

                                    className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                                >
                                    <div>{userData.skills.map((skill) => skill.skill).join(", ")}</div>
                                </div>

                            </div>
                        </div>

                        <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
                        <div className="flex items-center">
                            {userData.resume && userData.resume.length > 0 && (
                                <div style={{ flex: 1 }}>
                                    <label className="text-[12px] w-[100px]">
                                        Uploaded Resume:{" "}
                                    </label>
                                    <button
                                        className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100"
                                        onClick={handleDownload}
                                    >
                                        Download Resume
                                    </button>
                                </div>
                            )}
                            {!userData.resume && (
                                <div>
                                    <span style={{ color: "gray" }}>No resume Uploaded</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center px-6 mt-6">
                            <div className="flex gap-10 flex-1 justify-end">
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => navigate('/alumni/edit-profile')}
                                    startIcon={<EditIcon />}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "2rem",
                                        backgroundColor: "yellow",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            marginRight: "0.5rem",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#4cceac",
                                        },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AlumniProfileCard;
