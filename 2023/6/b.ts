import fs from "fs";

const input = fs.readFileSync('./6/input.txt', 'utf-8').replaceAll('\r', '').trim();

const time = +input.split('\n')[0].split(/Time: +/)[1].replaceAll(' ', '');
const distance = +input.split('\n')[1].split(/Distance: +/)[1].replaceAll(' ', '');

let combinations = 0;
for (let j = 0; j < time; j++) {
    if ((time - j) * j > distance) combinations++
}
console.log(combinations);