export default {
    steps: [
        { name: 'ANTE/BLINDS', cards: [], type: 'street' },
        { name: 'posts small blind', amount: 50, player: 1, type: 'action', allin: false },
        { name: 'posts big blind', amount: 100, player: 2, type: 'action', allin: false },
        { name: 'PRE-FLOP', cards: [], type: 'street' },
        { name: 'raises', amount: 600, player: 3, type: 'action', allin: false },
        { name: 'folds', amount: 0, player: 1, type: 'action', allin: false },
        { name: 'calls', amount: 500, player: 2, type: 'action', allin: false },
        { name: 'FLOP', cards: ['As', '9s', '8c'], type: 'street' },
        { name: 'checks', amount: 0, player: 2, type: 'action', allin: false },
        { name: 'bets', amount: 1500, player: 3, type: 'action', allin: false },
        { name: 'calls', amount: 1500, player: 2, type: 'action', allin: false },
        { name: 'TURN', cards: ['As', '9s', '8c', '9h'], type: 'street' },
        { name: 'checks', amount: 0, player: 2, type: 'action', allin: false },
        { name: 'checks', amount: 0, player: 3, type: 'action', allin: false },
        { name: 'RIVER', cards: ['As', '9s', '8c', '9h', '3s'], type: 'street' },
        { name: 'bets', amount: 6000, player: 2, type: 'action', allin: false },
        { name: 'raises', amount: 16400, player: 3, type: 'action', allin: true },
        { name: 'calls', amount: 10400, player: 2, type: 'action', allin: false },
        { name: 'SHOW DOWN', cards: ['As', '9s', '8c', '9h', '3s'], type: 'street' },
        { name: 'shows', amount: 0, player: 2, type: 'action', allin: false },
        { name: 'shows', amount: 0, player: 3, type: 'action', allin: false },
        { name: 'collected', amount: 37050, player: 2, type: 'action', allin: false },
        { name: 'SUMMARY', cards: ['As', '9s', '8c', '9h', '3s'], type: 'street' },
    ],
    players: [
        {
            id: 1,
            account: {
                name: 'James',
            },
            cards: ['5s', '7s'],
            combination: 'Ace high flush',
            position: 'big blind',
            seat: 1,
            stack: 7700,
        },
        {
            id: 2,
            account: {
                name: 'Teddy',
            },
            cards: ['Ad', 'Ah'],
            combination: 'Aces full of nines',
            position: 'small blind',
            seat: 2,
            stack: 22000,
        },
        {
            id: 3,
            account: {
                name: 'Mike',
            },
            cards: ['Ac', '9c'],
            combination: 'Nines full of aces',
            position: 'button',
            seat: 3,
            stack: 18500,
        },
    ],
    hero: 'Mike',
    board: ['As', '9s', '8c', '9h', '3s'],
    max: 3,
    smallblind: 50,
    bigblind: 100,
    level: 1,
    dealer: 3,
    pot: 37050,
};
