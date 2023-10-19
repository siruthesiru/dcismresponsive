import React, { useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import PopUp from "../popup";
import EventForm from "../forms/EventForm";
import { DeleteEvent } from "../../services/events";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../popup/confirmationDialog";

const EventWithTooltip = ({ event }) => {

    const [openEditPopup, setOpenEditPopup] = useState(false);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const dispatch = useDispatch();

    const handleEditEvent = () => {
        setOpenEditPopup(false);
    };

    const handleDeleteEvent = () => {
        setOpenDeletePopup(false);
    };


    const handleDelete = () => {
        DeleteEvent(dispatch, event);
        setOpenDeletePopup(false);
    };


    return (
        <Tooltip
            title={
                !(openEditPopup || openDeletePopup) && (
                    <div>
                        <Typography variant="h6">
                            {`Venue: ${event.venue}`}
                        </Typography>
                        <Typography variant="h6">
                            {`Start: ${event.start}`}
                        </Typography>
                        <Typography variant="h6">
                            {`End: ${event.end}`}
                        </Typography>
                    </div>
                )
            }
            placement="bottom"
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div>{event.name}</div>
                    <div>{event.audience}</div>
                </Box>
                <Box display="flex">
                    <IconButton onClick={() => setOpenEditPopup(true)}>
                        <Edit
                            style={{
                                fontSize: "20px",
                                color: "#ffef62",
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={() => setOpenDeletePopup(true)}>
                        <DeleteOutline
                            style={{
                                fontSize: "20px",
                                color: "#e2726e",
                            }}
                        />
                    </IconButton>
                </Box>
                <PopUp
                    title="EDIT EVENT"
                    openPopup={openEditPopup}
                    setOpenup={setOpenEditPopup}
                >
                    <EventForm onSubmit={handleEditEvent} initialEvent={event} />
                </PopUp>
                <ConfirmationDialog open={openDeletePopup} onClose={handleDeleteEvent} onConfirm={handleDelete} />
            </Box>
        </Tooltip >
    );
};

export default EventWithTooltip;
