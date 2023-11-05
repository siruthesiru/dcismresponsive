import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import applogo from "../../assets/applogowhite.png";
import { BusinessCenter, Help, Notifications, AccountCircle, MoreVert, Campaign, EventNote } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/authenticationSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import PopUp from '../popup';
import CompanyMOAUpload from '../forms/CompanyMOAUpload';


const Navbar = ({ user }) => {

    const { firstName, lastName } = useSelector(state => state.authentication)
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [openUploadPopup, setOpenUploadPopup] = useState(false);
    const [openPoup, setOpenup] = useState(false);
    const [openEditPopup, setOpenEditPopup] = useState(false);


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleCloseUpload = () => {
        setOpenUploadPopup(false);
        handleMenuClose();
    };

    const handleAlumni = () => {
        setOpenup(false);
        setOpenEditPopup(false);
    };

    const navigate = useNavigate();


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Button onClick={() => navigate(`/${user}/profile`)}>My Profile</Button>
            </MenuItem>
            {user === "company" && (
                <MenuItem onClick={() => setOpenUploadPopup(true)}
                >
                    Apply Verification
                </MenuItem>
            )}
            <MenuItem>
                <Button onClick={() => { dispatch(logout()) }} href="/" > Log out</Button>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/dashboard`)}>
                    <Campaign />
                </IconButton>
                <p>Announcement</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/events`)}>
                    <EventNote />
                </IconButton>
                <p>Events</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={10} color="error" onClick={() => navigate(`/${user}/jobs`)}>
                        <BusinessCenter />
                    </Badge>
                </IconButton>
                <p>Job Posts</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error" onClick={() => navigate(`/${user}/notifications`)}>
                        <Notifications />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/faq`)}>
                    <Help />
                </IconButton>
                <p>FAQ</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p className="capitalize">{firstName} {lastName}</p>
            </MenuItem>
        </Menu >
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: "static",
                background: "#221769",
                boxShadow: "none",
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <img src={applogo} alt="ACES Logo" width={40} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        ACES
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "1rem" }}>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/dashboard`)}>
                            <Campaign />
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/events`)}>
                            <EventNote />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 10 jobs matches to the user"
                            color="inherit"
                        >
                            <Badge badgeContent={10} color="error" onClick={() => navigate(`/${user}/jobs`)}>
                                <BusinessCenter />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error" onClick={() => navigate(`/${user}/notifications`)}>
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit" onClick={() => navigate(`/${user}/faq`)}>
                            <Help />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                padding="5px"
                            >
                                {firstName} {lastName}
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <PopUp
                title="UPLOAD MOA FILE"
                openPopup={openUploadPopup}
                setOpenup={setOpenUploadPopup}
            >
                <CompanyMOAUpload onSubmit={handleAlumni} onClose={handleCloseUpload} />
            </PopUp>
        </Box>
    );
};

export default Navbar;
