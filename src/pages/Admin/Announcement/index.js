import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import { faqColumns } from "../../../components/constant/adminColumnHeaders";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAnnouncement, GetAllAnnouncements } from "../../../services/announcement";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, EditNote } from "@mui/icons-material";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";

const Announcements = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const announcements = useSelector((state) => state.announcementsSlice.announcements);

    const dispatch = useDispatch();
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);

    useEffect(() => {
        GetAllAnnouncements(dispatch)
    }, [dispatch])

    const handleDelete = (id) => {
        DeleteAnnouncement(dispatch, id)
            .then(() => {
                setDeleteOccurred(true);
            })
            .catch((error) => {
                console.error("Error deleting announcement:", error);
            });

        setOpenDeletePopup(false);
    };

    useEffect(() => {
        if (deleteOccurred) {
            GetAllAnnouncements(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const ActionColumn = {
        field: "action",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="10px">
                    <IconButton onClick={() => navigate(`/editAnnouncement/${params.row.id}`)}>

                        <EditNote
                            style={{
                                fontSize: "20px",
                                color: colors.yellowAccent[400],
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
                                color: colors.redAccent[400],
                            }}
                        />
                    </IconButton>
                </Box >
            );
        },
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Announcement Section" subtitle="List of announcements" />

                <ToastContainer position="top-right" autoClose={3000} />

                <Box display="flex" gap="15px">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.primary[500] }}
                        onClick={() => navigate("/addAnnouncement")}
                    >
                        Add Announcement
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                <DataGrid
                    sx={{
                        backgroundColor: colors.primary[400],
                        padding: "20px",
                        "& .MuiDataGrid-toolbarContainer": {
                            flexDirection: "row-reverse",
                            color: colors.greenAccent[100],
                        },
                        "& .MuiButtonBase-root": {
                            color: colors.greenAccent[100],
                        },
                    }}
                    rows={announcements}
                    getRowId={(row) => row.id}
                    columns={[...faqColumns, ActionColumn]}
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
            </Box>
            <ConfirmationDialog
                open={openDeletePopup}
                onClose={() => setOpenDeletePopup(false)}
                onConfirm={() => {
                    if (selectedItemId) {
                        handleDelete(selectedItemId);
                    }
                }}
            />

        </Box>
    );
};

export default Announcements;
