import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { EditProfile, GetCompanyProfile } from '../../services/company';
import { Button, Grid } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CompanyMOAUpload = ({ onSubmit, onClose }) => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log(`Uploaded CSV file: ${selectedFile.name}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            console.log(formData);
            formData.append('moa', file);
            try {
                toast.success("MOA file uploaded successfully");

                await new Promise(resolve => setTimeout(resolve, 3000));

                EditProfile(dispatch, formData)
                    .then(() => {
                        onSubmit(formData);
                        onClose();
                        GetCompanyProfile(dispatch);
                        navigate('/company/profile');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            toast.error("No file selected. Please choose a PDF file.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer position="top-right" autoClose={3000} />

            <Grid item xs={12} sm={12} container alignItems="center" gap={2}>
                <input
                    type="file"
                    accept=".pdf"
                    id="pdf-upload-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    name="pdf"
                />
                <Button
                    variant="contained"
                    size="medium"
                    style={{ backgroundColor: '#4cceac' }}
                    onClick={() => document.getElementById('pdf-upload-input').click()}
                >
                    Add File
                </Button>
                <span>{file ? file.name : ''}</span>
            </Grid>
            <Grid item container xs={12} sm={12} justifyContent="flex-end">
                <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    style={{
                        padding: "10px",
                        marginTop: "1rem",
                        backgroundColor: "#221769",
                        color: "#FFFFFF",
                    }}
                >
                    Submit
                </Button>
            </Grid>
        </form>
    );

}

export default CompanyMOAUpload