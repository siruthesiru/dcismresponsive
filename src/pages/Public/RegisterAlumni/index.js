import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import placeholder from '../../../assets/capstole.png'
import FormWithHeader from "../../../components/formheader/indexAlumni";
import { useDispatch, useSelector } from "react-redux";
import { SignUpAlumni } from "../../../services/authentication";
import {
    Button, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Badge } from "@mui/icons-material";
import { clearMessage } from "../../../app/authenticationSlice";
import { programs } from "../../../components/constant/helper";

const RegisterAlumni = () => {
    const { message } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [IdNum, setIdNum] = useState("");
    const [Email, setEmail] = useState("");
    const [ProgramCode, setProgramCode] = useState("");
    const [ProgramDescription, setProgramDescription] = useState("");
    const [EducationalLevel, setEducationalLevel] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if the password meets the required pattern
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(Password)) {
            setPasswordError(
                "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, and one special character"
            );
            return;
        } else {
            setPasswordError("");
        }
        if (Password === confirmPassword) {
            console.log(FirstName, LastName, Password, IdNum, Email, ProgramCode, ProgramDescription, EducationalLevel)
            SignUpAlumni(dispatch, { FirstName, LastName, Password, IdNum, Email, ProgramCode, ProgramDescription, EducationalLevel });
        }
    };

    return (
        <FormWithHeader imageSrc={placeholder}>
            <form onSubmit={handleFormSubmit}>
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
                                    <strong style={{ color: "black" }}><FaEnvelope size={25} className="mx-2" /></strong>
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
                <div className="mb-3 flex-col items-center">
                    <InputLabel htmlFor="program">Program</InputLabel>

                    <Select
                        id="program"
                        value={ProgramDescription || ''}
                        onChange={(e) => {
                            const selectedProgramDescription = e.target.value;
                            const selectedProgram = programs.find(program => program.description === selectedProgramDescription);
                            if (selectedProgram) {
                                let educationalLevel = "Bachelor";
                                if (selectedProgramDescription.startsWith("Master")) {
                                    educationalLevel = "Master";
                                } else if (selectedProgramDescription.startsWith("Doctor")) {
                                    educationalLevel = "Doctor";
                                }
                                setProgramDescription(selectedProgram.description);
                                setProgramCode(selectedProgram.code);
                                setEducationalLevel(educationalLevel);
                            }
                        }}
                        variant="outlined"
                        fullWidth
                        required
                    >
                        {programs.map((program) => (
                            <MenuItem key={program.description} value={program.description}>
                                {program.description}
                            </MenuItem>
                        ))}
                    </Select>

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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {message && <Typography className="text-red-500 mx-4">{message}</Typography>}
                {passwordError && (
                    <Typography className="text-red-500 mx-4">{passwordError}</Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    style={{
                        display: "block",
                        width: "100%",
                        padding: "15px",
                        marginTop: "2rem",
                        backgroundColor: Password !== confirmPassword ? "#A9A9A9" : "#030F4B",
                        color: "#FFFFFF",
                    }}
                    disabled={Password !== confirmPassword}
                >
                    Sign Up As Alumni
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

export default RegisterAlumni;