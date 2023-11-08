import React from "react";
import { Outlet } from "react-router-dom";
import { Box, } from "@mui/material";
import Navbar from "../../../components/topbar/navbar";
import { useSelector } from "react-redux";

const LayoutAlumni = () => {
    const user = useSelector(state => state.alumniUserSlice.alumniProfile)

    console.log(user);
    return (
        <Box width="100%" height="100%">
            <Navbar user={user} />
            <Outlet />
        </Box>
    );
};

export default LayoutAlumni;