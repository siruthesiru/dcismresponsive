import React, { useState } from "react";
import {
    Box,
    IconButton,
    AppBar,
    Toolbar,
    Button,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";

import {
    Menu as MenuIcon,
    NotificationsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import placeholder from "../../assets/placeholder.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/authenticationSlice";

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { firstName, lastName } = useSelector(state => state.authentication)

    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    {/* <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "light" ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined />
                        )}
                    </IconButton> */}
                    <IconButton>
                        <NotificationsOutlined />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <img
                                alt="profile"
                                src={placeholder}
                                height="32px"
                                width="32px"
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                            />

                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                            >
                                {firstName} {lastName}
                            </Typography>

                            <ArrowDropDownOutlined
                                sx={{ color: "#7a74a5", fontSize: "25px" }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem>
                                <Button onClick={() => { dispatch(logout()) }} href="/" sx={{ fontSize: "0.65rem", fontWeight: "bold" }}> Log out</Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
