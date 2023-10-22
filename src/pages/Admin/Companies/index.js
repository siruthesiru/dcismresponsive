import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../../components/header";
import { companyColumn } from "../../../components/constant/adminColumnHeaders";
import { useDispatch, useSelector } from "react-redux";
import { GetCompanies } from "../../../services/admin_company";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";

const Companies = () => {
    const companies = useSelector((state) => state.companiesSlice.companies);
    const dispatch = useDispatch();
    useEffect(() => {
        GetCompanies(dispatch)
    }, [dispatch])

    return (
        <>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Alumni" subtitle="List of Alumni" />
                    <ToastContainer position="top-right" autoClose={3000} />
                </Box>
                <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                    {companies.length === 0 ? (
                        <Typography>No Data Available</Typography>
                    ) : (
                        <DataGrid
                            sx={{
                                padding: "20px",
                                "& .MuiDataGrid-toolbarContainer": {
                                    flexDirection: "row-reverse",
                                    color: "#221769",
                                },
                                "& .MuiButtonBase-root": {
                                    color: "#221769",
                                },
                            }}
                            rows={companies}
                            getRowId={(row) => row.id}
                            columns={[...companyColumn]}
                            style={{ width: "100%" }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    )}
                </Box>

            </Box>
        </>

    );
};

export default Companies;
