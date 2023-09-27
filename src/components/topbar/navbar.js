import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import applogo from "../../assets/applogowhite.png";
import { ColorModeContext, tokens } from '../../theme';
import { BusinessCenter, DarkModeOutlined, Help, LightModeOutlined, Newspaper, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/authenticationSlice';
import { Button } from '@mui/material';


const Navbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const { firstName, lastName } = useSelector(state => state.authentication)
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
                <Button>My Profile</Button>
            </MenuItem>
            <MenuItem>
                <Button onClick={() => { dispatch(logout()) }} href="/"> Log out</Button>
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
                <IconButton onClick={colorMode.toggleColorMode} size="large" color="inherit">
                    {theme.palette.mode === "light" ? (
                        <LightModeOutlined />
                    ) : (
                        <DarkModeOutlined />
                    )}
                </IconButton>
                <p>{`${theme.palette.mode} mode`}</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Newspaper />
                </IconButton>
                <p>Events and Announcement</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={10} color="error">
                        <BusinessCenter />
                    </Badge>
                </IconButton>
                <p>Job Posts</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" color="inherit">
                    <Help />
                </IconButton>
                <p>FAQ</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size="large" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>{firstName} {lastName}</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{
                position: "static",
                background: colors.primary[500],
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
                    <Box
                        sx={{
                            backgroundColor: colors.primary[400],
                            borderRadius: "9px",
                            marginLeft: "2rem",
                            padding: "0.1rem 1.5rem",
                        }}
                    >
                        <InputBase placeholder="Search.." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "1rem" }}>
                        <IconButton onClick={colorMode.toggleColorMode} size="large" color="inherit">
                            {theme.palette.mode === "light" ? (
                                <LightModeOutlined />
                            ) : (
                                <DarkModeOutlined />
                            )}
                        </IconButton>
                        <IconButton size="large" color="inherit">
                            <Newspaper />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 10 jobs matches to the user"
                            color="inherit"
                        >
                            <Badge badgeContent={10} color="error">
                                <BusinessCenter />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="inherit">
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
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default Navbar;
