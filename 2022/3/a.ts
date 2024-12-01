import fs from "fs";

const input: string = fs.readFileSync('./3/input.txt', 'utf-8').replaceAll('\r', '');

const lines = input.split('\n');

let prioritySum = 0;
for (const line of lines) {
    const firstCompartment = line.slice(0, line.length / 2).split('');
    const secondCompartment = line.slice(line.length / 2).split('');

    for (const item of firstCompartment) {
        if (secondCompartment.includes(item)) {
            // Is duplicate
            const charCode = item.charCodeAt(0);
            if (charCode < 97) prioritySum += 26 + charCode - 64 // Uppercase
            else prioritySum += charCode - 96 // Lowercase

            break;
        }
    }
}

console.log(prioritySum);