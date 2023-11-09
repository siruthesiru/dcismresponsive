import React, { useEffect, useState } from "react";
import { Button, CardMedia } from "@mui/material";
import placeholder from "../../assets/placeholder.webp";
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from "react-router-dom";
import { GetCompanyProfile } from "../../services/company";
import { useDispatch } from "react-redux";

const CompanyProfileCard = () => {
    const [userData, setUserData] = useState(null);
    const [numPages, setNumPages] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await GetCompanyProfile(dispatch);
            setUserData(profileData);
        };

        fetchProfileData();
    }, [dispatch]);

    const handleDownload = () => {
        const linkSource = `data:application/pdf;base64,${userData.moa}`;
        const downloadLink = document.createElement('a');
        const fileName = 'moa.pdf';

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    return (
        <div className="flex flex-col bg-white border rounded-lg p-4 mx-4 sm:mx-0 space-y-2">
            <div className="flex flex-col mx-auto justify-center items-center text-center">
                <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, borderRadius: "50%", cursor: "pointer" }}
                    image={userData?.profileImage ? `data:image/jpeg;base64,${userData.profileImage}` : placeholder}
                    alt="Profile picture"
                />
            </div>

            <div className="flex flex-col text-[12px] space-y-2">
                <div className="flex flex-col bg-white border border-slate-200 p-4 mb-2 rounded-lg">
                    <p className="font-bold ">Personal Information</p>
                    {/* Display other profile information */}
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">First Name: </label>
                        <p className="font-bold ">
                            {userData?.firstName ? userData.firstName : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Last Name: </label>
                        <p className="font-bold ">
                            {userData?.lastName ? userData.lastName : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Middle Name: </label>
                        <p className="font-bold ">
                            {userData?.middleName ? userData.middleName : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Email Address: </label>
                        <p className="font-bold ">{userData?.email}</p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Contact Number: </label>
                        <p className="font-bold ">
                            {userData?.mobileNumber ? userData.mobileNumber : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Company Name: </label>
                        <p className="font-bold ">
                            {userData?.companyName ? userData.companyName : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Company Address: </label>
                        <p className="font-bold ">
                            {userData?.companyAddress ? userData.companyAddress : "Not Indicated"}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-[12px] w-[100px]">Website Link: </label>
                        <p className="font-bold ">
                            {userData?.websiteLink ? userData.websiteLink : "Not Indicated"}
                        </p>
                    </div>
                    {userData?.moa ? (
                        <div flex items-center>
                            <label className="text-[12px] w-[100px]">Uploaded Moa: </label>
                            <Document file={{ data: atob(userData?.moa) }} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={1} />
                            </Document>
                            <p>Page 1 of {numPages}</p>
                            <button className="border-[1px] rounded-3xl p-2 mt-2 inline-block mx-1 bg-slate-100" onClick={handleDownload}>
                                Download MOA
                            </button>
                        </div>
                    ) : (
                        <div>
                            <span style={{ color: "gray" }}>No MOA Submitted</span>
                        </div>
                    )}
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
                                backgroundColor: "yellow",
                                color: "black",
                            }}
                            onClick={() => navigate("/company/edit-profile")}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfileCard;
