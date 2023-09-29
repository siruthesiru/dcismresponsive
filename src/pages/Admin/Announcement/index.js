import React, { useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { faqColumns } from "../../../components/constant/adminColumnHeaders";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllAnnouncements } from "../../../services/announcement";

const Announcements = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const announcements = useSelector((state) => state.announcementsSlice.announcements);
    const dispatch = useDispatch();

    useEffect(() => {
        GetAllAnnouncements(dispatch)
    }, [dispatch])

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Announcement Section" subtitle="List of announcements" />
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
            <DataTable slug="Announcement" columns={faqColumns} rows={announcements} />
        </Box>
    );
};

export default Announcements;
