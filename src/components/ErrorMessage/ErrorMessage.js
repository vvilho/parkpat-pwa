import {Box, Typography} from '@mui/material';
import React from 'react';

const ErrorMessage = ({online}) => {

  return (
      !online &&
      <Box id="errorMessageBox" position={'absolute'} width="100%" top="50%"
           left="50%" style={{
        backgroundColor: 'rgba(16,16,16,0.8)',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant={'h5'} color={'white'} fontWeight={'bold'}>Toimii vain verkkoyhteydellä!</Typography>
      </Box>

  );
};

export default ErrorMessage;
