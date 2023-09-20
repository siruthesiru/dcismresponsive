import React, { useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"; // Corrected import statement
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023, 8, 9),
        end: new Date(2023, 8, 11),
    },
    {
        title: "Vacation",
        start: new Date(2023, 8, 12),
        end: new Date(2023, 8, 12),
    },
    {
        title: "Conference",
        start: new Date(2023, 8, 22),
        end: new Date(2023, 8, 23),
    },
];

const Events = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    // const [allEvents, setAllEvents] = useState(events);

    const [allEvents] = useState(events);


    // const handleAddEvent = () => {
    //     setAllEvents([...allEvents.newEvent])
    // }



    return (
        <Box m="1.5rem 2.5rem">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Header title="Calendar Section" subtitle="List of Events" />
                <Box display="flex" gap="15px">
                    <Button
                        variant="contained"
                        size="medium"
                        style={{ backgroundColor: colors.greenAccent[500] }}
                    >
                        Add Event
                    </Button>
                </Box>
            </Box>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700, marginTop: "50px" }}
            />
        </Box>
    );
};

export default Events;
