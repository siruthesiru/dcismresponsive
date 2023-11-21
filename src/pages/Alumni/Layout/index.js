import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import NavbarAlumni from "../../../components/topbar/navbarAlumni";

const LayoutAlumni = () => {
  const user = useSelector((state) => state.alumniUserSlice.alumniProfile);

  return (
    <Box width="100%" height="100%">
      <NavbarAlumni user={user} />
      <Outlet />
    </Box>
  );
};

export default LayoutAlumni;
