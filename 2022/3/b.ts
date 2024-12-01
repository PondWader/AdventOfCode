import fs from "fs";

const input: string = fs.readFileSync('./3/input.txt', 'utf-8').replaceAll('\r', '');

let rucksacks = input.split('\n');

let prioritySum = 0;

// Step every 3 rucksacks
for (let i = 0; i < rucksacks.length; i += 3) {
    const firstRuckSack = rucksacks[i].split('');
    const secondRuckSack = rucksacks[i + 1].split('');
    const thirdRuckSack = rucksacks[i + 2].split('');

    for (const item of firstRuckSack) {
        if (secondRuckSack.includes(item) && thirdRuckSack.includes(item)) {
            // Add to total sum
            const charCode = item.charCodeAt(0);
            if (charCode < 97) prioritySum += 26 + charCode - 64 // Uppercase
            else prioritySum += charCode - 96 // Lowercase

            break;
        }
    }
}

console.log(prioritySum);