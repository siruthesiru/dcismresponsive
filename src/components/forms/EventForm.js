import React, { useEffect, useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import { AddEvent, EditEvent } from '../../services/events';
import { useDispatch } from 'react-redux';


const EventForm = ({ onSubmit, initialEvent }) => {
    const audiences = ["All", "Company", "Alumni"];
    const [newEvent, setNewEvent] = useState({ title: "", venue: "", eventInfo: "", start: null, end: null, audience: "All", file: null });

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialEvent) {
            setNewEvent(initialEvent);
        }
    }, [initialEvent])

    const handleFormSubmit = () => {
        if (initialEvent) {
            EditEvent(dispatch, newEvent);
        } else {
            AddEvent(dispatch, newEvent);
        }
        onSubmit(newEvent);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setNewEvent({ ...newEvent, file: selectedFile });
    }

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                    <InputLabel htmlFor="program-graduated-label" >Intended Audience: </InputLabel>
                    <Select
                        labelId="program-graduated-label"
                        id="program-graduated"
                        value={newEvent.audience}
                        onChange={(e) => setNewEvent({ ...newEvent, audience: e.target.value })}
                        style={{ maxHeight: '250px', marginLeft: "1rem" }}
                    >
                        {audiences.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Event Name"
                        placeholder='Type the title of the event'
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        variant='outlined'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Event Info"
                        placeholder='Type the description of the event'
                        multiline
                        minRows={3}
                        value={newEvent.eventInfo}
                        onChange={(e) => setNewEvent({ ...newEvent, eventInfo: e.target.value })}
                        variant='outlined'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Venue"
                        placeholder='Venue of the event'
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                        variant='outlined'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <InputLabel htmlFor="program-graduated-label">Start: </InputLabel>
                    <DatePicker
                        className='date-picker-start'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        selected={newEvent.start}
                        onChange={(start) => setNewEvent({ ...newEvent, start })}
                    />
                </Grid>
                <Grid xs={12} sm={6} sx={{ display: "flex", alignItems: "center", gap: "10px" }} >
                    <InputLabel htmlFor="program-graduated-label" >End: </InputLabel>
                    <DatePicker
                        className='date-picker'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        selected={newEvent.end}
                        onChange={(end) => setNewEvent({ ...newEvent, end })}
                    />
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <InputLabel htmlFor="program-graduated-label" >Add File: </InputLabel>
                    <input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        onChange={handleFileChange}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Button
                        type="button"
                        variant="contained"
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "1rem",
                            backgroundColor: "#221769",
                            color: "#FFFFFF",
                        }}
                        onClick={handleFormSubmit}
                    >
                        {initialEvent ? 'Update Event' : 'Add Event'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EventForm;
