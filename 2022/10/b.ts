import fs from "fs";

const input = fs.readFileSync('./10/input.txt', 'utf-8').replaceAll('\r', '');   
const lines = input.split('\n');

let currentPos = 0;
let x = 1;

const tick = (n = 1) => {
    for (let i = 0; i < n; i++) {
        if (currentPos - 1 <= x && x <= currentPos + 1) process.stdout.write('#');
        else process.stdout.write(' ');

        currentPos++;

        if (currentPos % 40 === 0) {
            process.stdout.write('\n');
            currentPos = 0;
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