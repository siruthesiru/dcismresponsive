import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { SendInviteApplicant, ViewAllCandidates } from '../../../services/company';
import { getJobsError } from '../../../app/companyUserSlice';
import { Button, CircularProgress } from '@mui/material';
import { ViewCandidatesColumns } from '../../../components/constant/adminColumnHeaders';


const CompanyApplicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ViewAllCandidates(dispatch, id);
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
                console.log('Invitation sent successfully!');
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
                            backgroundColor: params.row.status ? "#aaa" : "#221769",
                            color: "#dbf5ee",
                        }}
                        onClick={() => handleSendInvite(params.row.jobId, params.row.alumniId)}
                        disabled={!params.row.job.isActive}
                    >
                        Sent Invite
                    </Button>
                );
            },
        },

    ];

    const filtered_candidates = candidates.filter((candidate) => candidate.jobId === Number(id));
    console.log(filtered_candidates)

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center'>
                <div className='mx-4 sm:mx-0 bg-white p-4 space-y-2 w-full'>
                    <h1 className='Uppercase text-xl font-bold'>List of Candidates</h1>
                    <p>These are the list of alumni that applied your post.</p>

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div style={{ width: '100%', overflowX: 'auto' }}>
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyApplicants;
