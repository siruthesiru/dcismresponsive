import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { MdCalendarMonth } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { Badge } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AddAlumni, EditAlumni, GetAlumni, GetAlumniByID, } from '../../services/admin_alumni';
import { editAlumniError } from '../../app/alumniSlice';

// const programs = [
//     'Bachelor of Science in Computer Science',
//     'Bachelor of Science in Information Science',
//     'Bachelor of Science in Information Technology',
//     'Bachelor of Science in Mathematics',
//     'Bachelor of Science in Information Communication Technology',
//     'Bachelor of Science in Library Science',
//     'Bachelor of Science in Applied Mathematics',
//     'Master of Science in Mathematics'
// ];
// const educationalLevels = [
//     'Tertiary',
//     'Masteral',
//     'Doctoriate'
// ];

const AlumniForm = ({ onSubmit, id }) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        idNum: "",
        venue: "",
        courses: [
            {
                program: "",
                educationalLevel: "",
            },
        ],
        syGraduated: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const [alumniDataLoaded, setAlumniDataLoaded] = useState(false);

    useEffect(() => {
        const fetchAlumniData = async () => {
            try {
                if (id) {
                    const alumniData = await GetAlumniByID(dispatch, id);
                    if (alumniData) {
                        setFormData(alumniData);
                        setAlumniDataLoaded(true);
                    }
                }
            } catch (error) {
                dispatch(editAlumniError());
                console.error('Error:', error);
            }
        };

        if (id) {
            fetchAlumniData();
        } else {
            setAlumniDataLoaded(true);
        }
    }, [id, dispatch]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            if (id) {
                await EditAlumni(dispatch, formData);
            } else {
                await AddAlumni(dispatch, formData);
            }
            await GetAlumni(dispatch);

            onSubmit(formData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    console.log(formData);


    return (
        <form onSubmit={handleFormSubmit}>
            {alumniDataLoaded ? (
                <>
                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <FaUserAlt size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1, marginRight: 2 }}
                            type="text"
                            label="First Name"
                            autoComplete="firstname"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />

                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <FaUserAlt size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1 }}
                            type="text"
                            label="Last Name"
                            autoComplete="lastname"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <Badge size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1 }}
                            type="text"
                            placeholder="USC ID Number"
                            label="USC ID Number"
                            variant="outlined"
                            autoComplete="IdNum"
                            fullWidth
                            required
                            value={formData.idNum}
                            onChange={(e) => setFormData({ ...formData, idNum: e.target.value })}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        {/* <FormControl style={{ flex: 1 }}>
                            <InputLabel htmlFor="program">Program</InputLabel>
                            <Select
                                id="program"
                                value={formData.program}
                                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                                variant="outlined"
                                fullWidth
                                required
                            >
                                {programs.map((program) => (
                                    <MenuItem key={program} value={program}>
                                        {program}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <Badge size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1 }}
                            type="text"
                            placeholder="Program"
                            label="Program"
                            variant="outlined"
                            autoComplete="Level"
                            fullWidth
                            required
                            value={formData.courses?.program || ''}
                            onChange={(e) => setFormData({ ...formData, courses: { ...formData.courses, program: e.target.value } })}
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        {/* <FormControl style={{ flex: 1 }}>
                            <InputLabel htmlFor="educationalLevel">Educational Level</InputLabel>
                            <Select
                                id="educationalLevel"
                                value={formData.course}
                                onChange={(e) => setFormData({ ...formData, educationalLevel: e.target.value })}
                                variant="outlined"
                                fullWidth
                                required
                            >
                                {educationalLevels.map((educationalLevel) => (
                                    <MenuItem key={educationalLevel} value={educationalLevel}>
                                        {educationalLevel}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <Badge size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1 }}
                            type="text"
                            placeholder="Educational Level"
                            label="Level"
                            variant="outlined"
                            autoComplete="Level"
                            fullWidth
                            required
                            value={formData.courses?.educationalLevel || ''}
                            onChange={(e) => setFormData({ ...formData, courses: { ...formData.courses, educationalLevel: e.target.value } })}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <strong style={{ color: 'black' }}>
                                            <MdCalendarMonth size={25} className="mx-2" />
                                        </strong>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ outline: 'none', flex: 1 }}
                            type="number"
                            placeholder="Input a number only"
                            label="Year Graduated"
                            variant="outlined"
                            autoComplete="yearGraduate"
                            fullWidth
                            required
                            value={formData.syGraduated}
                            onChange={(e) => setFormData({ ...formData, syGraduated: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '15px',
                            marginTop: '2rem',
                            backgroundColor: '#221769',
                            color: '#FFFFFF',
                        }}
                    >
                        {submitting ? 'Submitting...' : (id ? 'Update Alumni' : 'Add Alumni')}
                    </Button>
                </>

            ) : (
                <p>Loading announcement data...</p>
            )}
        </form>
    );
};

export default AlumniForm;
