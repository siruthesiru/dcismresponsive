import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/capstole.webp'


const ForgotPassword = () => {

    const error = useSelector((state) => state.authentication.error)

    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ email })
    };

    return (
        <Publicformheader imageSrc={placeholder} title="Forgot Password ?" description="Dont worry. We can help">
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

export default ForgotPassword;
