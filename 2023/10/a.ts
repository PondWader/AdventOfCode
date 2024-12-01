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

for (const offset of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    let pipeX = startX + offset[0], pipeY = startY + offset[1];
    if (moves[pipes[pipeX][pipeY]].some(([xChange, yChange]) => startX - xChange === pipeX && startY - yChange === pipeY)) {
        let prevX = startX, prevY = startY;
        let moves = 1;
        while (pipes[pipeX][pipeY] !== 'S') {
            [prevX, prevY, pipeX, pipeY] = [pipeX, pipeY, ...followPipe(prevX, prevY, pipeX, pipeY)];
            moves++;
        }
        console.log(moves / 2)
        break
    }
}
