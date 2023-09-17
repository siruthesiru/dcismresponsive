
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUserAlt, FaBuilding } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../../assets/placeholder.webp'
import FormWithHeader from "../../../components/formheader";
import { useDispatch, useSelector } from "react-redux";
import { SignUpCompany } from "../../../services/authentication";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

const RegisterCompany = () => {
    const error = useSelector((state) => state.authentication.error);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUpCompany(dispatch, { username, password, lastname, firstname, companyName, email })

    };
    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center">

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUserAlt size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 2 }}
                        type="text"
                        label="First Name"
                        autoComplete="firstname"
                        variant="outlined"
                        fullWidth
                        required
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUserAlt size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 2 }}
                        type="text"
                        label="Last Name"
                        autoComplete="lastname"
                        variant="outlined"
                        fullWidth
                        required
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FaUserAlt size={25} className="mx-2" />
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
                                    <FaBuilding size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        label="Company Name"
                        placeholder="Company Name"
                        autoComplete="companyName"
                        variant="outlined"
                        fullWidth
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

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
                        type="email"
                        label="Email"
                        placeholder="Email"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        label="Password"
                        placeholder="Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

                <Button
                    type="submit"
                    variant="contained"
                    style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "15px", marginTop: "2rem" }}
                >
                    Sign Up As Company
                </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company">Login</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>

    );
};

export default RegisterCompany;


