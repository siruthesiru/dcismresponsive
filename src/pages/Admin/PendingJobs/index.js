import React from "react";
import { Box, Button } from "@mui/material";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { verifyColumns } from "../../../components/constant/adminColumnHeaders";
import { applyVerificationCompanies } from "../../../data/mockAdminData";


const PendingJobs = () => {
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
                            backgroundColor: "#4cceac",
                            color: "#dbf5ee",
                        }}
                    >
                        Post
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: "#db4f4a",
                            color: "#dbf5ee",
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
