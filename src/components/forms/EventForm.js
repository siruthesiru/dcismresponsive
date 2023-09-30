import React, { useEffect, useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import { AddEvent, EditEvent, GetAllEvents } from '../../services/events';
import { useDispatch } from 'react-redux';


const EventForm = ({ onSubmit, initialEvent }) => {

    const audiences = ["All", "Company", "Alumni"];

    // Initialize newEvent with the same format as initialEvent
    const [newEvent, setNewEvent] = useState(initialEvent ? { ...initialEvent } : {
        Name: "",
        Description: "",
        Venue: "",
        Audience: "All",
        Start: new Date(),
        End: new Date(),
        // File: null
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (initialEvent) {
            const startDate = new Date(initialEvent.start);
            const endDate = new Date(initialEvent.end);
            setNewEvent({
                ...initialEvent,
                // Name: initialEvent.name,
                // Description: initialEvent.description,
                // Venue: initialEvent.venue,
                // Audience: initialEvent.audience,
                // Start: startDate,
                // End: endDate
            });
        }
    }, [initialEvent])

    console.log(newEvent);
    const handleFormSubmit = () => {
        if (initialEvent) {
            EditEvent(dispatch, newEvent);
        } else {
            AddEvent(dispatch, newEvent);
        }
        GetAllEvents(dispatch);
        onSubmit(newEvent);
    }

    return (
        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                    <InputLabel htmlFor="program-graduated-label" >Intended Audience: </InputLabel>
                    <Select
                        labelId="program-graduated-label"
                        id="program-graduated"
                        value={newEvent.Audience}
                        onChange={(e) => setNewEvent({ ...newEvent, Audience: e.target.value })}
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
                        value={newEvent.Name}
                        onChange={(e) => setNewEvent({ ...newEvent, Name: e.target.value })}
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
                        value={newEvent.Description}
                        onChange={(e) => setNewEvent({ ...newEvent, Description: e.target.value })}
                        variant='outlined'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Venue"
                        placeholder='Venue of the event'
                        value={newEvent.Venue}
                        onChange={(e) => setNewEvent({ ...newEvent, Venue: e.target.value })}
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
                        selected={newEvent.Start}
                        onChange={(Start) => setNewEvent({ ...newEvent, Start })}
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
                        selected={newEvent.End}
                        onChange={(End) => setNewEvent({ ...newEvent, End })}
                    />
                </Grid>
                <Grid item sm={12} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <InputLabel htmlFor="program-graduated-label" >Add File: </InputLabel>
                    <input
                        type="file"
                        accept=".pdf, .doc, .docx"
                        onChange={(e) => setNewEvent({ ...newEvent, file: e.target.files[0] })}
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
