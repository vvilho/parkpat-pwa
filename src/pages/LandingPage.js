import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    createTheme,
    Grid,
    Modal,
    responsiveFontSizes, Stack,
    ThemeProvider,
    Typography,
    Divider,
    Card,
} from '@mui/material';

import SvgParkMap from '../components/SvgParkMap/SvgParkMap';
import Clock from 'react-digital-clock';
import AccessibleIcon from '@mui/icons-material/Accessible';
import logo from './ParkkiPate-logo-retina-header.jpeg';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Loader from '../components/Loader/Loader';
import './LandingPage.css';
import SunsetChecker from "../components/SunsetChecker/SunsetChecker";
import BeenHereBeforeModal from "../components/BeenHereBeforeModal/BeenHereBeforeModal";
import defaultState from "./defaultState";
import "@fontsource/heebo";
import "@fontsource/roboto";


let theme = createTheme({
    typography: {
        h1: {
            fontFamily: "Heebo",
        },
        h2: {
            fontFamily: "Heebo",
        },
        h3: {
            fontFamily: "Heebo",
        },
        h4: {
            fontFamily: "Heebo",
        },
        h5: {
            fontFamily: "Heebo",
        },
        h6: {
            fontFamily: "Heebo",
        },
        h7: {
            fontFamily: 'Roboto',
        },
        button: {
            fontFamily: "Heebo",
        },
        fontFamily: "Roboto",
    }
});

theme = responsiveFontSizes(theme);

