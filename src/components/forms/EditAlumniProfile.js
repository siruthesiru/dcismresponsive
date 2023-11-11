import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditProfile, GetAlumniProfile } from "../../services/alumni";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAlumniProfile = ({ profileData }) => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({

        skills: profileData.skills,

    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);

        const isEditSucceed = await EditProfile(dispatch, userData);

        if (isEditSucceed) {
            const profileData = await GetAlumniProfile(dispatch);
            setUserData({
                ...userData,
                picture: profileData.profileImage,
            });
        }
    };

    return (
        <form>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
                <div className="flex flex-col text-[12px] space-y-2">
                    <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
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
