import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function Raffle() {
    const [participants, setParticipants] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [winners, setWinners] = React.useState('');
    
    return(
        <Grid container spacing={2}>
            <Grid item xs={5}>
                    <TextField
                        onChange={(e) => setParticipants(e.target.value)}
                        id='participants'
                        placeholder="Laita jokainen osallistuja omalle riveilleen"
                        multiline
                        rows={10}
                        fullWidth
                        required
                        />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    id='winners'
                    placeholder="Voittajat"
                    value={ winners }
                    multiline
                    rows={10}
                    fullWidth
                    inputProps={ { readOnly: true, } }
                    />
            </Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="stretch" spacing={2}>
                    <Grid item>
                            <TextField
                                onChange={(e) => setAmount(e.target.value) }  
                                type="number"
                                inputProps={{ min: "0", step: "1" }}
                                InputLabelProps={{ shrink: true }}
                                placeholder="1"
                                fullWidth
                                id="noOfWinners"
                                label="Montako voittajaa?"
                                />   
                    </Grid>
                    <Grid item>
                        <Button 
                            color="success"
                            className="Buttons"
                            variant="contained"
                            size="large"
                            onClick={() => setWinners(raffleMachine(participants, amount))}
                            >
                                Aloita
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

function raffleMachine(partList: string, noOfWinners: string) {
    var participants = partList.split('\n'); 
    participants = participants.filter(function( element ) {
        return element !== "";
    });

    //if the amount of winners is greater than the amount of participants, the amount will automatically be the same as the number of participants
    var no: number = +noOfWinners;  
    if (no > participants.length) {
        no = participants.length
    }

    var rng; //random number generator
    let winners: string[] = Array();
    //loop increments ONLY if the picked participant is not picked yet
    for (let i = 0; i < no;) {
        rng = Math.floor(Math.random() * participants.length);
        if (!winners.includes(participants[rng])) {
            winners[i] = participants[rng];
            i++; 
        }
    }
    return(winners.join('\n'));
}