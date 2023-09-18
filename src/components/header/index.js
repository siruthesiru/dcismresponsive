import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Typography
                variant="h2"
                color={colors.greenAccent[100]}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[200]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;