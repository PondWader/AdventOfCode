import fs from "fs";

const input = fs.readFileSync('./13/input.txt', 'utf-8').replaceAll('\r', '').trim();
const sections = input.split('\n\n').map(v => v.split('\n'));

let total = 0;
sectionsLoop:
for (const section of sections) {
    for (let row = 0; row < section.length - 1; row++) {
        if (section.slice(row + 1, row * 2 + 2).every((v, i) => v === section[row - i])) {
            total += (row + 1) * 100;
            continue sectionsLoop;
        }
    }
    for (let col = 0; col < section[0].length - 1; col++) {
        if (section.every(line => line.slice(col + 1, col * 2 + 2).split('').every((v, i) => v === line[col - i]))) {
            total += col + 1;
            continue sectionsLoop;
        }
    }
}
console.log(total);