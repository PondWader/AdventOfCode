import fs from "fs";

const input = fs.readFileSync('./10/input.txt', 'utf-8').replaceAll('\r', '');   
const lines = input.split('\n');

let currentCycle = 0;
let x = 1;

let strengthSum = 0;

const tick = (n = 1) => {
    for (let i = 0; i < n; i++) {
        currentCycle++;
        if (currentCycle % 20 === 0 && currentCycle % 40 !== 0) {
            strengthSum += currentCycle * x;
        }
    }
}

for (const line of lines) {
    const [operation, arg] = line.split(' ');

    switch(operation) {
        case "noop":
            tick();
            break;

        case "addx":
            tick(2);
            x += parseInt(arg);
            break;
    }
}

console.log(strengthSum);