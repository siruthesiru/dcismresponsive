import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Header from "../../../components/header";
import { useDispatch, useSelector } from "react-redux";
import { GetJobPosts } from "../../../services/admin_company";
import JobCard from "../../../components/cards";

const Jobs = () => {

    const isNonMobile = useMediaQuery("(min-width: 1000px)");

    const posts = useSelector((state) => state.companiesSlice.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        GetJobPosts(dispatch)
    }, [dispatch])

    const verifiedPost = posts.filter((post) => post.status);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="JOB LIST" subtitle="See the diffirent job postings." />
            {verifiedPost.length === 0 ? (
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
                    {verifiedPost.map((job, key) => (
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
