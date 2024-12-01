import fs from "fs";

const input = fs.readFileSync('./9/input.txt', 'utf-8').replaceAll('\r', '');
const moves = input.split('\n');

type knot = {x: number, y: number, next: knot | null, position: number};

const headPos: knot = {x: 0, y: 0, next: null, position: 0};

const knots: knot[] = [];

for (let i = 0; i < 9; i++) {
    knots[i] = {
        x: 0,
        y: 0,
        next: knots[knots.length - 1] || headPos,
        position: i + 1
    }
}

const visitedPositions = new Set<string>();
visitedPositions.add('0,0');

const updateKnotPosition = (knot: knot) => {
    if (Math.abs(knot.next!.x - knot.x) > 1) {
        knot.x += knot.next!.x > knot.x ? 1 : -1;
        if (knot.next!.y !== knot.y) {
            knot.y += knot.next!.y > knot.y ? 1 : -1;
        }
    } else if (Math.abs(knot.next!.y - knot.y) > 1) {
        knot.y += knot.next!.y > knot.y ? 1 : -1;
        if (knot.next!.x !== knot.x) {
            knot.x += knot.next!.x > knot.x ? 1 : -1;
        }
    }
}

for (const move of moves) {
    const [direction, iterations] = move.split(' ').map(v => parseInt(v) || v) as ['R' | 'U' | 'L' | 'D', number];

    for (let i = 0; i < iterations; i++) {
        if (direction === 'R') headPos.x++;
        else if (direction === 'U') headPos.y++;
        else if (direction === 'L') headPos.x--;
        else if (direction === 'D') headPos.y--;

        for (const knot of knots) {
            updateKnotPosition(knot);
            if (knot.position === 9) {
                visitedPositions.add(`${knot.x},${knot.y}`);
            }
        }
    }
}

console.log(visitedPositions.size);