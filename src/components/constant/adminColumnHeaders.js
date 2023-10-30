import React from "react";
import placeholder from "../../assets/placeholder.webp";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
// import FileViewer from "../fileViewer";

export const companyColumn = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "img",
        headerName: "avatar",
        width: 100,
        renderCell: (params) => {
            const imgSrc = params.row.img || placeholder;
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
        field: "companyName",
        type: "string",
        headerName: "Company name",
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
        field: "phone",
        headerName: "Phone",
        type: "string",
        width: 150,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        type: "string",
        width: 150,
    },
    {
        field: "verified",
        headerName: "Verified",
        width: 150,
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
    {
        field: "active",
        headerName: "Status",
        width: 150,
        type: "boolean",
        renderCell: (params) => {
            const isActive = params.value;
            const style = {
                color: isActive ? 'green' : 'red',
            };

            return (
                <div style={style}>
                    {isActive ? "Active" : "Inactive"}
                </div>
            )
        }
    }
];

export const alumniColumns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "idNum", headerName: "ID Number", width: 130 },

    {
        field: "img",
        headerName: "Profile",
        width: 100,
        renderCell: (params) => {
            const imgSrc = params.row.img || placeholder;

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
        field: "email",
        headerName: "Email",
        width: 150,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 130,
    },
    {
        field: "course",
        headerName: "Program",
        width: 150,
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
    // {
    //     //not yet included in the table
    //     field: "active",
    //     headerName: "Status",
    //     width: 150,
    //     type: "boolean",
    //     renderCell: (params) => {
    //         const isActive = params.value;
    //         const style = {
    //             color: isActive ? 'green' : 'red',
    //         };

    //         return (
    //             <div style={style}>
    //                 {isActive ? "Active" : "Inactive"}
    //             </div>
    //         )
    //     }
    // }
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
        field: 'file',
        headerName: 'File',
        flex: 1,
        renderCell: (params) => {
            // const file = params.row.file;

            // if (file) {
            //     return (
            //         <FileViewer fileData={file} />
            //     );
            // }
        },
    },
    {
        field: "posted_Date",
        headerName: "Posted Date",
        flex: 1,
    }
];


export const verifyColumns = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        type: "string",
        headerName: "Company Name",
        width: 200,
    },
    {
        field: "addresss",
        type: "string",
        headerName: "Address",
        width: 200,
    },
    {
        field: "email",
        headerName: "Email ",
        type: "string",
        width: 200,
    },
    {
        field: "mobileNumber",
        headerName: "Mobile Number ",
        type: "string",
        width: 200,
    },
    {
        //not yet included in the table
        field: "active",
        headerName: "Status",
        width: 150,
        type: "boolean",
        renderCell: (params) => {
            const isActive = params.value;
            const style = {
                color: isActive ? 'green' : 'red',
            };

            return (
                <div style={style}>
                    {isActive ? "Active" : "Inactive"}
                </div>
            )
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