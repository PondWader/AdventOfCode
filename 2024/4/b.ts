import fs from "fs";

const lines = fs.readFileSync('./4/input.txt', 'utf-8').trim().replaceAll('\r', '').split('\n');

function checkForMas(row: number, col: number, dirX: number, dirY: number) {
    try {
        const topCorner = lines[row + dirY][col + dirX];
        if (topCorner === 'S') return lines[row - dirY][col - dirX] === 'M';
        else if (topCorner === 'M') return lines[row - dirY][col - dirX] === 'S';
        return false;
    } catch {
        return false;
    }
}

let total = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === 'A') {
            if (checkForMas(i, j, -1, 1) && checkForMas(i, j, 1, 1)) total++;
        }
    }
}
console.log(total);