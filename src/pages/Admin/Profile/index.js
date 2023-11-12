import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    TextField,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Header from "../../../components/header";
import placeholder from "../../../assets/placeholder.webp";
import { EditAdminProfile, GetAdminProfile } from "../../../services/admin_alumni";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const profileData = useSelector((state) => state.alumniSlice.adminProfile);
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);

    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        middleName: profileData.middleName,
        position: profileData.position,
        fileUpload: profileData.profileImage,
        email: profileData.email,
        role: profileData.role,
    });

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageData = event.target.result;
                setCurrentlySelectedImage(imageData);
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    fileUpload: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        const isEditSucceed = await EditAdminProfile(dispatch, userData);

        if (isEditSucceed) {
            const profileData = await GetAdminProfile(dispatch);
            setUserData(profileData);
            setIsEditing(false);
        }
    };

    useEffect(() => {
        if (!isEditing) {
            const fetchData = async () => {
                const profileData = await GetAdminProfile(dispatch);
                setUserData({
                    ...userData,
                    fileUpload: profileData.profileImage,
                });
            };

            fetchData();
        }
    }, [isEditing, dispatch, userData]);

    return (
        <form onSubmit={handleSubmit}>
            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Profile Page" subtitle="Please complete your profile" />
                    <ToastContainer position="top-right" autoClose={3000} />
                </Box>

                <Card
                    sx={{
                        width: "100",
                        height: "100",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            flex: "1 0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-center",
                            flexDirection: "columrn",
                            padding: "1rem",
                        }}
                    >
                        {isEditing ? (
                            <>
                                <label htmlFor="fileInput" style={{ position: "relative", display: "inline-block" }}>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleImageInputChange}
                                        name="fileUpload"
                                    />
                                    <img
                                        src={
                                            currentlySelectedImage ||
                                            `data:image/jpeg;base64,${userData.fileUpload}` ||
                                            placeholder
                                        }
                                        alt="User Profile"
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                        }}
                                    />
                                    <IconButton
                                        component="span"
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            "&::before": {
                                                content: '""',
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                borderRadius: "50%",
                                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                pointerEvents: "none",
                                            },
                                        }}
                                    >
                                        <EditIcon
                                            color="primary"
                                            sx={{ fontSize: 30, cursor: "pointer" }}
                                        />
                                    </IconButton>
                                </label>
                            </>
                        ) : (
                            <img
                                src={
                                    userData?.fileUpload
                                        ? `data:image/jpeg;base64,${userData.fileUpload}`
                                        : placeholder
                                }
                                alt="User Profile"
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            />
                        )}
                    </Box>

                    <CardContent sx={{ flex: "1 0 auto", padding: "1rem" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    First Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {isEditing ? (
                                    <TextField
                                        name="firstName"
                                        value={userData?.firstName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography
                                        variant="h3"
                                        sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                    >
                                        {userData?.firstName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Middle Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {isEditing ? (
                                    <TextField
                                        name="middleName"
                                        value={userData?.middleName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography
                                        variant="h3"
                                        sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                    >
                                        {userData?.middleName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Last Name:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {isEditing ? (
                                    <TextField
                                        name="lastName"
                                        value={userData?.lastName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography
                                        variant="h3"
                                        sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                    >
                                        {userData?.lastName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Position:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {isEditing ? (
                                    <TextField
                                        name="position"
                                        value={userData?.position}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography
                                        variant="h3"
                                        sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                    >
                                        {userData?.position}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h3"
                                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                >
                                    {userData?.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Role:
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h3"
                                    sx={{ marginBottom: "0.5rem", overflowWrap: "break-word" }}
                                >
                                    {userData?.role}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            {isEditing ? (
                                <Button
                                    type="button"
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "2rem",
                                        backgroundColor: "#4cceac",
                                        color: "#FFFFFF",
                                        "& .MuiSvgIcon-root": {
                                            marginRight: "0.5rem",
                                        },
                                        "&:hover": {
                                            backgroundColor: "yellow",
                                        },
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Save Profile
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={toggleEditing}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "2rem",
                                        backgroundColor: "yellow",
                                        color: "black",
                                        "& .MuiSvgIcon-root": {
                                            marginRight: "0.5rem",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#4cceac",
                                        },
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </form>
    );
};

export default Profile;
