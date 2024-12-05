import fs from "fs";

const lines = fs.readFileSync('./4/input.txt', 'utf-8').trim().replaceAll('\r', '').split('\n');

function checkForXmas(row: number, col: number, dirX: number, dirY: number) {
    for (let i = 0; i < 3; i++) {
        row += dirY, col += dirX;
        if (row >= lines.length || row < 0 || col >= lines[row].length) return false;
        if ('MAS'[i] !== lines[row][col]) return false;
    }
    return true;
}

function searchForXmas(row: number, col: number) {
    let occurences = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (checkForXmas(row, col, i, j)) occurences++;
        }
    }
    return occurences;
}

let total = 0;
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === 'X') {
            total += searchForXmas(i, j);
        }
    }
}
console.log(total);