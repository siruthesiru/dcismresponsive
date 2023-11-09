import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    TextField,
} from "@mui/material";
import Header from "../../../components/header";
import placeholder from "../../../assets/placeholder.webp";
import {
    EditAdminProfile,
    GetAdminProfile,
} from "../../../services/admin_alumni";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const profileData = useSelector(state => state.alumniSlice.adminProfile);
    const [currentlySelectedImage, setCurrentlySelectedImage] = useState(null);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        middleName: profileData.middleName,
        position: profileData.position,
        fileUpload: profileData.profileImage,
        email: profileData.email,
        role: profileData.role
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
        }
    };


    return (
        <form onSubmit={handleSubmit}>

            <Box m="1.5rem 2.5rem">
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Header title="Profile Page" subtitle="Please complete your profile" />
                    <ToastContainer position="top-right" autoClose={3000} />
                </Box>

                <Card sx={{ width: "80%", height: "50vh", display: "flex", alignItems: "center" }}>
                    <Box
                        sx={{
                            flex: "1 0 auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}
                    >
                        {isEditing ? (
                            <label htmlFor="fileInput">
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageInputChange}
                                    name="fileUpload"
                                />
                                <img
                                    src={currentlySelectedImage || `data:image/jpeg;base64,${userData.fileUpload}` || placeholder}
                                    alt="User Profile"
                                    style={{ width: 200, height: 200, borderRadius: "50%", cursor: "pointer" }}
                                />
                            </label>
                        ) : (
                            <img
                                src={userData?.fileUpload ? `data:image/jpeg;base64,${userData.fileUpload}` : placeholder}
                                alt="placeholder"
                                className="w-[200px] h-[200px] rounded-full border border-slate-300 "
                            />
                            // <CardMedia
                            //     component="img"
                            //     sx={{ width: 200, height: 200, borderRadius: "50%", cursor: "pointer", objectFit: "cover" }}
                            //     image={`data:image/jpeg;base64,${userData.fileUpload}` || placeholder}
                            //     alt="Profile picture"
                            // />
                        )}
                    </Box>

                    <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", padding: "1rem" }}>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    First Name:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        name="firstName"
                                        value={userData?.firstName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {userData?.firstName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Middle Name:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        name="middleName"
                                        value={userData?.middleName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {userData?.middleName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Last Name:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        name="lastName"
                                        value={userData?.lastName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {userData?.lastName}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Email:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        type="email"
                                        name="email"
                                        value={userData?.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {userData?.email}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Position:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        name="position"
                                        value={userData?.position}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {userData?.position}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Role:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                <Typography variant="h4" component="div" sx={{ marginBottom: "0.5rem" }}>
                                    {userData?.role}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item sm={6}>
                            {isEditing ? (
                                <Button
                                    type="button"
                                    variant="contained"
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "2rem",
                                        backgroundColor: "#4cceac",
                                        color: "#FFFFFF",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Save Profile
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={toggleEditing}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px",
                                        marginTop: "2rem",
                                        backgroundColor: "yellow",
                                        color: "black",
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
