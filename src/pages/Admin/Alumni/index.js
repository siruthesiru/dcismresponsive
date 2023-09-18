import React, { useState } from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { alumniColumns } from "../../../components/constant/adminColumnHeaders";
import { AlumniRows } from "../../../data/mockAdminData";


const Alumni = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);


    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Alumni" subtitle="List of Alumni" />
                <Box display="flex" gap="15px">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.greenAccent[500] }}
                        onClick={() => setOpen(true)}
                    >
                        Add User
                    </Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.primary[500] }}
                    >
                        Upload CSV
                    </Button>
                </Box>
            </Box>
            <DataTable slug="alumni" columns={alumniColumns} rows={AlumniRows} />
        </Box>
    );
};

export default Alumni;
