import React from 'react';
import {Box, LinearProgress} from '@mui/material';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SemiCircleProgressBar from "react-progressbar-semicircle";


const ActiveTimeTracker = ({sunrise, sunset, isMobile}) => {
  const currentTime = Date.now() / 1000;
  const percentage = (((currentTime - sunrise) / (sunset - sunrise)) * 100).toFixed(0);
  console.log(percentage)
  return (
      <Box display='flex' alignItems={isMobile ? 'center' : 'flex-end'} justifyContent='center' width='100%'>
        <LightModeOutlinedIcon/>{isMobile ? <LinearProgress variant='determinate' value={percentage} sx={{width: '60%'}}/> : <SemiCircleProgressBar percentage={percentage} stroke={'black'}/>}<ModeNightOutlinedIcon/>
      </Box>
  )
}

export default ActiveTimeTracker;
