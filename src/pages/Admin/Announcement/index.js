import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { AlumniRows } from "../../../data/mockAdminData";
import { faqColumns } from "../../../components/constant/adminColumnHeaders";

const Announcements = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Announcement Section" subtitle="List of announcements" />
                <Box display="flex" gap="15px">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.greenAccent[500] }}
                    >
                        Add Announcement
                    </Button>
                </Box>
            </Box>
            <DataTable slug="announcements" columns={faqColumns} rows={AlumniRows} />
        </Box>
    );
};

export default Announcements;
