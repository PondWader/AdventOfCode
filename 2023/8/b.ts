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

const positions = [...map.keys()].filter(p => p.endsWith('A'));
const movesUntilDestination: number[] = [];
let moves = 0;
for (let i = 0; positions.length > 0; i++) {
    if (i >= instructions.length) i = 0;
    moves++;

    const positionsToRemove: number[] = [];
    positions.forEach((pos, index) => {
        const [left, right] = map.get(pos)!;
        positions[index] = instructions[i] === 'L' ? left : right;

        if (positions[index].endsWith('Z')) {
            movesUntilDestination.push(moves);
            positionsToRemove.push(index);
        }
    })

    positionsToRemove.forEach(index => positions.splice(index, 1))
}

const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

console.log(movesUntilDestination.reduce((a, b) => lcm(a, b)));