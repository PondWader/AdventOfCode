import fs from "fs";

const input = fs.readFileSync('./11/input.txt', 'utf-8').replaceAll('\r', '').trim();
const image = input.split('\n').map(l => l.split(''));

const emptyRows: ['x' | 'y', number][] = [];
for (let a = 0; a < image.length; a++) {
    let emptyRowX = true, emptyRowY = true;
    for (let b = 0; b < image.length; b++) {
        if (image[a][b] === '#') emptyRowX = false;
        if (image[b][a] === '#') emptyRowY = false;
        if (!emptyRowX && !emptyRowY) break;
    }
    if (emptyRowX) emptyRows.push(['x', a]);
    if (emptyRowY) emptyRows.push(['y', a]);
}

let xOffset = 0, yOffset = 0;
for (const [axis, coord] of emptyRows) {
    if (axis === 'x') {
        image.splice(coord + xOffset, 0, '.'.repeat(image[0].length).split(''));
        xOffset++;
    }
    else if (axis === 'y') {
        for (let x = 0; x < image.length; x++) image[x].splice(coord + yOffset, 0, '.');
        yOffset++;
    }
}

const galaxies = image.flatMap((row, x) => row.map((c, y) => c === '#' ? [x, y] : undefined)).filter(v => !!v) as [number, number][];

let totalDist = 0;
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i; j < galaxies.length; j++) {
        totalDist += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
    }
}
console.log(totalDist)