import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { verifyColumns } from "../../../components/constant/adminColumnHeaders";
import { applyVerificationCompanies } from "../../../data/mockAdminData";


const PendingJobs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const customLastColumn = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="1rem">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: colors.greenAccent[500],
                            color: colors.greenAccent[100],
                        }}
                    >
                        Post
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: colors.redAccent[500],
                            color: colors.greenAccent[100],
                        }}
                    >
                        Reject
                    </Button>
                </Box>
            );
        },
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header
                    title="Pending Job Posting"
                    subtitle="Companies wanted to post jobs"
                />
            </Box>
            <DataTable
                slug="companies"
                columns={verifyColumns}
                rows={applyVerificationCompanies}
                lastColumn={customLastColumn}
            />
        </Box>
    );
};

export default PendingJobs;
