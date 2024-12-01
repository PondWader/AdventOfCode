// My original solution allowed me to change the condition to just a find check for part b
// it's slightly more flexible without having to think and without knowing what the next part would be I decided to just go with it
// Essentially my original solution saved me some head scratching
// However, this solution is undoubtedly more efficient

import fs from "fs";

const input = fs.readFileSync('./4/input.txt', 'utf-8').replaceAll('\r', '');

const pairs = input.split('\n');

let overlaps = 0;
for (const pair of pairs) {
    const ranges = pair.split(',');
    const range1 = ranges[0].split('-').map(num => parseInt(num));
    const range2 = ranges[1].split('-').map(num => parseInt(num));

    if ((range1[0] <= range2[0] && range1[1] >= range2[1]) || (range2[0] <= range1[0] && range2[1] >= range1[1])) {
        overlaps++;
    }
}

console.log(overlaps);