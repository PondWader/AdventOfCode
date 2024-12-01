import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

let total = 0;
for (const line of lines) {
    let first: string | undefined;
    let last: string | undefined;
    for (let i = 0; i < line.length; i++) {
        if (!first && !Number.isNaN(+line[i])) first = line[i];

        const lastIndex = line.length - i - 1;
        if (!last && !Number.isNaN(+line[lastIndex])) last = line[lastIndex];
    }
    total += +`${first! + last!}`;
}
console.log(total)