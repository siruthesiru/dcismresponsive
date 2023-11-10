// import { Button, CardMedia, MenuItem, Select, Typography } from "@mui/material";
// import React, { useState } from "react";
// import placeholder from "../../assets/placeholder.webp"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { EditProfile, GetAlumniProfile } from "../../services/alumni";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Document, Page, pdfjs } from 'react-pdf';

// const programs = [
//     { description: 'Bachelor of Science in Computer Science', code: 'BSCS' },
//     { description: 'Bachelor of Science in Information Science', code: 'BSIS' },
//     { description: 'Bachelor of Science in Information Technology', code: 'BSIT' },
//     { description: 'Bachelor of Science in Mathematics', code: 'BSMath' },
//     { description: 'Bachelor of Science in Information Communication Technology', code: 'BSICT' },
//     { description: 'Bachelor of Science in Library Science', code: 'BSLS' },
//     { description: 'Bachelor of Science in Applied Mathematics', code: 'BSAMath' },
//     { description: 'Master of Science in Mathematics', code: 'MSMath' },
//     { description: 'Doctor of Computer Science', code: 'DCS' },
//     { description: 'Doctor of Information Science', code: 'DIS' },
//     { description: 'Doctor of Information Technology', code: 'DIT' },
//     { description: 'Doctor of Mathematics', code: 'DMath' },
//     { description: 'Doctor of Information Communication Technology', code: 'DICT' },
//     { description: 'Doctor of Library Science', code: 'DLS' },
//     { description: 'Doctor of Applied Mathematics', code: 'DAMath' },
// ];


