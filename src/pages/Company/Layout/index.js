import React from "react";
import { Outlet } from "react-router-dom";
import { Box, } from "@mui/material";
import Navbar from "../../../components/topbar/navbar";

const LayoutCompany = () => {

    return (
        <Box width="100%" height="100%">
            <Navbar user="company" />
            <Outlet />
        </Box>
    );
};

export default LayoutCompany;