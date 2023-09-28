import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import Header from '../header';
import RichTextEditor from './RichTextEditor';
import { EditAnnouncement, GetAnnouncementByID } from '../../services/announcement';
import { useDispatch } from 'react-redux';
import { addAnnouncement, editAnnouncementError } from '../../app/announcementsSlice';
import { useParams } from 'react-router-dom';

const audiences = ["All", "Company", "Alumni"];

const AnnouncementForm = () => {

    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        Audience: "All",
        file: null,
    });

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const fetchAnnouncementData = async () => {
            try {
                if (id) {
                    const announcementData = await GetAnnouncementByID(dispatch, id);
                    console.log(announcementData);
                    if (announcementData) {
                        setFormData(announcementData);
                    }
                }
            } catch (error) {
                dispatch(editAnnouncementError());
                console.error('Error:', error);
            }
        };

        fetchAnnouncementData();
    }, [id, dispatch]);



    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (id) {
            EditAnnouncement(dispatch, formData);
        } else {
            addAnnouncement(dispatch, formData);
        }
    };


    return (
        <Box m="1rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title={id ? "Edit Announcement" : "Add Announcement"} subtitle="" />
            </Box>
            <Paper elevation={3} sx={{ p: "1.5rem 2.5rem" }}>
                <form onSubmit={handleFormSubmit}>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                            <label>Title: </label>
                            <TextField
                                placeholder='Type in the title'
                                value={formData.Title}
                                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <label>Add File: </label>
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                            <div>
                                <label>Intended Audience: </label>
                                <Select
                                    labelId="program-graduated-label"
                                    id="program-graduated"
                                    value={formData.Audience}
                                    onChange={(e) => setFormData({ ...formData, Audience: e.target.value })}

                                >
                                    {audiences.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <label>Description: </label>
                        <RichTextEditor value={formData.Description} onChange={(value) => setFormData({ ...formData, value })} />
                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <Button
                            type="button"
                            variant="contained"
                            style={{

                                display: "block",
                                padding: "10px",
                                marginTop: "3rem",
                                backgroundColor: "#221769",
                                color: "#FFFFFF",
                            }}
                        >
                            {id ? "Update" : "Submit"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Box>

    );
}

export default AnnouncementForm;