// const AlumniProfileCard = () => {
//     const profileData = useSelector(state => state.alumniUserSlice.alumniProfile);
//     const [userData, setUserData] = useState({
//         // ...profileData,
//         email: profileData.email,
//         firstName: profileData.firstName,
//         lastName: profileData.lastName,
//         middleName: profileData.middleName,
//         birthday: profileData.birthday,
//         gender: profileData.gender,
//         alumniAddress: profileData.alumniAddress,
//         idNum: profileData.idNum,
//         companyAddress: profileData.companyAddress,
//         // programCode: profileData.courses.programCode,
//         // programDescription: profileData.courses.programDescription,
//         // educationLevel: profileData.courses.educationalLevel,
//         companyName: profileData.companyName,
//         skills: profileData.skills,
//         resume: profileData.resume,
//         picture: profileData.profileImage
//     });
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
//     const dispatch = useDispatch();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevUserData) => ({
//             ...prevUserData,
//             courses: {
//                 ...prevUserData.courses,
//                 [name]: value,
//             },
//         }));
//     };
//     const handleImageInputChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const imageData = event.target.result;
//                 setCurrentlySelectedImage(imageData);
//                 setUserData((prevUserData) => ({
//                     ...prevUserData,
//                     picture: file,
//                 }));
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const toggleEditing = () => {
//         setIsEditing(!isEditing);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(userData);
//         const isEditSucceed = await EditProfile(dispatch, userData);

//         if (isEditSucceed) {
//             const profileData = await GetAlumniProfile(dispatch);
//             setUserData(profileData);
//             setIsEditing(false);
//         }
//     };

//     const handleSkillChange = (e, index) => {
//         const { value } = e.target;
//         const updatedSkills = [...userData.skills];
//         updatedSkills[index].skill = value;
//         setUserData({ ...userData, skills: updatedSkills });
//     };

//     const removeSkill = (index) => {
//         const updatedSkills = [...userData.skills];
//         updatedSkills.splice(index, 1);
//         setUserData({ ...userData, skills: updatedSkills });
//     };

//     const addSkill = () => {
//         setUserData((prevUserData) => ({
//             ...prevUserData,
//             skills: [...prevUserData.skills, { skill: '' }],
//         }));
//     };


//     const navigate = useNavigate();

//     const [numPages, setNumPages] = useState(null);
//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     const handleDownload = () => {
//         const linkSource = `data:application/pdf;base64,${userData.moa}`;
//         const downloadLink = document.createElement('a');
//         const fileName = 'moa.pdf';

//         downloadLink.href = linkSource;
//         downloadLink.download = fileName;
//         downloadLink.click();
//     };

//     pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//         'pdfjs-dist/build/pdf.worker.min.js',
//         import.meta.url,
//     ).toString();

//     return (
//         <form>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
//                 <div className="flex flex-col mx-auto justify-center items-center text-center">

//                     {isEditing ? (
//                         <>
//                             <label htmlFor="fileInput">
//                                 <input
//                                     type="file"
//                                     id="fileInput"
//                                     accept="image/*"
//                                     style={{ display: "none" }}
//                                     onChange={handleImageInputChange}
//                                 />
//                                 <img
//                                     src={currentlySelectedImage || `data:image/jpeg;base64,${userData.picture}` || placeholder}
//                                     alt="User Profile"
//                                     style={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
//                                 />

//                             </label>
//                             <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
//                                 Click the placeholder for adding image.
//                             </Typography>
//                         </>
//                     ) : (
//                         <>
//                             <CardMedia
//                                 component="img"
//                                 sx={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
//                                 src={userData?.picture ? `data:image/jpeg;base64,${userData.picture}` : placeholder}
//                                 alt="Profile picture"
//                             />
//                             <h1 className="font-bold py-2 capitalize">{userData?.firstName} {userData?.lastName}</h1>
//                         </>
//                     )}
//                 </div>

//                 <div className="flex flex-col text-[12px] space-y-2">
//                     <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
//                         <p className="font-bold ">Personal Information</p>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">First Name: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     placeholder='Input your First Name'
//                                     value={userData?.firstName}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.firstName}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Last Name: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     placeholder='Input your Middle Name'
//                                     value={userData?.lastName}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.lastName}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Middle Name: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="middleName"
//                                     placeholder='Input your Middle Name'
//                                     value={userData?.middleName}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.middleName}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Gender: </label>
//                             {isEditing ? (
//                                 <div>
//                                     <input
//                                         type="radio"
//                                         id="female"
//                                         name="gender"
//                                         value="Female"
//                                         checked={userData?.gender === "Female"}
//                                         onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
//                                     />
//                                     <label htmlFor="female">Female</label>

//                                     <input
//                                         type="radio"
//                                         id="male"
//                                         name="gender"
//                                         value="Male"
//                                         checked={userData?.gender === "Male"}
//                                         onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
//                                     />
//                                     <label htmlFor="male">Male</label>
//                                 </div>
//                             ) : (
//                                 <p className="font-bold"> {userData?.gender}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center my-2">
//                             <label className="text-[12px] w-[90px]">Date of Birth: </label>

//                             {isEditing ? (
//                                 <input
//                                     type="date"
//                                     value={userData?.birthday}
//                                     onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-5 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.birthday ? userData.birthday.toString() : 'N/A'}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Address: </label>

//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     placeholder='Input your Current Address'
//                                     value={userData?.alumniAddress}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.alumniAddress}</p>
//                             )}
//                         </div>


//                         <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
//                         <p className="font-bold ">Account Information</p>

//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">USC ID: </label>
//                             <p className="font-bold "> {userData?.idNum}</p>
//                         </div>

//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Email Address: </label>
//                             <p className="font-bold "> {userData?.email}</p>
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Contact Number: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     name="mobileNumber"
//                                     placeholder='Input your contact Number'
//                                     value={userData?.mobileNumber}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.mobileNumber}</p>
//                             )}
//                         </div>
//                         <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
//                         <p className="font-bold ">Academic Information</p>
//                         {/* <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Course Program: </label>
//                             {isEditing ? (
//                                 <Select
//                                     id="program"
//                                     value={userData?.programDescription || ''}
//                                     onChange={(e) => {
//                                         const selectedProgramDescription = e.target.value;
//                                         const selectedProgram = programs.find(program => program.description === selectedProgramDescription);
//                                         if (selectedProgram) {
//                                             let educationalLevel = "Bachelor";
//                                             if (selectedProgramDescription.startsWith("Master")) {
//                                                 educationalLevel = "Master";
//                                             } else if (selectedProgramDescription.startsWith("Doctor")) {
//                                                 educationalLevel = "Doctor";
//                                             }
//                                             setUserData({
//                                                 ...userData,
//                                                 programDescription: selectedProgram.description,
//                                                 programCode: selectedProgram.code,
//                                                 educationLevel: educationalLevel,
//                                             });
//                                         }
//                                     }}
//                                     variant="outlined"
//                                     fullWidth
//                                     required
//                                 >
//                                     {programs.map((program) => (
//                                         <MenuItem key={program.description} value={program.description}>
//                                             {program.description}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             ) : (
//                                 <p className="font-bold">{userData?.courses.programDescription}</p>
//                             )}
//                         </div> */}
//                         {/* <div className="flex items-center my-2">
//                             <label className="text-[12px] w-[90px]">Year Graduated: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     placeholder='What class batch you graduated'
//                                     name="syGraduated"
//                                     value={userData?.syGraduated}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.syGraduated}</p>
//                             )}
//                         </div>

//                         <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
//                         <p className="font-bold ">Work Information</p>

//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Employment Status: </label>
//                             {isEditing ? (
//                                 <div>
//                                     <input
//                                         type="radio"
//                                         id="employed"
//                                         name="employmentStatus"
//                                         value="true"
//                                         checked={userData?.isEmployed === true}
//                                         onChange={(e) => setUserData({ ...userData, isEmployed: e.target.value === "true" })}
//                                     />
//                                     <label htmlFor="employed">Employed</label>

//                                     <input
//                                         type="radio"
//                                         id="unemployed"
//                                         name="employmentStatus"
//                                         value="false"
//                                         checked={userData?.isEmployed === false}
//                                         onChange={(e) => setUserData({ ...userData, isEmployed: e.target.value === "true" })}
//                                     />
//                                     <label htmlFor="unemployed">Unemployed</label>
//                                 </div>
//                             ) : (
//                                 <p className="font-bold">{userData?.isEmployed === true ? "Employed" : "Unemployed"}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Company Name: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     placeholder='Type the company name'
//                                     name="companyName"
//                                     value={userData?.companyName}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.companyName}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Company Address: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     placeholder='Type the company address'
//                                     name="companyAddress"
//                                     value={userData?.companyAddress}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.companyAddress}</p>
//                             )}
//                         </div>
//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Occupation: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="text"
//                                     placeholder='Type your position in the company'
//                                     name="occupation"
//                                     value={userData?.occupation}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.occupation}</p>
//                             )}
//                         </div>

//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Years of Experience: </label>
//                             {isEditing ? (
//                                 <input
//                                     type="number"
//                                     placeholder='Input your years of experience'
//                                     name="years"
//                                     value={userData?.years}
//                                     onChange={handleInputChange}
//                                     variant='outlined'
//                                     className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                 />
//                             ) : (
//                                 <p className="font-bold "> {userData?.years}</p>
//                             )}
//                         </div> */}
//                         <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
//                         <p className="font-bold ">Skills</p>

//                         <div className="flex items-center">
//                             <label className="text-[12px] w-[100px]">Add Skills: </label>
//                             {isEditing ? (
//                                 <div className="flex flex-col my-2">
//                                     {userData.skills.map((skillObj, index) => (
//                                         <div key={index} className="flex items-center my-2">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter a skill"
//                                                 value={skillObj.skill}
//                                                 onChange={(e) => handleSkillChange(e, index)}
//                                                 className="w-[100%] h-[30px] bg-white border border-slate-200 p-4 mb-2 rounded-md"
//                                             />
//                                             {index > 0 && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => removeSkill(index)}
//                                                     className="text-red-600 ml-2"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                     <button
//                                         type="button"
//                                         onClick={addSkill}
//                                         className="text-blue-600 mt-2"
//                                     >
//                                         Add Skill
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     {userData?.skills?.map((skill, index) => (
//                                         <div key={index} className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100">
//                                             <div>{skill}</div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex mx-auto border border-solid border-slate-200 h-px w-full my-2" />
//                         <div className="flex items-center">
//                             {isEditing ? (
//                                 <>
//                                     <label className="flex gap-2">{userData?.resume ? "Change Resume File" : "Add Resume"}</label>
//                                     <input
//                                         type="file"
//                                         accept=".pdf"
//                                         onChange={(e) => setUserData({ ...userData, resume: e.target.files[0] })}
//                                     />
//                                 </>
//                             ) : userData?.resume ? (
//                                 <div style={{ flex: 1 }}>
//                                     <label className="text-[12px] w-[100px]">Uploaded Resune: </label>
//                                     <Document file={{ data: atob(userData?.resume) }} onLoadSuccess={onDocumentLoadSuccess}>
//                                         <Page pageNumber={1} />
//                                     </Document>
//                                     <p>Page 1 of {numPages}</p>
//                                     <button className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100" onClick={handleDownload}>
//                                         Download Resume
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <span style={{ color: "gray" }}>No Resume Uploaded</span>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex items-center px-6 mt-6">
//                             <div className='flex gap-10 flex-1 justify-end'>
//                                 {isEditing ? (
//                                     <>
//                                         <Button
//                                             type="button"
//                                             variant="contained"
//                                             style={{
//                                                 display: "block",
//                                                 padding: "10px",
//                                                 backgroundColor: "#3da58a",
//                                                 color: "#FFFFFF",
//                                             }}
//                                             onClick={handleSubmit}
//                                         >
//                                             Save Changes
//                                         </Button>
//                                         <Button
//                                             type="button"
//                                             variant="contained"
//                                             style={{
//                                                 display: "block",
//                                                 padding: "10px",
//                                                 backgroundColor: "#666666",
//                                                 color: "#FFFFFF",
//                                             }}
//                                             onClick={() => navigate(-1)}
//                                         >
//                                             Back
//                                         </Button>
//                                     </>
//                                 ) : (
//                                     <Button
//                                         type="button"
//                                         variant="contained"
//                                         onClick={toggleEditing}
//                                         style={{
//                                             display: "block",
//                                             width: "100%",
//                                             padding: "10px",
//                                             marginTop: "2rem",
//                                             backgroundColor: "yellow",
//                                             color: "black",
//                                         }}
//                                     >
//                                         Edit Profile
//                                     </Button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default AlumniProfileCard;
