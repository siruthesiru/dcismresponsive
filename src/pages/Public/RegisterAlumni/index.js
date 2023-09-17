import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUserAlt, FaRegAddressCard } from "react-icons/fa";
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
    const error = useSelector((state) => state.authenticationSlice.error);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [IdNum, setIdNum] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={event => {
                    event.preventDefault();
                    if (Password === confirmPassword) {
                        SignUpAlumni(dispatch, { FirstName, LastName, IdNum, Email, Password });
                    }
                }}>
                <div className="mb-3 flex items-center ">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <strong style={{ color: 'black' }}><FaUserAlt size={25} className="mx-2" /></strong>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ outline: "none", flex: 1, marginRight: "10px" }} // Add margin-right for spacing
                    type="text"
                    label="FirstName"
                    autoComplete="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <strong style={{ color: 'black' }}><FaUserAlt size={25} className="mx-2" /></strong>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ outline: "none", flex: 1 }}
                    type="text"
                    label="LastName"
                    autoComplete="name"
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
                                    <strong style={{ color: 'black' }}><FaRegAddressCard size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        label="Id Number"
                        autoComplete="IdNum"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Id Number"
                        value={IdNum}
                        onChange={(e) => setIdNum(e.target.value)}
                    />
                </div>


                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: 'black' }}><FaEnvelope size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        label="Email"
                        autoComplete="email"
                        variant="outlined"
                        fullWidth
                        required
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: 'black' }}><FaLock size={25} className="mx-2" /></strong>
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
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3 flex items-center">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: 'black' }}><FaLock size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        autoComplete="password"
                        fullWidth
                        required
                        placeholder="Confirm Password"
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

export default RegisterAlumni;


