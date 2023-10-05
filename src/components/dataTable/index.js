import { Box, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { EditNote, DeleteOutline } from "@mui/icons-material";
import { tokens } from "../../theme";
import ConfirmationDialog from "../popup/confirmationDialog";
import { useDispatch } from "react-redux";


const DataTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (props.deleteItem) {
            props.deleteItem(dispatch, id);
        }
        if (props.getAllItems) {
            props.getAllItems(dispatch);
        }
        setOpenDeletePopup(false);
    };

    const defaultActionColumn = {
        field: "action",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => {
            return (
                <Box display="flex" gap="10px">
                    <IconButton onClick={() => navigate(`/edit${props.slug}/${params.row.id}`)}>

                        <EditNote
                            style={{
                                fontSize: "20px",
                                color: colors.yellowAccent[400],
                            }}
                        />

                    </IconButton>
                    <IconButton onClick={() => {
                        setSelectedItemId(params.row.id);
                        setOpenDeletePopup(true);
                    }}>
                        <DeleteOutline
                            style={{
                                fontSize: "20px",
                                color: colors.redAccent[400],
                            }}
                        />
                    </IconButton>
                </Box >
            );
        },
    };

    const lastColumn = props.lastColumn || defaultActionColumn;

    return (
        <>
            <Box sx={{ marginTop: "1.5rem", width: "100%", height: "100%" }}>
                <DataGrid
                    sx={{
                        backgroundColor: colors.primary[400],
                        padding: "20px",
                        "& .MuiDataGrid-toolbarContainer": {
                            flexDirection: "row-reverse",
                            color: colors.greenAccent[100],
                        },
                        "& .MuiButtonBase-root": {
                            color: colors.greenAccent[100],
                        },
                    }}
                    rows={props.rows}
                    getRowId={(row) => row.id}
                    columns={[...props.columns, lastColumn]}
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
            <ConfirmationDialog
                open={openDeletePopup}
                onClose={() => setOpenDeletePopup(false)}
                onConfirm={() => {
                    if (selectedItemId) {
                        handleDelete(selectedItemId);
                    }
                }}
            />
        </>
    );
};

export default DataTable;
