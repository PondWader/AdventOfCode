import fs from "fs";

const input = fs.readFileSync('./6/input.txt', 'utf-8').replaceAll('\r', '');
const chars = input.split('');

for (let i = 0; i < chars.length; i++) {
    const group = chars.slice(i, i + 4);
    
    if (group.length === 4 && group.every((c, index) => group.indexOf(c) === index)) {
        console.log(i + 4);
        break;
    }
}