import fs from "fs";

const input = fs.readFileSync('./11/input.txt', 'utf-8').replaceAll('\r', '').trim();
const image = input.split('\n').map(l => l.split(''));

const galaxies = image.flatMap((row, x) => row.map((c, y) => c === '#' ? [x, y] : undefined)).filter(v => !!v) as [number, number][];

const emptyDistance = 1000000 - 1;
let xOffset = 0, yOffset = 0;
for (let a = 0; a < image.length; a++) {
    let emptyRowX = true, emptyRowY = true;
    for (let b = 0; b < image.length; b++) {
        if (image[a][b] === '#') emptyRowX = false;
        if (image[b][a] === '#') emptyRowY = false;
        if (!emptyRowX && !emptyRowY) break;
    }
    if (emptyRowX) {
        for (const galaxy of galaxies) {
            if (galaxy[0] > a + xOffset) {
                galaxy[0] += emptyDistance
            }
        }
        xOffset += emptyDistance;
    };
    if (emptyRowY) {
        for (const galaxy of galaxies) {
            if (galaxy[1] > a + yOffset) {
                galaxy[1] += emptyDistance
            }
        }
        yOffset += emptyDistance;
    }
}

let totalDist = 0;
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i; j < galaxies.length; j++) {
        totalDist += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
    }
}
console.log(totalDist)