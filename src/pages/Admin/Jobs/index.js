import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Header from "../../../components/header";
import JobCard from "../../../components/cards";
import { useDispatch, useSelector } from "react-redux";
import { GetVerifiedJobs } from "../../../services/admin_company";

const Jobs = () => {

    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const verified_post = useSelector((state) => state.companiesSlice.verified_post);
    const dispatch = useDispatch();
    useEffect(() => {
        GetVerifiedJobs(dispatch)
    }, [dispatch])



    return (
        <Box m="1.5rem 2.5rem">
            <Header title="JOB LIST" subtitle="See the diffirent job postings." />
            {verified_post.length === 0 ? (
                <Typography>No Data Available</Typography>
            ) : (
                <Box
                    my="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0,1fr))"
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    {verified_post.map((job, key) => (
                        <JobCard
                            key={key}
                            job={job}
                        />
                    ))}
                </Box>

            )}

        </Box>
    );
};

export default Jobs;
