import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').replaceAll('\r', '');

const elves: string[] = input.split('\n\n');

const elfCalories: number[] = [0];

for (const elf of elves) {
    const seperate = elf.split('\n').map(r => parseInt(r));
    const calories = seperate.reduce(
        (prevValue, currentValue) => prevValue + currentValue
    )
    
    elfCalories.push(calories);
}

elfCalories.sort((a, b) => a - b)

console.log(
    elfCalories.sort((a, b) => a - b).slice(elfCalories.length - 3).reduce(
        (prevValue, currentValue) => prevValue + currentValue
    )
)