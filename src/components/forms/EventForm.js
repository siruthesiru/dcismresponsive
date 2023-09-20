import React, { useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.scss'

const audiences = ["All", "Company", "Alumni"];

const EventForm = ({ onAddEvent }) => {
    const [newEvent, setNewEvent] = useState({ title: "", start: null, end: null, audience: "All" });

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.start && newEvent.end) {
            onAddEvent(newEvent);
            setNewEvent({ title: "", start: null, end: null, audience: "All" });
        }
    }

    return (

        <form>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        label="Title"
                        placeholder='Type in the title'
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        variant='outlined'
                        fullWidth
                        required
                    />
                </Grid>
                <Grid xs={12} sm={12} sx={{ display: "flex", alignItems: "center", m: "10px" }}>
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
                <Grid xs={12} sm={12} sx={{ display: "flex", alignItems: "center" }} >
                    <InputLabel htmlFor="program-graduated-label" >Start: </InputLabel>
                    <DatePicker
                        className='date-picker-start'
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        selected={newEvent.start}
                        onChange={(start) => setNewEvent({ ...newEvent, start })}
                    />
                    <InputLabel htmlFor="program-graduated-label" sx={{ marginLeft: "2rem" }} >End: </InputLabel>
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

                <Grid item sm={12}>
                    <Button
                        type="button"
                        variant="contained"
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "2rem",
                            backgroundColor: "#4cceac",
                            color: "#FFFFFF",
                        }}
                        onClick={handleAddEvent}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>


    );
}

export default EventForm;
