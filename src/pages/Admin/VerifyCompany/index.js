import React from "react";
import { Box, Button } from "@mui/material";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { verifyColumns } from "../../../components/constant/adminColumnHeaders";
import { applyVerificationCompanies } from "../../../data/mockAdminData";

const VerifyCompany = () => {

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
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: "#db4f4a",
                            color: "#dbf5ee",
                        }}
                    >
                        Decline
                    </Button>
                </Box>
            );
        },
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header
                    title="Verification List"
                    subtitle="Companies applying for partnership"
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

export default VerifyCompany;
