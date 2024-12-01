import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').trim().replaceAll('\r', '');

const listSplit = input.split('\n').map(l => l.split(/ +/));

const leftList = listSplit.map(l => +l[0]).sort((a, b) => a - b);
const rightList = listSplit.map(l => +l[1]).sort((a, b) => a - b);

console.log(leftList.reduce((a, b, i) => a + Math.abs(b - rightList[i]), 0));
