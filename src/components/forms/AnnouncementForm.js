import React, { useState } from 'react';
import { Box, Button, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.scss'
import Header from '../header';

const audiences = ["All", "Company", "Alumni"];

const AnnouncementForm = () => {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Audience, setAudience] = useState('All');
    const [Start, setStart] = useState(null);
    const [End, setEnd] = useState(null);
    const [Venue, setVenue] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title="Add Announcement" subtitle="" />
            </Box>
            <Paper elevation={3} sx={{ p: "1.5rem 2.5rem" }}>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <InputLabel htmlFor="program-graduated-label" >Title: </InputLabel>
                            <TextField
                                placeholder='Type in the title'
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel htmlFor="program-graduated-label" >Description: </InputLabel>
                            <TextField
                                placeholder='Type in the title'
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant='outlined'
                                fullWidth
                                required
                                multiline
                                minRows={5}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="program-graduated-label" >Intended Audience: </InputLabel>
                            <Select
                                labelId="program-graduated-label"
                                id="program-graduated"
                                value={Audience}
                                onChange={(e) => setAudience(e.target.value)}

                            >
                                {audiences.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="program-graduated-label" >Start: </InputLabel>
                            <DatePicker
                                className='date-picker-start'
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                selected={Start}
                                onChange={(e) => setStart(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <InputLabel htmlFor="program-graduated-label">End: </InputLabel>
                            <DatePicker
                                className='date-picker'
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                selected={End}
                                onChange={(e) => setEnd(e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel htmlFor="program-graduated-label" >Venue: </InputLabel>
                            <TextField
                                placeholder='Type in the title'
                                value={Venue}
                                onChange={(e) => setVenue(e.target.value)}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                            <InputLabel htmlFor="program-graduated-label" >Upload File: </InputLabel>
                            <Button
                                type="button"
                                variant="contained"
                                style={{
                                    display: "block",
                                    padding: "10px",
                                    marginLeft: "10px",
                                    marginTop: "2rem",
                                    backgroundColor: "#4cceac",
                                    color: "#FFFFFF",
                                }}
                            >
                                Browse File
                            </Button>
                        </Grid>

                        <Grid item sm={12}>
                            <Button
                                type="button"
                                variant="contained"
                                style={{

                                    display: "block",
                                    padding: "10px",
                                    marginTop: "2rem",
                                    backgroundColor: "#221769",
                                    color: "#FFFFFF",
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>

    );
}

export default AnnouncementForm;
