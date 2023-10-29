import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    TextField,
    CardMedia,
} from "@mui/material";
import Header from "../../../components/header";
import placeholder from "../../../assets/placeholder.webp";
import { EditProfile, GetProfile } from "../../../services/admin_alumni"; // Import an update profile service
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAccount } from "../../../app/authenticationSlice";

const Profile = () => {
    const { email } = useSelector((state) => state.authentication)
    const [userData, setUserData] = useState(null);
    const [isEmailEdited, setIsEmailEdited] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchProfileData = async () => {
            const profileData = await GetProfile(dispatch);
            setUserData(profileData);
        };

        fetchProfileData();
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (name === "email" && value !== email) {
            setIsEmailEdited(true);
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async () => {
        try {
            await EditProfile(dispatch, userData);
            toast.success("Updated profile successfully");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }

        if (isEmailEdited) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            toast.success("Please sign in again for the new email");
            dispatch(clearAccount(null));
        }
    };

    return (
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
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const imageData = event.target.result;
                                            setUserData({ ...userData, profilePicture: imageData });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <img
                                src={userData?.profilePicture || placeholder}
                                alt="User Profile"
                                style={{ width: 200, height: 200, borderRadius: "50%", cursor: "pointer" }}
                                onClick={() => {
                                    const fileInput = document.querySelector('input[type="file"]');
                                    fileInput.click();
                                }}
                            />
                        </label>
                    ) : (
                        <CardMedia
                            component="img"
                            sx={{ width: 200, height: 200, borderRadius: "50%", cursor: "pointer" }}
                            image={userData?.profilePicture || placeholder}
                            alt="Profile picture"
                        />
                    )}
                </Box>


                <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", marginLeft: "1rem" }}>

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

                            <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
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

    );
};

export default Profile;
