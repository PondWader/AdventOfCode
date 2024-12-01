import fs from "fs";

const input = fs.readFileSync('./9/input.txt', 'utf-8').replaceAll('\r', '');
const moves = input.split('\n');

const headPos = {x: 0, y: 0};
const tailPos = {x: 0, y: 0};

const visitedPositions = new Set<string>();
visitedPositions.add('0,0');

const updateTailPosition = () => {
    if (Math.abs(headPos.x - tailPos.x) > 1) {
        tailPos.x += headPos.x > tailPos.x ? 1 : -1;
        if (headPos.y !== tailPos.y) {
            tailPos.y += headPos.y > tailPos.y ? 1 : -1;
        }
    } else if (Math.abs(headPos.y - tailPos.y) > 1) {
        tailPos.y += headPos.y > tailPos.y ? 1 : -1;
        if (headPos.x !== tailPos.x) {
            tailPos.x += headPos.x > tailPos.x ? 1 : -1;
        }
    }
    visitedPositions.add(`${tailPos.x},${tailPos.y}`);
}

for (const move of moves) {
    const [direction, iterations] = move.split(' ').map(v => parseInt(v) || v) as ['R' | 'U' | 'L' | 'D', number];

    for (let i = 0; i < iterations; i++) {
        if (direction === 'R') headPos.x++;
        else if (direction === 'U') headPos.y++;
        else if (direction === 'L') headPos.x--;
        else if (direction === 'D') headPos.y--;

        updateTailPosition();
    }
}

console.log(visitedPositions.size);