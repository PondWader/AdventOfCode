import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

let total = 0;
for (const line of lines) {
    let first: string | undefined;
    let last: string | undefined;
    const wordIndexes = numberWords.map(nw => line.indexOf(nw))
    const lastWordIndexes = numberWords.map(nw => line.lastIndexOf(nw))
    for (let i = 0; i < line.length; i++) {
        if (!first && !Number.isNaN(+line[i])) first = line[i];
        else if (!first && wordIndexes.indexOf(i) !== -1) first = (wordIndexes.indexOf(i)).toString()

        const lastIndex = line.length - i - 1
        if (!last && !Number.isNaN(+line[lastIndex])) last = line[lastIndex];
        else if (!last && lastWordIndexes.indexOf(lastIndex) !== -1) last = (lastWordIndexes.indexOf(lastIndex)).toString()
    }
    total += +`${first! + last!}`;
}
console.log(total)