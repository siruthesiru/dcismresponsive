import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const FAQForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <form style={{ width: '100%' }}>
            <div className="mb-3 flex items-center">
                <TextField
                    sx={{ outline: "none", flexGrow: 1 }}
                    type="text"
                    label="Title"
                    placeholder="Title.."
                    autoComplete="title"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-3 flex items-center">
                <TextField
                    sx={{ outline: "none", flex: 1 }}
                    type="text"
                    placeholder="Write something here.."
                    label="Description"
                    variant="outlined"
                    autoComplete="IdNum"
                    fullWidth
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    maxRows={4}
                />
            </div>

            <Button
                type="submit"
                variant="contained"
                style={{
                    display: "block",
                    width: "100%",
                    padding: "15px",
                    marginTop: "2rem",
                    backgroundColor: "#4cceac",
                    color: "#FFFFFF",
                }}
            >
                Add FAQ
            </Button>
        </form>
    );
};

export default FAQForm;
