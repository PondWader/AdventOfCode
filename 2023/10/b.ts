import fs from "fs";

const input = fs.readFileSync('./10/input.txt', 'utf-8').replaceAll('\r', '').trim();
const pipes = input.split('\n').map(l => l.split(''));

const moves = {
    '|': [[1, 0], [-1, 0]],
    '-': [[0, 1], [0, -1]],
    'L': [[-1, 0], [0, 1]],
    'J': [[-1, 0], [0, -1]],
    '7': [[1, 0], [0, -1]],
    'F': [[1, 0], [0, 1]],
} as { [x: string]: [[number, number], [number, number]] }

const followPipe = (prevX: number, prevY: number, x: number, y: number) => {
    const pipeMoves = moves[pipes[x][y]];
    const move = pipeMoves.find(([xChange, yChange]) => x + xChange !== prevX || y + yChange !== prevY)!;
    return [x + move[0], y + move[1]]
}

const startX = pipes.findIndex(row => row.includes('S'));
const startY = pipes[startX].indexOf('S');

const pipePositions = new Map<string, boolean>();

const displayPipes = () => console.log(pipes.map((l, x) =>
    l.map((c, y) => {
        //if (enclosedPos.has(`${x},${y}`)) return `\x1b[36;1m${c} \x1b[0m`;
        return pipePositions.has(`${x},${y}`) ? `\x1b[31;1m${c} \x1b[0m` : c + ' ';
    }
    ).join('')
).join('\n'))

for (const offset of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    let pipeX = startX + offset[0], pipeY = startY + offset[1];
    if (moves[pipes[pipeX][pipeY]].some(([xChange, yChange]) => startX - xChange === pipeX && startY - yChange === pipeY)) {
        pipePositions.set(`${startX},${startY}`, offset[0] === 1);
        let prevX = startX, prevY = startY;

        while (pipes[pipeX][pipeY] !== 'S') {
            pipePositions.set(`${pipeX},${pipeY}`, moves[pipes[pipeX][pipeY]].some(m => m[0] === 1));
            [prevX, prevY, pipeX, pipeY] = [pipeX, pipeY, ...followPipe(prevX, prevY, pipeX, pipeY)];
        }
        break
    }
}

const enclosedPos = new Set<string>();
let area = 0;
for (let x = 0; x < pipes.length; x++) {
    let enclosed = false;
    for (let y = 0; y < pipes[0].length; y++) {
        if (pipePositions.has(`${x},${y}`) && pipePositions.get(`${x},${y}`)) {
            enclosed = !enclosed;
        }
        else if (enclosed && !pipePositions.has(`${x},${y}`)) {
            area++;
            enclosedPos.add(`${x},${y}`)
        }
    }
}

console.log(pipes.map((l, x) =>
    l.map((c, y) => {
        if (enclosedPos.has(`${x},${y}`)) return `\x1b[36;1m${c}\x1b[0m`;
        return pipePositions.has(`${x},${y}`) ? `\x1b[31;1m${c}\x1b[0m` : c;
    }
    ).join('')
).join('\n'))

console.log(area);