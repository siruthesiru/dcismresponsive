import React, { useState } from "react";
import {
    Button,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "../../../services/authentication";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import placeholder from '../../../assets/placeholder.webp'
import FormWithHeader from "../../../components/formheader";

const Login = () => {
    const error = useSelector((state) => state.authenticationSlice.error)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignIn(dispatch, { username, password });
    };

    return (
        <FormWithHeader imageSrc={placeholder}>
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
                        type="text"
                        placeholder="Username"
                        label="Username"
                        variant="outlined"
                        autoComplete="username"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaLock size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        placeholder="Password"
                        label="Password"
                        variant="outlined"
                        autoComplete="current-password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

                <div className="flex text-sm mb-4">
                    <p>
                        Forgot Password?
                        <span className="text-[15px] ml-2">
                            <NavLink to="/forgotpassword" className="text-second underline">
                                Click Here
                            </NavLink>
                        </span>
                    </p>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "15px" }}
                >
                    Login
                </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Don't have an account? Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signup">Alumni</NavLink>
                    </span>
                    or
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company">Company</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>
    );
};

export default Login;
