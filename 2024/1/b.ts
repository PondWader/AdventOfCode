import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').trim().replaceAll('\r', '');

const listSplit = input.split('\n').map(l => l.split(/ +/));

const rightOccurences = new Map<number, number>();
listSplit.forEach(l => {
    const num = +l[1];
    rightOccurences.set(num, (rightOccurences.get(num) ?? 0) + 1)
});

console.log(listSplit.reduce((a, b, i) => a + (+b[0] * (rightOccurences.get(+b[0]) ?? 0)), 0));