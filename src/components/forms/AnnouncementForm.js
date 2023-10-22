import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import Header from '../header';
import RichTextEditor from './RichTextEditor';
import { useDispatch, } from 'react-redux';
import { AddAnnouncement, EditAnnouncement, GetAnnouncementByID } from '../../services/announcement';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory
import { editAnnouncementError } from '../../app/announcementsSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const audiences = ["All", "Company", "Alumni"];

const AnnouncementForm = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        audience: "All",
        fileUpload: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [announcementDataLoaded, setAnnouncementDataLoaded] = useState(false);

    useEffect(() => {
        const fetchAnnouncementData = async () => {
            try {
                if (id) {
                    const announcementData = await GetAnnouncementByID(dispatch, id);
                    if (announcementData) {
                        setFormData(announcementData);
                        setAnnouncementDataLoaded(true);
                    }
                }
            } catch (error) {
                dispatch(editAnnouncementError());
                console.error('Error:', error);
            }
        };

        if (id) {
            fetchAnnouncementData();
        } else {
            setAnnouncementDataLoaded(true);
        }
    }, [id, dispatch]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await EditAnnouncement(dispatch, formData, id);
                toast.success('Announcement updated successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/announcements');
            } else {
                await AddAnnouncement(dispatch, formData);
                toast.success('Announcement added successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/announcements');
            }
        } catch (error) {
            toast.error('Error adding/updating announcement', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };


    return (
        <Box m="1rem 2.5rem">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Header title={id ? "Edit Announcement" : "Add Announcement"} subtitle="" />
            </Box>
            {announcementDataLoaded ? (
                <Paper elevation={3} sx={{ p: "1.5rem 2.5rem" }}>
                    <form onSubmit={handleFormSubmit}>
                        <Grid item xs={12} sm={12}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
                                <label>Title: </label>
                                <TextField
                                    placeholder='Type in the title'
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, fileUpload: e.target.files[0] })}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                                <label>Intended Audience: </label>
                                <Select
                                    labelId="program-graduated-label"
                                    id="program-graduated"
                                    value={formData.audience}
                                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                                    style={{ marginLeft: "5px" }}
                                >
                                    {audiences.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label>Description: </label>
                            <RichTextEditor value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <Button
                                type="submit"
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
            ) : (
                <p>Loading announcement data...</p>
            )}
        </Box>

    );
}

export default AnnouncementForm;
