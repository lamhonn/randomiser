import React, { useEffect, useState } from 'react';
import { 
    TextField,
    Typography, 
    Button, 
    Container, 
    FormControl, 
    InputLabel, 
    OutlinedInput, 
    Grid,
    FormControlLabel,
    Switch,
    CircularProgress,
    Modal,
    Box
} from '@mui/material';
import ConfettiExplosion from 'react-confetti-explosion';

import raffle from '../utils/raffle';

const Randomiser = () => {
    const [participants, setParticipants] = useState('');
    const [winners, setWinners] = useState('');
    const [number, setNumber] = useState(1);
    
    const [delayOn, setDelayOn] = useState(false);

    const [winnerDialog, setWinnerDialog] = useState(false);
    const [dialogWinners, setDialogWinners] = useState('');

    const [shuffling, setShuffling] = useState(false);
    
    const [confetti, setConfetti] = useState(false);

    var drumroll = new Audio('https://cdn.freesound.org/sounds/191/191718-4a9c9bdc-1d7b-408f-acc1-e40eef59543d?filename=191718__adriann__drumroll.wav');

    const handleCheckboxChange = (event) => {
        setDelayOn(event.target.checked);
    };

    const handleSubmit = () => {
        // Parced participant list, filter any whitespace-only lines
        const parts = participants.split('\n').filter(item => item.match(/[\s\S]/g));
        const list = raffle(parts, number);
        const winnerList = list.join('\n');
        setDialogWinners(list.join(', '));
        console.log(list);

        if(delayOn && parts.length >= number) {
            setShuffling(true);
            drumroll.play();
            setTimeout(() => {
                setConfetti(true);
                setShuffling(false);
                setWinnerDialog(true);
            }, 4200)
        }
        
        setConfetti(false);
        setWinners(winnerList);
    };

    return (
        <Container maxWidth="md">
            {
                confetti &&
                <ConfettiExplosion
                    particleCount={200}
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            }

            <Modal
                open={winnerDialog}
                onClose={() => {setWinnerDialog(false)}}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {xs:'75%', md: 400},
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Voittaja(t):
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {dialogWinners}
                    </Typography>
                </Box>
            </Modal>
            
            <Grid container justifyContent="center" alignItems="center" spacing={2}>

                {shuffling ?

                <Grid item xs={12} md={6}>
                    <>
                        <Typography variant='h5'>
                            Arvonta käynnissä...
                        </Typography>
                        <CircularProgress
                        size={75}
                        sx={{
                            my: 2
                        }}
                        />
                    </>
                </Grid>
                :
                <>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Osallistujat (erota osallistujat rivinvaihdolla)"
                        variant="outlined"
                        multiline
                        rows={8}
                        fullWidth
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        disabled={shuffling}
                        sx={{
                            '& .MuiInputBase-root': {
                              borderRadius: '8px',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Voittajat"
                        variant="outlined"
                        multiline
                        rows={8}
                        fullWidth
                        value={winners}
                        disabled
                        sx={{
                            '& .MuiInputBase-root': {
                              borderRadius: '8px',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <TextField
                            id="number-input"
                            type="number"
                            step={1}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            inputProps={{ min: 0 }}
                            label="Montako voittajaa?"
                            disabled={shuffling}
                            fullWidth
                            sx={{
                                '& .MuiInputBase-root': {
                                  borderRadius: '8px',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                },
                              }}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                            sx={{
                                height: 50,
                                backgroundColor: '#3880ff',
                                color: 'white',
                                '&:hover': {
                                backgroundColor: '#2979ff',
                                },
                            }}
                            disabled={shuffling}
                        >
                        Aloita arvonta
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControlLabel
                            control={
                                <Switch checked={delayOn} onChange={handleCheckboxChange} />
                            }
                            label="Tee arvonnasta jännittävä"
                            disabled={shuffling}
                        />
                    </Grid>
                </>
                }
            </Grid>
        </Container>
    );
};

export default Randomiser;
