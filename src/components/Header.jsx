import React, { useState } from 'react';
import { 
    Typography, 
    Container, 
    Box, 
} from '@mui/material';

const Header = () => {
  return (
        <Container maxWidth="md">
            <Box textAlign="center" my={4}>
                <Typography 
                    variant="h3" 
                    gutterBottom
                >
                    Arpakone
                </Typography>
            </Box>
        </Container>
  );
};

export default Header;
