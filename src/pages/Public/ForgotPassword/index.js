import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/capstole.webp'
import { resetPasswordRequest } from "../../../services/authentication";
import { clearForgotPasswordRequestStatus } from "../../../app/authenticationSlice";


const ForgotPassword = () => {

    const { isSucceed, message } = useSelector((state) => state.authentication)
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        resetPasswordRequest(dispatch, { email });
        if (isSucceed) {
            setShowSuccessAlert(true);
        }
    }

    const handleNavigateToLogin = () => {
        navigate("/signin");
        dispatch(clearForgotPasswordRequestStatus());
    }

    return (
        <Publicformheader imageSrc={placeholder} title="Forgot Password?" description="Don't worry. We can help!">
            {showSuccessAlert && (
                <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                    <AlertTitle>Success</AlertTitle>
                    {message} — <strong>check it out!</strong>
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaEnvelope size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        placeholder="Email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "12px", marginTop: "2rem" }}
                >
                    Continue
                </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Remember your password?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin" onClick={handleNavigateToLogin}>Back to Login</NavLink>
                    </span>
                </Typography>
            </form>
        </Publicformheader>
    );
};

export default ForgotPassword;
