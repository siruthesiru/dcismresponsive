import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { AlumniRows } from "../../../data/mockAdminData";
import { faqColumns } from "../../../components/constant/adminColumnHeaders";



const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="FAQ Section" subtitle="List of FAQ" />
                <Box display="flex" gap="15px">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.greenAccent[500] }}
                    >
                        Add FAQ
                    </Button>
                </Box>
            </Box>
            <DataTable slug="faq" columns={faqColumns} rows={AlumniRows} />
        </Box>
    );
};

export default FAQ;
