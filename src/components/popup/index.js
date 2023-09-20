import { useTheme } from '@emotion/react';
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
import Close from '@mui/icons-material/Close';

const PopUp = ({ title, children, openPopup, setOpenup }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Dialog open={openPopup}>
            <DialogTitle sx={{ backgroundColor: colors.primary[500] }}>
                <div className='flex'>
                    <Typography variant='h4' sx={{ color: "white", flexGrow: 1 }}>{title}</Typography>
                    <Button onClick={() => setOpenup(false)} >
                        <Close style={{ color: "white" }} />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default PopUp