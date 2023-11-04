import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const DataTable = (props) => {

    return (
        <>
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
                rows={props.rows}
                getRowId={(row) => row.id}
<<<<<<< HEAD
                columns={[...props.columns, props?.lastColumn]}
=======
                columns={[...props.columns, props.lastColumn]}
>>>>>>> eda37809f595f58c6582a49709f8d2d86a27b393
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
        </>
    );
};

export default DataTable;
