import fs from "fs";

const input = fs.readFileSync('./4/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

let points = 0;
for (const line of lines) {
    let pointsFromCard = 0;
    const [winningNumbers, numsOnCard] = line.split(': ')[1].split(' | ').map(part => part.trim().split(/ +/));
    for (const num of numsOnCard) {
        if (winningNumbers.includes(num)) {
            if (pointsFromCard === 0) pointsFromCard = 1;
            else pointsFromCard *= 2;
        }
    }
    points += pointsFromCard;
}
console.log(points);