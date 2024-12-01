import fs from "fs";

const input: string = fs.readFileSync('./2/input.txt', 'utf-8').replaceAll('\r', '');

const games = input.split('\n');

let totalScore = 0;

const additionalScores: {[key: string]: number} = {
    'Rock': 1,
    'Paper': 2,
    'Scissors': 3
}

// What each play beats
const beats: {[key: string]: string} = {
    'Rock': 'Scissors',
    'Scissors': 'Paper',
    'Paper': 'Rock'
}

for (const game of games) {
    const [opponentsPlay, yourPlay] = game.split(' ').map(p => {
        return {
            'A': 'Rock',
            'B': 'Paper',
            'C': 'Scissors',
            'X': 'Rock',
            'Y': 'Paper',
            'Z': 'Scissors'
        }[p];
    }) as [string, string];

    const gameStatus = opponentsPlay === yourPlay ? 'draw' : beats[yourPlay] === opponentsPlay ? 'win' : 'loss';

    const gameScore = (gameStatus === 'win' ? 6 : gameStatus === 'draw' ? 3 : 0) + additionalScores[yourPlay];

    totalScore += gameScore;
}

console.log(totalScore);