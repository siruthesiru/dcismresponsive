import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import Header from "../../../components/header";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteAlumni, GetAlumni, VerifyAlumni } from "../../../services/admin_alumni";
import { DeleteOutline, ThumbUpAlt } from "@mui/icons-material";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";
import DataTable from "../../../components/dataTable";
import { alumniVerifyColumns } from "../../../components/constant/adminColumnHeaders";

const VerifyAlumniPage = () => {

    const unverifiedAlumni = useSelector((state) => state.alumniSlice.unverifiedAlumni);
    const dispatch = useDispatch();

    console.log(unverifiedAlumni);

    useEffect(() => {
        GetAlumni(dispatch)
    }, [dispatch])

    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);

    const uniqueAlumni = unverifiedAlumni.map((alumni, index) => {
        return { ...alumni, id: alumni.id || index + 1 };
    });


    useEffect(() => {
        if (deleteOccurred) {
            GetAlumni(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);


    const handleDelete = (id) => {
        DeleteAlumni(dispatch, id)
            .then(() => {
                setDeleteOccurred(true);
            })
            .catch((error) => {
                console.error("Error deleting alumni:", error);
            });

        setOpenDeletePopup(false);
    };


    const handleVerifyAlumni = async (id) => {
        try {
            const credentials = {
                id: id,
                isVerified: true
            };
            await VerifyAlumni(dispatch, credentials);
            await GetAlumni(dispatch);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const ActionColumn = {
        field: "action",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="10px">
                    <IconButton
                        onClick={() => handleVerifyAlumni(params.row.id)}
                        disabled={params.row.isVerified}
                    >
                        <ThumbUpAlt
                            style={{
                                fontSize: "20px",
                                color: params.row.isVerified ? "#aaa" : "#4cceac",
                            }}
                        />
                    </IconButton>

                    <IconButton onClick={() => {
                        setSelectedItemId(params.row.id);
                        setOpenDeletePopup(true);
                    }}>
                        <DeleteOutline
                            style={{
                                fontSize: "20px",
                                color: "#e2726e"
                            }}
                        />
                    </IconButton>
                </Box>
            );
        },
    };


    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Alumni Verification" subtitle="List of Unverified Alumni" />
                    <ToastContainer position="top-right" autoClose={3000} />
                </Box>
                <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                    {unverifiedAlumni.length === 0 ? (
                        <Typography>No Data Available</Typography>
                    ) : (
                        <DataTable
                            columns={alumniVerifyColumns}
                            rows={uniqueAlumni}
                            lastColumn={ActionColumn}
                        />
                    )}
                </Box>

            </Box>

            <ConfirmationDialog open={openDeletePopup} onClose={handleDelete} onConfirm={() => {
                if (selectedItemId) {
                    handleDelete(selectedItemId);
                }
            }} />
        </>

    );
};

export default VerifyAlumniPage;
