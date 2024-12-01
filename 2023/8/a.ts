import fs from "fs";

const input = fs.readFileSync('./8/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const instructions = lines.shift()!;
lines.shift();

const map = new Map<string, [string, string]>();
for (const line of lines) {
    const [pos, left, right] = line.split(/ = \(|, |\)/);
    map.set(pos, [left, right]);
}

let currentPos = 'AAA';
let moves = 0;
for (let i = 0; ; i++) {
    if (i >= instructions.length) i = 0;
    const [left, right] = map.get(currentPos)!;
    currentPos = instructions[i] === 'L' ? left : right;
    moves++;

    if (currentPos === 'ZZZ') {
        console.log(moves);
        break;
    }
}
