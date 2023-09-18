import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { AlumniRows } from "../../../data/mockAdminData";
import { faqColumns } from "../../../components/constant/adminColumnHeaders";
import PopUp from "../../../components/popup";
import FAQForm from "./FAQForm";



const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openPopup, setOpenup] = useState(false);

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="FAQ Section" subtitle="List of FAQ" />
                    <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: colors.greenAccent[500] }}
                            onClick={() => setOpenup(true)}

                        >
                            Add FAQ
                        </Button>
                    </Box>
                </Box>
                <DataTable slug="faq" columns={faqColumns} rows={AlumniRows} />
            </Box>
            <PopUp title="FAQ FORM" openPopup={openPopup} setOpenup={setOpenup}>
                <FAQForm />
            </PopUp>
        </>
    );
};

export default FAQ;
