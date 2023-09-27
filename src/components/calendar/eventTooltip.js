import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import { DeleteOutline, Edit } from "@mui/icons-material"; // Corrected import for Edit icon
import { tokens } from "../../theme";
import PopUp from "../popup";
import EventForm from "../forms/EventForm";
import { DeleteEvent, EditEvent } from "../../services/events";
import { useDispatch } from "react-redux";

const EventWithTooltip = ({ event }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const formattedStart = format(event.start, "MM/dd/yyyy h:mm aa");
    const formattedEnd = format(event.end, "MM/dd/yyyy h:mm aa");

    const [openPopup, setOpenup] = useState(false);
    const dispatch = useDispatch();

    const handleEditEvent = (newEvent) => {
        EditEvent(dispatch, newEvent)
        console.log("Edited event:", newEvent);
        setOpenup(false);
    };

    const handleDelete = () => {
        DeleteEvent(dispatch, event)
        console.log("Deleted event:", event.id);
    };

    return (
        <Tooltip
            title={
                <div>
                    <Typography variant="h6">
                        {`Audience: ${event.audience}`}
                    </Typography>
                    <Typography variant="h6">
                        {`Start: ${formattedStart}`}
                    </Typography>
                    <Typography variant="h6">
                        {`End: ${formattedEnd}`}
                    </Typography>
                </div>
            }
            placement="bottom"
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div>{event.title}</div>
                    <div>{event.venue}</div>
                </Box>
                <Box display="flex">
                    <IconButton onClick={() => setOpenup(true)}>
                        <Edit
                            style={{
                                fontSize: "20px",
                                color: colors.yellowAccent[400],
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteOutline
                            style={{
                                fontSize: "20px",
                                color: colors.redAccent[400],
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>

            <PopUp
                title="EDIT EVENT"
                openPopup={openPopup}
                setOpenup={setOpenup}
            >
                <EventForm onSubmit={handleEditEvent} initialEvent={event} />
            </PopUp>
        </Tooltip>
    );
};

export default EventWithTooltip;
