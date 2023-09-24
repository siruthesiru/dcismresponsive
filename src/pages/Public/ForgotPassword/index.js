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
//import { logout } from "../../../app/authenticationSlice";
import { clearForgotPasswordRequestStatus } from "../../../app/authenticationSlice";

const ForgotPassword = () => {
    const { isSucceed, message } = useSelector(state => state.authentication)
    const error = useSelector((state) => state.authentication.error)

    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // if (isSucceed) {
    //     setShowSuccessAlert(true);
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     resetPasswordRequest(dispatch, { email });
    //     if (isSucceed) {
    //         setShowSuccessAlert(true);
    //     }
    // }

    const handleNavigateToLogin = () => {
        navigate("/signin");
        dispatch(clearForgotPasswordRequestStatus());
    }
    
    return (
        isSucceed ? (
            <Publicformheader imageSrc={placeholder} title="Forgot Password?" description="Don't worry. We can help!">
                {isSucceed && (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {message} — <strong>check it out!</strong>
                    </Alert>
                )}
            <form>
                <Button
                variant="link"
                href="/signin"
                onClick={handleNavigateToLogin}
                style={{textAlign: "center", color: "white", display: "block", width: "100%", backgroundColor: "#000", padding: "12px", marginTop: "2rem" }}
                    >
                Back to Login
            </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Remember your password?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin">Back to Login</NavLink>
                    </span>
                </Typography>
            </form>
            </Publicformheader>
         ) : (
            // Display the message if not successful
            <Publicformheader imageSrc={placeholder} title="Forgot Password?" description="Don't worry. We can help!">
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    resetPasswordRequest(dispatch, { email });
                }}>
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

                    {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

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
                            <NavLink to="/signin">Back to Login</NavLink>
                        </span>
                    </Typography>
                </form>
            </Publicformheader>
        )
    );
};

export default ForgotPassword;
