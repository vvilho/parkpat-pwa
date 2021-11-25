import {Box} from '@mui/material';
import React from 'react';

const ErrorMessage = ({online}) => {

  return (
      !online &&
      <Box id="errorMessageBox" position={'absolute'} width="100%" top="50%"
           left="50%" style={{
        backgroundColor: 'rgba(16,16,16,0.8)',
        transform: 'translate(-50%, -50%)',
      }}>
        <img src={'/giphy.gif'} width={'100%'}/>
      </Box>

  );
};

export default ErrorMessage;
