import fs from "fs";

const input = fs.readFileSync('./3/input.txt', 'utf-8').trim().replaceAll('\r', '');

let mulEnabled = true;
console.log(input.match(/mul\([0-9]+,[0-9]+\)|do(n't)?\(\)/g)!.reduce((a, b) => {
    if (b === 'do()') mulEnabled = true;
    else if (b === "don't()") mulEnabled = false;
    else if (mulEnabled) {
        const commaSplit = b.slice(4, -1).split(',');
        return a + +commaSplit[0] * +commaSplit[1];
    }
    return a;
}, 0));