import {Grid, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useEffect, useState} from "react";
import Moment from 'react-moment';
import 'moment-timezone';
import {ReactComponent as SunsetSvg} from './sunset.svg';
import './sunset.css'


Moment.globalFormat = 'HH:mm';
Moment.globalTimezone = "Europe/Helsinki";


const useStyles = makeStyles({

    svg: {
        paddingBottom: '5rem',
        paddingTop: '5rem'
    },


    typography: {
        root: {
            fontFamily: 'IBM Plex Mono !important',
        }
    }

});




const isSunsetTrue = () => {
    return false
}


const SunsetChecker = () => {
    const classes = useStyles();

    const [sunset, setSunset] = useState();
    const [sunrise, setSunrise] = useState();
    const [timeNow, setTimeNow] = useState();


    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeNow(Date.now());
            console.log('on yli auringonlaskun', timeNow,sunset)

            if (timeNow - sunset >= 0) {
                console.log('on yli auringonlaskun', timeNow,sunset)
            }
        }, 5000);

        return () => clearInterval(timerInterval);
    }, [])


    const fetchSunset = async () => {
        const response = await fetch('/data/sunsetInfo.json');
        const responseData = await response.json();
        console.log(responseData);
        setSunset(responseData.sunset);
        setSunrise(responseData.sunrise);
    }

    useEffect(() => {
        fetchSunset();
    }, []);


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
                            unix>{sunrise}</Moment>}. </Typography>
                    </Grid>


                </Grid>


            </Grid>
        </>
    )
}


export {SunsetChecker, isSunsetTrue};
