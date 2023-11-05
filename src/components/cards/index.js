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
import { ReportProblemOutlined } from "@mui/icons-material";

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const currentDate = new Date();
    const expirationDate = new Date(job.expiration_Date);

    const formattedDate = expirationDate.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const isStatus = expirationDate > currentDate ? "Active" : "Expired";

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
                    {job.position ? job.position : "Not Indicated"}
                </Typography>
                <Typography variant="h5" component="div">
                    {job.description ? job.description : "Not Indicated"}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color="#4cceac">
                    Expected Salary: ${job.salary ? Number(job.salary).toFixed(2) : "Not Indicated"}
                </Typography>

                {job?.targetSkills.length > 0 ? (
                    job?.targetSkills.map((id, skill) => (
                        <Typography aphy key={id} variant="body2">
                            {skill}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body2">Not Indicated</Typography>
                )}
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
                    <Typography>id: {job.id}</Typography>
                    <Typography>Status: {isStatus}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography>
                            Posted By: {job.company.companyName}
                            <span>
                                {job?.company?.isVerified ? (
                                    <CheckCircleOutlineIcon
                                        style={{
                                            marginLeft: "5px",
                                            color: "#4cceac",
                                            fontSize: "1.3rem",
                                        }}
                                    />
                                ) : (
                                    <ReportProblemOutlined
                                        style={{
                                            marginLeft: "5px",
                                            color: "#db4f4a",
                                            fontSize: "1.3rem",
                                        }}
                                    />
                                )}
                            </span>
                        </Typography>
                    </Box>
                    <Typography >
                        Company Address: {job.company.companyAddress ? job.company.companyAddress : "Not Indicated"}
                    </Typography>
                    <Typography>Job Location: {job.location}</Typography>
                    <Typography>Slots: {job.slots}</Typography>
                    <Typography>Years Experience: {job.yearsofExp}</Typography>
                    <Typography>Application Ends: {formattedDate}</Typography>
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
