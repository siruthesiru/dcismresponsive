import React, { useState } from 'react';
import { FormControl, InputAdornment, TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { FaUserAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { Badge } from '@mui/icons-material';

const courses = [
    'Bachelor of Science in Computer Science',
    'Bachelor of Science in Information Science',
    'Bachelor of Science in Information Technology',
    'Bachelor of Science in Mathematics',
    'Bachelor of Science in Information Communication Technology',
    'Bachelor of Science in Library Science',
    'Bachelor of Science in Applied Mathematics',
];

const AlumniForm = () => {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Course, setCourse] = useState(''); // Change the initial value to an empty string
    const [YearGraduate, setYearGraduated] = useState("");
    const [IdNum, setIdNum] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3 flex items-center">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <strong style={{ color: "black" }}>
                                    <FaUserAlt size={25} className="mx-2" />
                                </strong>
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
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <strong style={{ color: "black" }}>
                                    <FaUserAlt size={25} className="mx-2" />
                                </strong>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ outline: "none", flex: 1 }}
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
                                <strong style={{ color: "black" }}>
                                    <Badge size={25} className="mx-2" />
                                </strong>
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

            <div className="mb-3 flex items-center">
                <FormControl style={{ flex: 1 }}>
                    <InputLabel htmlFor="program-graduated-label">Program Graduated</InputLabel>
                    <Select
                        labelId="program-graduated-label"
                        id="program-graduated"
                        value={Course}
                        onChange={(e) => setCourse(e.target.value)}
                        style={{ maxHeight: '250px' }}
                    >
                        {courses.map((course) => (
                            <MenuItem key={course} value={course}>
                                {course}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="mb-3 flex items-center">
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <strong style={{ color: "black" }}>
                                    <MdCalendarMonth size={25} className="mx-2" />
                                </strong>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ outline: "none", flex: 1 }}
                    type="number"
                    placeholder="Input a number only"
                    label="Year Graduated"
                    variant="outlined"
                    autoComplete="yearGraduate"
                    fullWidth
                    required
                    value={YearGraduate}
                    onChange={(e) => setYearGraduated(e.target.value)}
                />
            </div>

            <Button
                type="submit"
                variant="contained"
                style={{
                    display: "block",
                    width: "100%",
                    padding: "15px",
                    marginTop: "2rem",
                    backgroundColor: "#4cceac",
                    color: "#FFFFFF",
                }}
            >
                Add Alumni
            </Button>
        </form>
    );
};

export default AlumniForm;
