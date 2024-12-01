import fs from "fs";

const input = fs.readFileSync('./1/input.txt', 'utf-8').replaceAll('\r', '');

const elves: string[] = input.split('\n\n');

let highestCalories = 0;

for (const elf of elves) {
    const seperate = elf.split('\n').map(r => parseInt(r));
    const calories = seperate.reduce(
        (prevValue, currentValue) => prevValue + currentValue
    )
    
    if (calories > highestCalories) highestCalories = calories
}

console.log(highestCalories)