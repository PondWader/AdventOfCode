import fs from "fs";

const input = fs.readFileSync('./4/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const copies = new Map<number, number>();
lines.forEach((line, i) => {
    let matchingNums = 0;
    const [winningNumbers, numsOnCard] = line.split(': ')[1].split(' | ').map(part => part.trim().split(/ +/));
    for (const num of numsOnCard) {
        if (winningNumbers.includes(num)) {
            matchingNums += 1;
        }
    }

    const copiesOfThisCard = (copies.get(i) ?? 0) + 1;
    for (let j = 0; j < matchingNums; j++) {
        const copiedCardNo = i + j + 1;
        copies.set(copiedCardNo, copies.has(copiedCardNo) ? copies.get(copiedCardNo)! + copiesOfThisCard : copiesOfThisCard)
    }
})

console.log(lines.length + [...copies.values()].reduce((a, b) => a + b))
