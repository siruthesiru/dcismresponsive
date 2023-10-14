import React from 'react'
import { alumniColumns } from '../../components/constant/adminColumnHeaders'
import { AlumniRows } from '../../data/mockAdminData'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@mui/material'

const C_ViewCandidates = () => {
    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='container mx-auto flex flex-col sm:flex-row py-4 gap-2 items-center justify-center'>
                <div className='mx-4 sm:mx-0 bg-white p-4 space-y-2'>
                    <h1 className='Uppercase text-xl font-bold'>List of Candidates</h1>
                    <p >These are the list of alumni that matches your job post.</p>
                    <Box sx={{ marginTop: "1.5rem", width: "100%", height: "100%" }}>
                        <DataGrid
                            sx={{
                                padding: "20px",
                                "& .MuiDataGrid-toolbarContainer": {
                                    flexDirection: "row-reverse",
                                },
                                "& .MuiButtonBase-root": {
                                },
                            }}
                            rows={AlumniRows}
                            getRowId={(row) => row.id}
                            columns={alumniColumns}
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
                    </Box>

                </div>
            </div>

        </div>
    )
}

export default C_ViewCandidates