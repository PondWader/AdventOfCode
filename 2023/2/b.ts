import fs from "fs";

const input = fs.readFileSync('./2/input.txt', 'utf-8').replaceAll('\r', '').trim();
const games = input.split('\n').map((line, i) => ({
    id: i + 1,
    sets: line.split(': ')[1].split('; ').map(setStr => {
        const colours = Object.fromEntries(setStr.split(', ').map(c => {
            const split = c.split(' ')
            return [split[1], +split[0]]
        }));
        return {
            red: colours.red ?? 0,
            green: colours.green ?? 0,
            blue: colours.blue ?? 0
        }
    })
}));

let totalPower = 0;
for (const game of games) {
    const min: { [x: string]: number } = {};
    for (const set of game.sets) {
        for (const [colour, amount] of Object.entries(set)) {
            if (amount > (min[colour] ?? 0)) min[colour] = amount;
        }
    }
    totalPower += Object.values(min).reduce((a, b) => a * b);
}
console.log(totalPower);