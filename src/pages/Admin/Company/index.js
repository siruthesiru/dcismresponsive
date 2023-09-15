import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { companyColumn } from "../../../components/constant/adminColumnHeaders";
import { mockCompanies } from "../../../data/mockAdminData";

const Companies = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Companies" subtitle="List of Affiliated Companies" />
            </Box>
            <DataTable
                slug="companies"
                columns={companyColumn}
                rows={mockCompanies}
            />
        </Box>
    );
};

export default Companies;
