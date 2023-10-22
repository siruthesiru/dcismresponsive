import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../../components/header";
import { alumniColumns } from "../../../components/constant/adminColumnHeaders";
import PopUp from "../../../components/popup";
import AlumniForm from "../../../components/forms/AlumniForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, EditNote, ThumbUpAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAlumni, GetAllAlumni, VerifyAlumni } from "../../../services/admin_alumni";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alumni = () => {
    const alumni = useSelector((state) => state.alumniSlice.alumni);
    const dispatch = useDispatch();

    const [openPopup, setOpenup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);


    useEffect(() => {
        GetAllAlumni(dispatch)
    }, [dispatch])

    const uniqueAlumni = alumni.map((alumnus, index) => {
        return { ...alumnus, id: alumnus.id || index + 1 };
    });

    useEffect(() => {
        if (deleteOccurred) {
            GetAllAlumni(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const handleAlumni = () => {
        setOpenup(false);
        setOpenEditPopup(false);
    };

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

    useEffect(() => {
        if (deleteOccurred) {
            GetAllAlumni(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const handleVerifyAlumni = async (id) => {
        try {
            const credentials = {
                id: id,
                isAccess: true
            };
            await VerifyAlumni(dispatch, credentials);
            GetAllAlumni(dispatch);
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
                        disabled={params.row.isAccess}
                    >
                        <ThumbUpAlt
                            style={{
                                fontSize: "20px",
                                color: params.row.isAccess ? "#aaa" : "#4cceac",
                            }}
                        />
                    </IconButton>

                    <IconButton onClick={() => {
                        setSelectedItemId(params.row.id);
                        setOpenEditPopup(true);
                    }}>
                        <EditNote
                            style={{
                                fontSize: "20px",
                                color: "#ffef62",
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
                    <Header title="Alumni" subtitle="List of Alumni" />
                    <ToastContainer position="top-right" autoClose={3000} />

                    <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#221769" }}
                            onClick={() => setOpenup(true)}
                        >
                            Add User
                        </Button>
                        <input
                            type="file"
                            accept=".csv"
                            style={{ display: "none" }}
                            id="csv-upload-input"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    console.log(`Uploaded CSV file: ${file.name}`);
                                }
                            }}
                        />
                        <label htmlFor="csv-upload-input">
                            <Button
                                variant="contained"
                                size="medium"
                                style={{ backgroundColor: "#4cceac" }}
                                component="span"
                            >
                                Upload CSV
                            </Button>
                        </label>
                    </Box>
                </Box>
                <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                    {alumni.length === 0 ? (
                        <Typography>No Data Available</Typography>
                    ) : (
                        <DataGrid
                            sx={{
                                padding: "20px",
                                "& .MuiDataGrid-toolbarContainer": {
                                    flexDirection: "row-reverse",
                                    color: "#221769",
                                },
                                "& .MuiButtonBase-root": {
                                    color: "#221769",
                                },
                            }}
                            rows={uniqueAlumni}
                            getRowId={(row) => row.id}
                            columns={[...alumniColumns, ActionColumn]}
                            style={{ width: "100%" }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    )}
                </Box>

            </Box>
            <PopUp
                title="ALUMNI FORM"
                openPopup={openPopup}
                setOpenup={setOpenup}
            >
                <AlumniForm onSubmit={handleAlumni} />
            </PopUp>
            <PopUp
                title="EDIT ALUMNI FORM"
                openPopup={openEditPopup}
                setOpenup={setOpenEditPopup}
            >
                <AlumniForm onSubmit={handleAlumni} />
            </PopUp>
            <ConfirmationDialog open={openDeletePopup} onClose={handleDelete} onConfirm={() => {
                if (selectedItemId) {
                    handleDelete(selectedItemId);
                }
            }} />
        </>

    );
};

export default Alumni;
