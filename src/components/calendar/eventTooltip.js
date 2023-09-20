import React from "react";
import { Tooltip, Typography } from "@mui/material";
import { format } from "date-fns"; // Import date formatting function

const EventWithTooltip = ({ event }) => {
    const formattedStart = format(event.start, "MM/dd/yyyy h:mm aa");
    const formattedEnd = format(event.end, "MM/dd/yyyy h:mm aa");

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

            placement="top"
        >
            <div>{event.title}</div>
        </Tooltip>
    );
};

export default EventWithTooltip;
