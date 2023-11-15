import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { SendInviteApplicant, ViewAllApplicants } from '../../../services/company';
import { getJobsError } from '../../../app/companyUserSlice';
import { Button, CircularProgress } from '@mui/material';
import { ViewCandidatesColumns } from '../../../components/constant/adminColumnHeaders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SwipeRight } from '@mui/icons-material';

const CompanyApplicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ViewAllApplicants(dispatch, id);
                console.log(data);
                setCandidates(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
                dispatch(getJobsError(error.response?.data));
            }
        };

        fetchData();
    }, [dispatch, id]);


    const handleSendInvite = async (jobId, alumniId) => {
        try {
            const isSuccess = await SendInviteApplicant(dispatch, jobId, alumniId);
            if (isSuccess) {
                toast.success('Invitation sent successfully!');
                ViewAllApplicants(dispatch, id);
            }
        } catch (error) {
            console.error('Error sending invite:', error);
        }
    };


    const columns = [
        ...ViewCandidatesColumns,
        {
            field: "action",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => {
                return (

                    <Button
                        variant="contained"
                        size="small"
                        style={{
                            backgroundColor: params.row.status ? "#aaa" : "#4cceac",
                            color: "#dbf5ee",
                        }}
                        onClick={() => handleSendInvite(params.row.jobId, params.row.alumniId)}
                        disabled={params.row.job.status}
                        startIcon={<SwipeRight />}
                    >
                        Accept
                    </Button>
                );
            },
        },

    ];

    const filtered_candidates = candidates ? candidates.filter((candidate) => candidate.jobId === Number(id)) : [];

    console.log(filtered_candidates);

    return (
        <div className='bg-slate-100 min-h-screen'>
            <ToastContainer position="top-right" autoClose={3000} />

            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center'>
                <div className='mx-4 sm:mx-0 bg-white p-4 space-y-2 w-full'>
                    <h1 className='Uppercase text-xl font-bold'>List of Applicants</h1>
                    <p>These are the list of alumni that applied your post.</p>

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            {filtered_candidates.length === 0 ? (
                                <p>No applicants available.</p>
                            ) : (
                                <DataGrid
                                    sx={{
                                        padding: "20px",
                                        "& .MuiDataGrid-toolbarContainer": {
                                            flexDirection: "row-reverse",
                                            color: "#221769"
                                        },
                                        "& .MuiButtonBase-root": {
                                            color: "#221769",
                                        },
                                    }}
                                    rows={filtered_candidates}
                                    columns={columns}
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyApplicants;
