import fs from "fs";

const input = fs.readFileSync('./4/input.txt', 'utf-8').replaceAll('\r', '');

const pairs = input.split('\n');

const getsNumsInRange = (range: string) => {
    const [start, end] = range.split('-').map(n => parseInt(n, 10));

    const nums = [];
    for (let i = start; i <= end; i++) {
        nums.push(i);
    }
    return nums;
}

let overlaps = 0;
for (const pair of pairs) {
    const [range1, range2] = pair.split(',').map(r => getsNumsInRange(r));

    if (range1.every(num => range2.includes(num)) || range2.every(num => range1.includes(num))) {
        overlaps++;
    }
}

console.log(overlaps);