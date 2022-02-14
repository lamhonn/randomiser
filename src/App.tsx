import React from 'react';
import logo from './logo.svg';
import '../src/components/raffle';
import './App.css';
import AppBar from '@mui/material/AppBar'; 
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Raffle from '../src/components/raffle';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" id="menubar">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tutin arpakone
        </Typography>
      </Toolbar>
    </AppBar>
    <div className="content">
      <Raffle />
    </div>
  </Box>
  );
}

export default App;
