import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import Header from '../header';
import RichTextEditor from './RichTextEditor';
import { useDispatch, } from 'react-redux';
import { AddAnnouncement, EditAnnouncement, GetAnnouncementByID } from '../../services/announcement';
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory
import { editAnnouncementError } from '../../app/announcementsSlice';


const audiences = ["All", "Company", "Alumni"];

const AnnouncementForm = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        audience: "All",
        file: null,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await EditAnnouncement(dispatch, formData, id);
            } else {
                await AddAnnouncement(dispatch, formData);
                console.log(formData);
            }
            navigate('/announcements');
        } catch (error) {

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
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
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
                        <RichTextEditor value={formData.content} onChange={(value) => setFormData({ ...formData, content: value })} />
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
        </Box>

    );
}

export default AnnouncementForm;
