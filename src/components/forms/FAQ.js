import React, { useState } from 'react';
import { TextField, Button, CardContent, Grid, Card, Select, InputLabel, MenuItem } from '@mui/material';

const audience = ['All', 'Alumni', 'Companies'];

const FAQForm = () => {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Audience, setAudience] = useState('All');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                            <InputLabel htmlFor="program-graduated-label" >Intended Audience: </InputLabel>
                            <Select
                                labelId="program-graduated-label"
                                id="program-graduated"
                                value={Audience}
                                onChange={(e) => setAudience(e.target.value)}
                                style={{ maxHeight: '250px', marginLeft: "1rem" }}
                            >
                                {audience.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Title"
                                placeholder='Type in the title'
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Description"
                                multiline
                                minRows={5}
                                placeholder='Type your description here ...'
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant='outlined'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item sm={6} sx={{ textAlign: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "2rem",
                                    backgroundColor: "#221769",
                                    color: "#FFFFFF",
                                }}
                            >
                                Add Alumni
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default FAQForm;
