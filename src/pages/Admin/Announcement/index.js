import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Header from "../../../components/header";
import { announcementColumn } from "../../../components/constant/adminColumnHeaders";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAnnouncement, GetAllAnnouncements } from "../../../services/announcement";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DeleteOutline, EditNote } from "@mui/icons-material";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";
import DataTable from "../../../components/dataTable";

const Announcements = () => {
    const navigate = useNavigate();

    const announcements = useSelector((state) => state.announcementsSlice.announcements);
    const dispatch = useDispatch();
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);

    useEffect(() => {
        GetAllAnnouncements(dispatch)
    }, [dispatch])

    const uniqueAnnouncements = announcements.map((announcement, index) => {
        return { ...announcement, id: announcement.id || index + 1 };
    });

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
                        style={{ backgroundColor: "#221769" }}
                        onClick={() => navigate("/addAnnouncement")}
                    >
                        Add Announcement
                    </Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                {announcements.length === 0 ? (
                    <Typography>No Data Available</Typography>
                ) : (
                    <DataTable
                        columns={announcementColumn}
                        rows={uniqueAnnouncements}
                        lastColumn={ActionColumn}
                    />
                )}
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
