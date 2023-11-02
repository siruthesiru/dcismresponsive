import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../../components/header";
import DataTable from "../../../components/dataTable";
import { verifyColumns } from "../../../components/constant/adminColumnHeaders";
import { useDispatch, useSelector } from "react-redux";
import { GetUnverifiedCompanies, RejectCompany, Verify_Company } from "../../../services/admin_company";
import ConfirmationDialog from "../../../components/popup/confirmationDialog";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyCompany = () => {

    const companies = useSelector((state) => state.companiesSlice.unverified_companies);
    const dispatch = useDispatch();

    console.log(companies);

    useEffect(() => {
        GetUnverifiedCompanies(dispatch)
    }, [dispatch])

    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [deleteOccurred, setDeleteOccurred] = useState(false);

    const uniqueCompanies = companies.map((company, index) => {
        return { ...company, id: company.id || index + 1 };
    });

    const handleDelete = (id) => {
        RejectCompany(dispatch, id)
            .then(() => {
                setDeleteOccurred(true);
            })
            .catch((error) => {
                console.error("Error deleting announcement:", error);
            });

        setOpenDeletePopup(false);
    };

    useEffect(() => {
        if (deleteOccurred) {
            GetUnverifiedCompanies(dispatch);
            setDeleteOccurred(false);
        }
    }, [deleteOccurred, dispatch]);

    const handleVerifyCompany = async (id) => {
        try {
            const credentials = {
                id: id,
                isVerified: true
            };
            await Verify_Company(dispatch, credentials);
            GetUnverifiedCompanies(dispatch);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const customLastColumn = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="1rem">
                    {/* disabling is temporary only */}
                    <Button
                        variant="contained"
                        size="medium"
                        style={{
                            backgroundColor: params.row.isVerified ? "#aaa" : "#4cceac",
                            color: "#dbf5ee",
                        }}
                        onClick={() => handleVerifyCompany(params.row.id)}
                        disabled={params.row.isVerified}
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
                        onClick={() => {
                            setSelectedItemId(params.row.id);
                            setOpenDeletePopup(true);
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
                <ToastContainer position="top-right" autoClose={3000} />

            </Box>
            <Box sx={{ marginTop: "1.5rem", width: "100%", height: "70vh" }}>
                {companies.length === 0 ? (
                    <Typography>No Data Available</Typography>
                ) : (
                    <DataTable
                        columns={verifyColumns}
                        rows={uniqueCompanies}
                        lastColumn={customLastColumn}
                    />
                )}
            </Box>

            <ConfirmationDialog
                open={openDeletePopup}
                onClose={() => setOpenDeletePopup(false)}
                onConfirm={() => {
                    if (selectedItemId) {
                        handleDelete(selectedItemId);
                    }
                }}
            />
        </Box>
    );
};

export default VerifyCompany;
