import React, { useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    IconButton,
    CardMedia,
} from "@mui/material";
import Header from "../../../components/header";
import placeholder from "../../../assets/placeholder.webp";
import { useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Profile = () => {
    const { firstName, lastName, email, role } = useSelector((state) => state.authentication);
    // Check if the user has an image; if not, display the placeholder
    const imgSrc = ""; // Replace with the user's image source if available
    const image = imgSrc || placeholder;

    // State to manage the editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // State to manage form data
    const [formData, setFormData] = useState({
        firstName,
        lastName,
        email,
        role,
        password: "",
        profilePicture: image,
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to toggle editing mode
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    // Function to handle form submission (save changes)
    const handleSubmit = () => {
        // Implement your logic to save changes here
        // You can send formData to your API or Redux action
        // Remember to update the state accordingly after saving
        // For now, we'll just toggle the editing mode
        toggleEditing();
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Profile Page" subtitle="Please complete your profile" />
            </Box>

            <Box sx={{ width: "50%", marginTop: "2rem" }}>
                <Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                    {isEditing ? (
                        <Box
                            sx={{
                                flex: "1 0 auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="profile-picture-input"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setFormData({ ...formData, profilePicture: e.target.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <label htmlFor="profile-picture-input">
                                <CardMedia
                                    component="img"
                                    sx={{ marginLeft: "2rem", width: 200, height: 200, borderRadius: "50%", cursor: "pointer" }}
                                    image={formData.profilePicture}
                                    alt="Profile picture"
                                />
                            </label>
                            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1, marginLeft: "2rem" }}>
                                Click the placeholder for adding profile.
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ flex: "1 0 auto", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 200, height: 200, borderRadius: "50%" }}
                                image={formData.profilePicture}
                                alt="Profile picture"
                            />
                        </Box>
                    )}


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
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {formData.firstName}
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
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {formData.lastName}
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        {formData.email}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                                    Role:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                <Typography variant="h4" component="div" sx={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                                    {formData.role}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid spacing={2} sx={{ display: "flex" }}>
                            <Grid item sm={6} sx={{ flex: 1 }}>
                                <Typography component="div" variant="h4" sx={{ marginBottom: "0.5rem" }}>
                                    Password:
                                </Typography>
                            </Grid>
                            <Grid item sm={6} sx={{ flex: 1.5 }}>
                                {isEditing ? (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                ) : (
                                    <Typography variant="h3" component="div" sx={{ marginBottom: "0.5rem" }}>
                                        ********
                                    </Typography>
                                )}
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
                                    Submit
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
            </Box >
        </Box >
    );
};

export default Profile;

