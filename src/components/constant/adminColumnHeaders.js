import React from "react";
import placeholder from "../../assets/placeholder.webp";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

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
                <di style={style}>
                    {isVerified ? <CheckIcon /> : <CloseIcon />}
                </di>
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
                <di style={style}>
                    {isActive ? "Active" : "Inactive"}
                </di>
            )
        }
    }
];

export const alumniColumns = [
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
        field: "firstName",
        type: "string",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        type: "string",
        headerName: "Last name",
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
                <di style={style}>
                    {isVerified ? <CheckIcon /> : <CloseIcon />}
                </di>
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
                <di style={style}>
                    {isActive ? "Active" : "Inactive"}
                </di>
            )
        }
    }
];


export const faqColumns = [
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
        field: "firstName",
        type: "string",
        headerName: "First name",
        width: 150,
    },
    {
        field: "lastName",
        type: "string",
        headerName: "Last name",
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
        width: 200,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        type: "string",
        width: 200,
    },
];


export const verifyColumns = [
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
        field: "FullName",
        type: "string",
        headerName: "Full Name",
        width: 200,
        valueGetter: (params) =>
            `${params.row["First Name"]} ${params.row["Last Name"]}`,
    },
    {
        field: "company",
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
        field: "moa_file",
        headerName: "MOA File_Upload",
        type: "string",
        width: 100,
    },
    {
        field: "email",
        headerName: "Email ",
        type: "string",
        width: 200,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        type: "string",
        width: 200,
    },
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