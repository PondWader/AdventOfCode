import fs from "fs";

const input = fs.readFileSync('./5/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const seedRangeValues = lines.shift()!.split(': ')[1].split(' ').map(v => +v);
const seedRanges: number[][] = [];
for (let i = 0; i < seedRangeValues.length; i += 2) seedRanges.push([seedRangeValues[i], seedRangeValues[i + 1]])

const mappings: number[][][] = lines.join('\n').trim().split('\n\n').map(map => {
    const mapLines = map.split('\n');
    mapLines.shift();
    return mapLines.map(line => line.split(' ').map(v => +v));
}).reverse();

for (let location = 0; ; location++) {
    let currentLoc = location;
    mappingsLoop:
    for (const mapping of mappings) {
        for (const map of mapping) {
            if (currentLoc >= map[0] && currentLoc <= map[0] + map[2]) {
                currentLoc = map[1] + currentLoc - map[0];
                continue mappingsLoop
            }
        }
    }

    if (seedRanges.some(([rangeStart, rangeSize]) => currentLoc >= rangeStart && currentLoc <= rangeStart + rangeSize)) {
        console.log(location)
        break
    }
}