import fs from "fs";

const input = fs.readFileSync('./7/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const hands: {
    bid: number
    typePriority: number
    cards: string
}[] = [];

for (const line of lines) {
    const [hand, bid] = line.split(' ').map((v, i) => i === 1 ? + v : v) as [string, number];

    const numOfLabels: { [x: string]: number } = {};
    for (const label of hand) {
        if (!numOfLabels[label]) numOfLabels[label] = 0;
        numOfLabels[label]++;
    }

    const labelCountsArray = Object.values(numOfLabels);
    let typePriority = 0;
    while (labelCountsArray.length > 0) {
        const highestAmount = Math.max(...labelCountsArray);
        typePriority += highestAmount ** 2;
        labelCountsArray.splice(labelCountsArray.indexOf(highestAmount), 1);
    }

    hands.push({
        bid,
        typePriority,
        cards: hand
    })
}

const strengths = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

console.log(hands.sort((a, b) => {
    if (a.typePriority === b.typePriority) {
        for (let i = 0; i < 5; i++) {
            const aStrength = strengths.indexOf(a.cards[i]), bStrength = strengths.indexOf(b.cards[i]);
            if (aStrength > bStrength) return -1;
            else if (bStrength > aStrength) return 1;
        }
        return 0;
    }
    return a.typePriority - b.typePriority
}).map(hand => hand.bid).reduce((a, b, i) => a + b * (i + 1)))
