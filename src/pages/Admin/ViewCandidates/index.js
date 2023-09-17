import React, { useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import { AlumniRows } from "../../../data/mockAdminData";
import { ViewCandidatesColumns } from "../../../components/constant/adminColumnHeaders";


const ViewCandidates = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const rows = AlumniRows;
    const columns = ViewCandidatesColumns

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="List of Candidates" subtitle="Candidates for data scientist" />
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "2rem" }}>
                <TableContainer sx={{ height: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: colors.greenAccent[500] }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ViewCandidates;
