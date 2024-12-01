import fs from "fs";

const input = fs.readFileSync('./9/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

function predictNext(arr: number[]): number {
    if (arr.every(v => v === 0)) return 0;

    const differences: number[] = [];
    for (let i = 1; i < arr.length; i++) {
        differences.push(arr[i] - arr[i - 1]);
    }
    return arr[0] - predictNext(differences);
}

console.log(
    lines.map(line => predictNext(line.split(' ').map(v => + v)))
        .reduce((a, b) => a + b)
)
