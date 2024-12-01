import fs from "fs";

const input = fs.readFileSync('./5/input.txt', 'utf-8').replaceAll('\r', '');

const [crateArrangement, moves] = input.split('\n\n').map(a => a.split('\n'));

const cratePositions: {
    [key: number]: string[]
} = {};
const stackNums = crateArrangement.pop()!.split('   ').map(a => parseInt(a));

for (let i = 0; i < crateArrangement.length; i++) {
    let crateRow = crateArrangement[i];

    for (let j = 1; j <= stackNums.length; j++) {
        let crate = crateRow?.slice(1, 2).trim();
        crateRow = crateRow?.slice(4);
        
        if (!cratePositions[j]) cratePositions[j] = [];
        if (crate) cratePositions[j].push(crate);
    }
}

for (const move of moves) {
    const moveSplit = move.split(' ').map(a => parseInt(a));

    const amount = moveSplit[1];
    const startStack = moveSplit[3];
    const finishStack = moveSplit[5];

    for (let i = 0; i < amount; i++) {
        const crate = cratePositions[startStack].shift();
        cratePositions[finishStack].unshift(crate!);
    }
}

console.log(cratePositions);
console.log(Object.values(cratePositions).map(p => p.shift()).join(''))