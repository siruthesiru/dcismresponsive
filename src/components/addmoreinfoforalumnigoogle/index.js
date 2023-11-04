import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../assets/capstole.png'
import FormWithHeader from "../formheader/indexAfterGoogle";
import { useDispatch, useSelector } from "react-redux";
import {  SignUpGoogleAlumniUpdate } from "../../services/authentication";
import {
    Alert,
    AlertTitle,
    Button, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Badge } from "@mui/icons-material";
import { clearMessage } from "../../app/authenticationSlice";

const RegisterAlumniGoogle = () => {
    const { message, isSucceed } = useSelector((state) => state.authentication);

    const dispatch = useDispatch();

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [IdNum, setIdNum] = useState("");

    return (
        <FormWithHeader imageSrc={placeholder}>
            {isSucceed && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {message} — <strong>check it out!</strong>
                </Alert>
            )}
            <form onSubmit={event => {
                event.preventDefault();
                SignUpGoogleAlumniUpdate(dispatch, { FirstName, LastName, IdNum });
                
            }}>
                <div className="mb-3 flex items-center">

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 2 }}
                        type="text"
                        placeholder="First Name"
                        label="First Name"
                        autoComplete="firstname"
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
                                    <strong style={{ color: "black" }}><FaUserAlt size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1, marginRight: 0 }}
                        type="text"
                        placeholder="Last Name"
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
                                    <strong style={{ color: "black" }}><Badge size={25} className="mx-2" /></strong>
                                </InputAdornment>
                            ),
                        }}

                        sx={{ outline: "none", flex: 1 }}
                        type="text"
                        placeholder="USC ID Number"
                        label="USC ID Number"
                        variant="outlined"
                        autoComplete="IdNum"
                        fullWidth
                        required
                        value={IdNum}
                        onChange={(e) => setIdNum(e.target.value)}
                    />

                </div>


                <Button
                    type="submit"
                    variant="contained"
                    onClick={() => dispatch(clearMessage())}
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "15px",
                        marginTop: "2rem",
                        backgroundColor: "#030F4B",
                        color: "#FFFFFF",
                    }}
                >
                    Continue
                </Button>

                <Typography sx={{ text: "16px", marginTop: "20px", textAlign: "center" }}>
                    Already have an account?
                    <span className="text-second underline px-2">
                        <NavLink to="/signin" onClick={() => dispatch(clearMessage())}>Login</NavLink>
                    </span> or Register as
                    <span className="text-second underline px-2">
                        <NavLink to="/signup/company" onClick={() => dispatch(clearMessage())}>Company</NavLink>
                    </span>
                </Typography>
            </form>
        </FormWithHeader>
    );
};

export default RegisterAlumniGoogle;