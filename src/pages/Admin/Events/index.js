import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import PopUp from "../../../components/popup";
import Calendar from "../../../components/calendar";
import EventForm from "../../../components/forms/EventForm";

const events = [
    {
        title: "Big Meeting",
        start: new Date(2023, 8, 20, 8, 30, 0),
        end: new Date(2023, 8, 20, 11, 0, 0),
        audience: "Company",
    },
    {
        title: "Vacation",
        start: new Date(2023, 8, 25, 8, 30, 0),
        end: new Date(2023, 8, 25, 19, 0, 0),
        audience: "Alumni",
    },
    {
        title: "Conference",
        start: new Date(2023, 8, 30, 8, 30, 0),
        end: new Date(2023, 8, 30, 17, 0, 0),
        audience: "All",
    },
];

const Events = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [openPopup, setOpenup] = useState(false);
    const [allEvents, setAllEvents] = useState(events);

    const handleAddEvent = (newEvent) => {
        setAllEvents([...allEvents, newEvent]);
        setOpenup(false);
    };

    return (
        <>
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
                            style={{ backgroundColor: colors.primary[500] }}
                            onClick={() => {
                                setOpenup(true);
                            }}
                        >
                            Add Event
                        </Button>
                    </Box>
                </Box>
                <Calendar events={allEvents} />
            </Box>
            <PopUp
                title="Event FORM"
                openPopup={openPopup}
                setOpenup={setOpenup}
            >
                <EventForm onAddEvent={handleAddEvent} />
            </PopUp>
        </>
    );
};

export default Events;
