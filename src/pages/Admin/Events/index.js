import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/header";
import PopUp from "../../../components/popup";
import Calendar from "../../../components/calendar";
import EventForm from "../../../components/forms/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEvents } from "../../../services/events";


const Events = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const events = useSelector((state) => state.eventsSlice.events);
    const dispatch = useDispatch();

    useEffect(() => {
        GetAllEvents(dispatch);
    }, [dispatch])

    const [openPopup, setOpenup] = useState(false);
    const [allEvents, setAllEvents] = useState(events);

    const handleEvent = (newEvent) => {
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
                title="ADD EVENT FORM"
                openPopup={openPopup}
                setOpenup={setOpenup}
            >
                <EventForm onSubmit={handleEvent} />
            </PopUp>
        </>
    );
};

export default Events;
