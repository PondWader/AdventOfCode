import fs from "fs";

const input = fs.readFileSync('./3/input.txt', 'utf-8').replaceAll('\r', '').trim();
const schematic = input.split('\n').map(row => row.split(''));

function checkIfAdjacentToSymbol(posX: number, posY: number) {
    for (let y = Math.max(posY - 1, 0); y <= Math.min(posY + 1, schematic.length - 1); y++) {
        for (let x = Math.max(posX - 1, 0); x <= Math.min(posX + 1, schematic[y].length - 1); x++) {
            const value = schematic[y][x];
            if (value !== '.' && Number.isNaN(+value)) return true;
        }
    }
    return false;
}

let total = 0;
for (let y = 0; y < schematic.length; y++) {
    let currentNum = '';
    let isAdjacentToSymbol = false;
    for (let x = 0; x < schematic[y].length; x++) {
        const value = schematic[y][x];
        if (Number.isNaN(+value)) {
            if (currentNum && isAdjacentToSymbol) total += +currentNum;
            currentNum = '';
            isAdjacentToSymbol = false;
            continue
        }
        currentNum += value;
        if (!isAdjacentToSymbol && checkIfAdjacentToSymbol(x, y)) isAdjacentToSymbol = true;
    }
    if (currentNum && isAdjacentToSymbol) total += +currentNum;
}
console.log(total)