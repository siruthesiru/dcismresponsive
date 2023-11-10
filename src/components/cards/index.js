import React, { useState } from "react";

import {
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
import { formatDate } from "../constant/helper";

const JobCard = ({ job }) => {
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
                    {job.position ? job.position : "Not Indicated"}
                </Typography>
                <div className="text-[20px] text-justify mr-8" dangerouslySetInnerHTML={{ __html: job.description }} />

                <Typography sx={{ mb: "1rem" }} color="#4cceac">
                    Expected Salary:{job.salary ? job.salary : "Not Indicated"}
                </Typography>
                <Typography color="#4cceac">
                    Skills Required:
                    {job?.targetSkills ? (
                        job?.targetSkills.length === 0 ? (
                            <p>No skills indicated</p>
                        ) : (
                            <p>{job?.targetSkills.map((skill) => skill.skill).join(', ')}</p>
                        )
                    ) : (
                        <p>No skills data available</p>
                    )}
                </Typography>
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
                    <Typography>Status: {job.status ? "Active" : "Inactive"}</Typography>

                    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography>Posted by: </Typography>
                        <Typography>
                            {job.company.companyName}
                        </Typography>
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
                    </div>

                    <Typography>Job Location: {job.location}</Typography>
                    <Typography>Slots: {job.slots}</Typography>
                    <Typography>Years Experience: {job.yearsofExp}</Typography>
                    <Typography>Application Ends: {formatDate(job.expiration_Date)}</Typography>
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
