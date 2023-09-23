import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaKey, FaLock } from "react-icons/fa";
import Publicformheader from "../../../components/formheader/publicformheader";
import placeholder from '../../../assets/capstole.webp'
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ChangePassword = () => {
    const error = useSelector((state) => state.authentication.error)

    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ Password, ConfirmPassword })
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (

        <Publicformheader imageSrc={placeholder} title="Change Password" description="Please use a strong combination">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    {showPassword ? (
                                        <FaEye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[18px]" />

                                    ) : (
                                        <FaEyeSlash onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[18px]" />

                                    )}
                                </InputAdornment>
                            )
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div className="mb-3 flex items-center">

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    {showConfirmPassword ? (
                                        <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer text-[18px]" />

                                    ) : (
                                        <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer text-[18px]" />

                                    )}
                                </InputAdornment>
                            )
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="confirmPassword"
                        fullWidth
                        required
                        value={ConfirmPassword}
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
