// Function for picking a random winner among the participant list
export default function raffle(participants, winners) {
    if(winners > participants.length) {
        console.log(participants)
        console.log(winners)
        return ['Virhe!'];
    };

    const winnerIndexes = [];

    for(var i = 0; i < winners; i++) {
        const winner = () => {
            // Basic check does winner exist, so that there aren't duplicate winners
            let n;
            do {
                n = Math.floor(Math.random()*participants.length);      
            }
            while (winnerIndexes.includes(n));
            return n;
        }
        winnerIndexes.push(winner());
    }

    // Convert winner list's indexes into actual names
    const winnerList = () => {
        const list = [];
        winnerIndexes.forEach((winner) => {
            list.push(participants[winner]);
        })
        return list;
    }

    return winnerList();
}