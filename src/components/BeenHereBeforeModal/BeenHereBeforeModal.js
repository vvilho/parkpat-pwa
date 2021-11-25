import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import logo from "../../pages/ParkkiPate-logo-retina-header.jpeg";
import React, {useEffect, useState} from "react";

const BeenHereBeforeModal = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('visitedBefore')) {
            return true;
        } else {
            localStorage.setItem('visitedBefore', true);
            handleOpen();
            return true;
        }
    }, []);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box id={'modalBox'}>
                <Grid container direction={'row'} textAlign={'center'}>
                    <Grid item xs={12} paddingTop={'1rem'}>
                        <img src={'/alarm.png'} width={'50%'} alt={'Picture of a alarm'}/>
                    </Grid>
                    <Grid item xs={12} style={{paddingBottom: '1rem'}}>
                        <Typography id="modal-modal-description"
                                    sx={{mt: 2, padding: '1rem'}}
                                    fontWeight={'bold'}>

                            Parkkipaikka on vain koulun opettajille!!!! ParkkiPate Oy
                            valvoo parkkipaikkaa ja
                            sakottaa autoja joilla ei ole lupalappua.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <img src={logo} alt={'Parkkipate logo'} width={'50%'}/>
                    </Grid>
                    <Grid item marginTop={'1rem'} xs={12}>
                        <Button variant="contained" fullWidth={true}
                                onClick={handleClose}>
                            Jatka
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}


export default BeenHereBeforeModal;
