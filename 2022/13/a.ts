import fs from "fs";

type packetData = (number | packetData)[];

const input = fs.readFileSync('./13/input.txt', 'utf-8').replaceAll('\r', '');
const data: packetData[] = input.split('\n').filter(l => l !== '').map(l => JSON.parse(l));

const isCorrectOrder = (left: packetData, right: packetData): boolean | null => {
    if (left.length > 0 && right.length === 0) return false;

    for (let index = 0; index < right.length; index++) {
        if (index >= left.length) return true;
        const v = right[index];

        const leftValue = Array.isArray(v) ? (typeof left[index] === 'number' ? [left[index]] : left[index]) : left[index];
        const rightValue = Array.isArray(leftValue) ? (typeof v === 'number' ? [v] : v) : v;

        if (Array.isArray(rightValue)) {
            const res = isCorrectOrder(leftValue as packetData, rightValue as packetData)
            if (res !== null) return res;
        } else if (v < leftValue) return false;
        else if (v > leftValue) return true;

        if (left[index + 1] && !right[index + 1]) return false;
    }

    return null;
}

let correctIndicesSum = 0;
for (let i = 0; i < data.length; i += 2) {
    const left = data[i], right = data[i + 1];

    if (isCorrectOrder(left, right)) correctIndicesSum += (i / 2) + 1;
}

console.log(correctIndicesSum);