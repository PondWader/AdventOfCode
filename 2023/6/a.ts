import fs from "fs";

const input = fs.readFileSync('./6/input.txt', 'utf-8').replaceAll('\r', '').trim();

const times = input.split('\n')[0].split(/Time: +/)[1].split(/ +/).map(v => +v);
const distances = input.split('\n')[1].split(/Distance: +/)[1].split(/ +/).map(v => +v);

let combinationsMultiple = 1;
for (let i = 0; i < times.length; i++) {
    const time = times[i], distanceToBeat = distances[i];

    let combinations = 0;
    for (let j = 0; j < time; j++) {
        if ((time - j) * j > distanceToBeat) combinations++
    }
    combinationsMultiple *= combinations
}
console.log(combinationsMultiple);