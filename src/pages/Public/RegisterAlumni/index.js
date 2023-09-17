import React, { useState } from "react";
import { FaEnvelope, FaLock, FaBuilding, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../../assets/placeholder.webp'
import FormWithHeader from "../../../components/formheader";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAlumni } from "../../../services/authentication";
import {
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

const RegisterAlumni = () => {
    const error = useSelector((state) => state.authentication.error)

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [IdNum, setIdNum] = useState("");
    const [Email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        SignUp(dispatch, { username, password, name, idNum, email })

    };

    return (
        <div className="container mx-auto flex py-8 gap-2 p-2 sm:p-0 pt-5 mt-10">
            <AuthImage />
            <div className="w-full md:w-[70%] lg::w-[60%] ml-auto justify-end border rounded-md p-8 space-y-4 border-slate-300 bg-white ">
                <AuthHeader />

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 flex items-center">
                        <FaUserAlt size={25} className="mx-2" />
                        <TextField
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

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaUserAlt size={25} className="mx-2" /></strong>
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
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaEnvelope size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        placeholder="Email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        fullWidth
                        required
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                    <div className="mb-3 flex items-center">
                        <FaLock size={25} className="mx-2" />
                        <TextField
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
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{color: "black"}}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        placeholder="Confirm Password"
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
                    style={{ display: "block", width: "100%", backgroundColor: "#030F4B", padding: "15px", marginTop: "2rem" }}
                    disabled={Password !== confirmPassword || Password.length <= 0}    
                >
                    Sign Up As Alumni
                </Button>
                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin">Login</NavLink>
                    </span> or Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company">Coompany</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>

    );
};

export default RegisterAlumni;