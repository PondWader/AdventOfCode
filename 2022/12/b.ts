import fs from "fs";

const input = fs.readFileSync('./12/input.txt', 'utf-8').replaceAll('\r', '');

const grid = input.split('\n').map(l => l.split(''));
const endLoc = { x: grid.find(l => l.includes('E'))!.indexOf('E'), y: grid.findIndex(l => l.includes('E')) };

const heights = grid.map(l => l.map(c => (c === 'S' ? 'a' : c === 'E' ? 'z' : c).charCodeAt(0)));

const getMoves = (x: number, y: number) => {
    const height = heights[y][x];

    return [
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x + 1, y },
        { x: x - 1, y }
    ].filter(move => {
        return move.x >= 0 && move.x < heights[0].length && move.y >= 0 && move.y < heights.length
         && heights[move.y][move.x] <= height + 1
         && !visitedLocations.has(`${move.x},${move.y}`);
    })
}

const currentPositions = new Set(
    heights
    .map((row, y) => row.map((_, x) => ({ x, y })).filter(pos => heights[pos.y][pos.x] === 97))
    .flat()
);

const visitedLocations = new Set([...currentPositions].map(pos => `${pos.x},${pos.y}`));

let currentMoves = 0;
while (currentPositions.size !== 0) {
    currentMoves++;

    for (const position of [...currentPositions]) {
        currentPositions.delete(position);
        const moves = getMoves(position.x, position.y);

        moves.forEach(pos => {
            visitedLocations.add(`${pos.x},${pos.y}`);
            currentPositions.add(pos);

            if (pos.x === endLoc.x && pos.y === endLoc.y) {
                console.log(`Found route with ${currentMoves} moves.`);
                process.exit();
            }
        })
    }
}