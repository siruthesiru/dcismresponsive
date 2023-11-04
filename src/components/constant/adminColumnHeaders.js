import React from "react";
import placeholder from "../../assets/placeholder.webp";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
// import FileViewer from "../fileViewer";

export const companyColumn = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "profileImage",
        headerName: "avatar",
        width: 100,
        renderCell: (params) => {
            const imgSrc = params.row.profileImage ? `data:image/jpeg;base64,${params.row.profileImage}` : placeholder;
            return (
                <img
                    src={imgSrc}
                    alt=""
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            );
        },
    },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
    },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
    },
    {
        field: "name",
        type: "string",
        headerName: "Company Name",
        headerName: "Company Name",
        width: 150,
    },
    {
        field: "companyAddress",
        type: "string",
        headerName: "Company Address",
        width: 150,
    },
    {
        field: "email",
        type: "string",
        headerName: "Email",
        width: 200,
    },
    {
        field: "mobileNumber",
        headerName: "Contact Number",
        type: "string",
        width: 150,
    },
];

export const alumniColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "idNum", headerName: "ID Number", width: 130 },

    {
        field: "img",
        headerName: "Profile",
        width: 100,
        renderCell: (params) => {
            const imgSrc = params.row.profileImage ? `data:image/jpeg;base64,${params.row.profileImage}` : placeholder;
            return (
                <img
                    src={imgSrc}
                    alt=""
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            );
        },
    },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
    },
    {
        field: "alumniAddress",
        headerName: "Address",
        width: 150,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
    },
    {
        field: "mobileNumber",
        headerName: "Phone",
        width: 130,
    },
    {
        field: "courses",
        headerName: "Program",
        width: 150,
        renderCell: (params) => {
            const program = params.row.courses ? params.row.courses.program : "No Program Indicated";
            return (
                <div>
                    {program}
                </div>
            );
        },
    },
    {
        field: "syGraduated",
        headerName: "Batch",
        width: 70,
    },
    {
        field: "isVerified",
        headerName: "Verified",
        width: 130,
        type: "boolean",
        renderCell: (params) => {
            const isVerified = params.value;
            const style = {
                color: isVerified ? 'green' : 'red',
            };

            return (
                <div style={style}>
                    {isVerified ? <CheckIcon /> : <CloseIcon />}
                </div>
            )
        }
    },
];


export const announcementColumn = [
    {
        field: "id",
        headerName: "ID",
        width: 80,
    },
    {
        field: "title",
        headerName: "Title",
        flex: 1,
    },
    {
        field: "description",
        headerName: "Content",
        flex: 2,
    },
    {
        field: "audience",
        headerName: "Audience",
        width: 100,
    },

    {
        field: "posted_Date",
        headerName: "Posted Date",
        flex: 1,
        renderCell: (params) => {
            const postedDate = new Date(params.value);
            const formattedDate = postedDate.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            return formattedDate;
        },
    },
];


export const verifyColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "companyName",
        headerName: "Company Name",
        width: 200,
    },
    {
        field: "companyAddress",
        headerName: "Address",
        width: 200,
    },
    {
        field: "email",
        headerName: "Email ",
        width: 200,
    },
    {
        field: "mobileNumber",
        headerName: "Mobile Number ",
        width: 200,
    },
];

export const verifyJobColumn = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "companyName",
        headerName: "Company Name",
        width: 200,
    },
    {
        field: "email",
        headerName: "Email ",
        width: 200,
    },
    {
        field: "description",
        headerName: "Description ",
        width: 200,
    },
    {
        field: "location",
        headerName: "Location ",
        width: 200,
    },
    {
        field: "slots",
        headerName: "Slots ",
        width: 200,
    },
    {
        field: "expiration_Date",
        headerName: "End of Application ",
        width: 200,
    },
    {
        //not yet included in the table
        field: "moa",
        headerName: "Uploaded Moa",
        width: 300,
        renderCell: (params) => {
            // const file = params.row.file;

            // if (file) {
            //     return (
            //         <FileViewer fileData={file} />
            //     );
            // }
        }
    }
];



export const ViewCandidatesColumns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'firstName', label: 'First Name', minWidth: 170 },
    { id: 'lastName', label: 'Last Name', minWidth: 170 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 250,
        align: 'left',
    },
    {
        id: 'phone',
        label: 'Phone Number',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'createdAt',
        label: 'CreatedAt',
        minWidth: 250,
        align: 'left',
    },
];