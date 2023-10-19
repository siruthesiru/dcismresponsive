import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { alumniColumns } from "../../../components/constant/adminColumnHeaders";
import { AlumniRows } from "../../../data/mockAdminData";
import PopUp from "../../../components/popup";
import AlumniForm from "../../../components/forms/AlumniForm";

const Alumni = () => {
    const [openPopup, setOpenup] = useState(false);


    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Alumni" subtitle="List of Alumni" />
                    <Box display="flex" gap="15px">
                        <Button
                            variant="contained"
                            size="medium"
                            style={{ backgroundColor: "#221769" }}
                            onClick={() => setOpenup(true)}
                        >
                            Add User
                        </Button>
                        <input
                            type="file"
                            accept=".csv"
                            style={{ display: "none" }}
                            id="csv-upload-input"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    console.log(`Uploaded CSV file: ${file.name}`);
                                }
                            }}
                        />
                        <label htmlFor="csv-upload-input">
                            <Button
                                variant="contained"
                                size="medium"
                                style={{ backgroundColor: "#4cceac" }}
                                component="span"
                            >
                                Upload CSV
                            </Button>
                        </label>
                    </Box>
                </Box>
                <DataTable slug="alumni" columns={alumniColumns} rows={AlumniRows} />
            </Box>
            <PopUp
                title="ALUMNI FORM"
                openPopup={openPopup}
                setOpenup={setOpenup}

            >
                <AlumniForm />
            </PopUp>
        </>

    );
};

export default Alumni;