const LandingPage = () => {
        /**
         * if you want to put on 'app off after sunset'-functionality, set variable "sunsetFuncOn" true
         * also add conditional rendering with variable 'sunHasSet'
         * to render <SunsetChecker sunriseUnix={sunrise}/> if true and normal code otherwise about on row 212
         *
         * And lastly uncomment two sunsetfunc useEffect()s from about row 150. Search #sunsetfunc with ctrl+f to find them
         *
         * @type {boolean} sunsetFuncOn
         */

        const sunsetFuncOn = false


        const [parkingState, setParkingState] = useState(defaultState);
        const [totalFreeSpaces, setTotalFreeSpaces] = useState(0);
        const [freeSpacesText, setFreeSpacesText] = useState({});
        const [freeInvaSpaces, setFreeInvaSpaces] = useState(0);
        const [invaSpacesText, setInvaSpacesText] = useState({});
        const [screenWidth, setScreenWidth] = useState(true);
        const [freeNormalSpaces, setFreeNormalSpaces] = useState(0);
        const [loading, setLoading] = useState(true);
        const [sunset, setSunset] = useState();
        const [sunrise, setSunrise] = useState();
        const [timeNow, setTimeNow] = useState();
        const [sunHasSet, setSunHasSet] = useState(false);


        // Initial call for fetch functions
        useEffect(() => {
            asyncFetch();
            if (sunsetFuncOn) fetchSunset();
            if (sunsetFuncOn) setTimeNow(Date.now() / 1000);


            const width = window.innerWidth;

            if (width > 599) {
                setScreenWidth(false);
            }
        }, []);


        // Check if inva spaces are occupied and show them separately
        useEffect(() => {
            const list = [parkingState.ID20, parkingState.ID27];
            const count = list.filter(item => !item).length;
            setFreeInvaSpaces(count);

            if (count === 2) {
                setInvaSpacesText({text: 'kaksi paikkaa vapaana', style: 'green'});
            } else if (count === 1) {
                setInvaSpacesText({text: 'yksi paikka vapaana', style: '#e7d213'});
            } else {
                setInvaSpacesText({text: 'ei yhtään paikkaa vapaana', style: 'red'});
            }
        }, [parkingState.ID27, parkingState.ID20]);

        // checks free spaces from parkingState object
        useEffect(() => {
            let freeTotalCount = 0;
            for (const [, value] of Object.entries(parkingState)) {
                if (!value) freeTotalCount++;
            }
            const freeNormalCount = freeTotalCount - freeInvaSpaces;
            if (freeNormalCount >= 5) {
                setFreeSpacesText({text: 'useita paikkoja vapaana', style: 'green'});
            } else if (freeNormalCount >= 3) {
                setFreeSpacesText({text: 'muutamia paikkoja vapaana', style: '#e7d213'});
            } else if (freeNormalCount === 2) {
                setFreeSpacesText({text: 'kaksi paikkaa vapaana', style: '#e7d213'});
            } else if (freeNormalCount === 1) {
                setFreeSpacesText({text: 'yksi paikka vapaana', style: '#e7d213'});
            } else {
                setFreeSpacesText({text: 'ei yhtään paikkaa vapaana', style: 'red'});
            }
            setTotalFreeSpaces(freeTotalCount);
            setFreeNormalSpaces(freeNormalCount);
            //setLoading(false);

        }, [freeInvaSpaces, parkingState]);


        // Every 5 seconds fetch parking data and set time now to state #sunsetfunc
        //
        //
        // <-----------uncomment these to make sunset functionality work------------>
        // useEffect(() => {
        //
        //     const timerInterval = setInterval(() => {
        //         asyncFetch();
        //         if(sunsetFuncOn) setTimeNow(Date.now()/1000);
        //
        //     }, 5000);
        //
        //     return () => clearInterval(timerInterval);
        // }, []);

        // Check if sun has set

        // useEffect(() => {
        //
        //
        //     if (timeNow - sunset >= 0 && timeNow >= sunrise) {
        //         setSunHasSet(true);
        //     } else {
        //         setSunHasSet(false)
        //     }
        //
        // }, [timeNow, sunset])
        // <------------------------^^^^-------------------------------------------->



    // Fetch parking data
        const asyncFetch = async () => {
            let data = {};

            try {
                const response = await fetch('/data/jsondata.json');
                const responseData = await response.json();
                data = responseData.response;
                const obj = Object.values(data?.body);
                const newObj = {};
                obj.map(x => {
                        newObj[`ID${x.id}`] = !!parseInt(x.status);
                    },
                );
                setParkingState(newObj);
            } catch (err) {
                // Tänne fetchaus virheet
                console.log('asyncFetch error', err.message);
            }
        };

        // Fetch sunset data

        const fetchSunset = async () => {
            const response = await fetch('/data/sunsetInfo.json');
            const responseData = await response.json();
            console.log('koira', responseData);

            setSunset(responseData?.sunset);
            setSunrise(responseData?.sunrise);

        }


        return (
            <Container id={'container'} disableGutters={screenWidth} maxWidth={'md'}
                       style={{display: 'flex', width: '100vw', height: '100vh'}}>
                <ThemeProvider theme={theme}>
                    <BeenHereBeforeModal/>
                    <>
                        <Grid container>
                            <Grid item sm={6}>
                                <Card elevation={5} id={'svgParkMapCard'}>
                                    <SvgParkMap object={parkingState}/>
                                </Card>
                            </Grid>
                            <Grid item sm={6}>
                                <Grid container id={'parkContentGridContainer'}>
                                    <Grid item xs={12} id={'parkContentGridItem'}>
                                        <Stack direction={'row'} justifyContent={'space-between'}
                                               alignItems={'self-end'} margin={'0 1rem'}>
                                            <Typography variant="h7">Vapaat paikat
                                                ({totalFreeSpaces})</Typography>
                                            <Box display={'flex'} alignItems={'self-end'}
                                                 width={'6rem'} justifyContent={'end'}>
                                                <AccessTimeIcon/>
                                                <Typography variant={'h7'} id={'clock'}>{<Clock
                                                    hour12={false}/>}</Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} margin={'1rem 0 0 0'}>
                                        <Stack direction={'row'} justifyContent={'space-between'}
                                               textAlign={'left'} margin={'0 1rem 1rem 1rem'}>
                                            <Stack direction={'row'} alignItems={'flex-end'}>
                                                <LocalParkingIcon sx={{
                                                    fontSize: '47.875px',
                                                    backgroundColor: '#2962ff',
                                                    color: 'white',
                                                    marginRight: '0.5rem',
                                                }}/>
                                                <Box>
                                                    <Typography variant="h5"
                                                                fontWeight={'bold'}
                                                                id='invaSpacesTitle'>Parkkipaikat</Typography>
                                                    <Typography variant="h7" id='freeSpacesText'
                                                    >{freeSpacesText?.text}</Typography>
                                                </Box>
                                            </Stack>

                                            <Box display={'flex'} alignItems={'flex-end'}>
                                                <Typography variant="h2"
                                                            color={freeSpacesText?.style}
                                                            id='freeSpacesNumber'>{freeNormalSpaces}</Typography>
                                            </Box>
                                        </Stack>
                                        <Divider variant={screenWidth ? 'fullWidth' : 'middle'}/>
                                    </Grid>
                                    <Grid item xs={12} margin={'1rem 0'}>
                                        <Stack direction={'row'} justifyContent={'space-between'}
                                               textAlign={'left'} margin={'0 1rem 1rem 1rem'}>
                                            <Stack direction={'row'} alignItems={'flex-end'}>
                                                <AccessibleIcon sx={{
                                                    fontSize: '47.875px',
                                                    backgroundColor: '#2962ff',
                                                    color: 'white',
                                                    marginRight: '0.5rem',
                                                }}/>
                                                <Box>
                                                    <Typography variant="h5"
                                                                fontWeight={'bold'}
                                                                id='invaSpacesTitle'>Invapaikat</Typography>
                                                    <Typography variant="h7" id='invaSpacesText'
                                                    >{invaSpacesText?.text}</Typography>
                                                </Box>
                                            </Stack>
                                            <Box display={'flex'} alignItems={'flex-end'}>
                                                <Typography variant="h2"
                                                            color={invaSpacesText?.style}
                                                            id='invaSpacesNumber'>{freeInvaSpaces}</Typography>
                                            </Box>
                                        </Stack>
                                        <Divider variant={screenWidth ? 'fullWidth' : 'middle'}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>

                </ThemeProvider>
            </Container>
        )
            ;
    }
;

export default LandingPage;
