import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/placeholder.webp'
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
    const error = useSelector((state) => state.authentication.error)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ password, confirmPassword })
    };

    return (

        <Publicformheader imageSrc={placeholder} title="Change Password" description="Please use a strong combination">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaKey size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        label="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaKey size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="confirmPassword"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

    );
};

export default ChangePassword;
