import {Grid, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useEffect, useState} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import {ReactComponent as SunsetSvg} from './sunset.svg';
import './sunset.css'
import "@fontsource/heebo";

Moment.globalFormat = 'HH:mm';
Moment.globalTimezone = "Europe/Helsinki";


const useStyles = makeStyles({

    svg: {
        paddingBottom: '5rem',
        paddingTop: '5rem'
    },


    typography: {
        root: {
            fontFamily: 'Heebo',
        }
    }

});


const SunsetChecker = (props) => {
    const classes = useStyles();



    return (
        <>
            <Grid container justifyContent={"center"}>
                <Grid item className={classes.svg}>
                    <SunsetSvg/>
                </Grid>
                <Grid className={classes.typography} container direction={"column"} spacing={1}>


                    <Grid item>
                        <Typography variant={'h6'}>On pimeää...</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h6'}>Nähdään taas huomenna kello {<Moment
                            unix>{props.sunriseUnix}</Moment>}. </Typography>
                    </Grid>


                </Grid>


            </Grid>
        </>
    )
}


export default SunsetChecker;
