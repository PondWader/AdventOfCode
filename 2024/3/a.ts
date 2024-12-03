import fs from "fs";

const input = fs.readFileSync('./3/input.txt', 'utf-8').trim().replaceAll('\r', '');

console.log(input.match(/mul\([0-9]+,[0-9]+\)/g)!.reduce((a, b) => {
    const commaSplit = b.slice(4, -1).split(',');
    return a + +commaSplit[0] * +commaSplit[1];
}, 0));