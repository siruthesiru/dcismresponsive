import React, { useState } from "react";

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const JobCard = ({
    _id,
    name,
    description,
    salary,
    skills,
    endDate,
    isActive,
}) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
            sx={{
                backgroundImage: "none",
                borderRadius: "0.55rem",
            }}
        >
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color="#4cceac"
                    gutterBottom
                >
                    {name}
                </Typography>
                <Typography variant="h5" component="div">
                    {description}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color="#4cceac">
                    Expected Salary: ${Number(salary).toFixed(2)}
                </Typography>
                <Typography variant="body2">{skills.join(" ")}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        my: "1rem", backgroundColor: "#221769"
                    }}
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit

            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Status: {isActive ? "Active" : "Expired"}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography>Posted By: Name of the Company</Typography>

                        <CheckCircleOutlineIcon
                            style={{
                                marginLeft: "5px",
                                color: "#4cceac",
                                fontSize: "1.3rem",
                            }}
                        />
                    </Box>
                    <Typography>Application Ends: {endDate}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            my: "1rem", backgroundColor: "#4cceac"
                        }}
                        size="small"
                        onClick={() => navigate('/view_candidates')}
                    >
                        View Candidates
                    </Button>
                </CardContent>
            </Collapse>
        </Card >
    );
};

export default JobCard;
