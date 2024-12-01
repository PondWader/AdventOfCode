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

const bag = {
    red: 12,
    green: 13,
    blue: 14
}

let totalIds = 0;
gameLoop:
for (const game of games) {
    for (const set of game.sets) {
        if (set.red > bag.red || set.green > bag.green || set.blue > bag.blue) continue gameLoop;
    }
    totalIds += game.id;
}
console.log(totalIds)