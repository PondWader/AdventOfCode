import fs from "fs";

const input = fs.readFileSync('./3/input.txt', 'utf-8').replaceAll('\r', '').trim();
const schematic = input.split('\n').map(row => row.split(''));

function findAdjacentGear(posX: number, posY: number) {
    for (let y = Math.max(posY - 1, 0); y <= Math.min(posY + 1, schematic.length - 1); y++) {
        for (let x = Math.max(posX - 1, 0); x <= Math.min(posX + 1, schematic[y].length - 1); x++) {
            const value = schematic[y][x];
            if (value === '*') return `${x},${y}`;
        }
    }
    return undefined;
}

const gears = new Map<string, number[]>();
for (let y = 0; y < schematic.length; y++) {
    let currentNum = '';
    let adjacentGears = new Set<string>();
    const addGears = () => adjacentGears.forEach(gear => gears.has(gear) ? gears.get(gear)?.push(+currentNum) : gears.set(gear, [+currentNum]));

    for (let x = 0; x < schematic[y].length; x++) {
        const value = schematic[y][x];

        if (Number.isNaN(+value)) {
            addGears();
            adjacentGears = new Set<string>();
            currentNum = '';
            continue;
        }

        currentNum += value;
        const gearPos = findAdjacentGear(x, y);
        if (gearPos) adjacentGears.add(gearPos);
    }

    addGears();
}

let totalGearRatio = 0;
gears.forEach((numbers) => {
    if (numbers.length === 2) totalGearRatio += numbers.reduce((a, b) => a * b);
})
console.log(totalGearRatio);