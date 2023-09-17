
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaIdBadge, FaRegAddressCard, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../../../services/authentication";
import placeholder from '../../../assets/placeholder.webp'
import FormWithHeader from "../../../components/formheader";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

const RegisterAlumni = () => {
    const error = useSelector((state) => state.authenticationSlice.error)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [idNum, setIdNum] = useState("");
    const [email, setEmail] = useState("");


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUp(dispatch, { username, password, name, idNum, email })

    };

    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaUserAlt size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
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
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaRegAddressCard size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        label="Complete Name (LastName, FirstName, MI)"
                        autoComplete="name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaIdBadge size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        label="USC ID Number"
                        variant="outlined"
                        autoComplete="idNum"
                        fullWidth
                        required
                        value={idNum}
                        onChange={(e) => setIdNum(e.target.value)}
                    />
                </div>


                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaEnvelope size={25} className="mx-2" />
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
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


                <div className="mb-3 flex items-center">

                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <FaLock size={25} className="mx-2" />
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

                {error && <Typography className="text-red-500 mx-4">{error}</Typography>}

                <Button
                    type="submit"
                    variant="contained"
                    style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "15px", marginTop: "2rem" }}
                >
                    Sign Up As Alumni
                </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin">Login</NavLink>
                    </span> or Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signin">Company</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>

    );
};

export default RegisterAlumni;

