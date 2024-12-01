import fs from "fs";

const input = fs.readFileSync('./12/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

function numOfCombinations(springs: string, arrangement: number[], cache?: Map<string, number>): number {
    if (arrangement.length === 0 || springs.length === 0) return 0;
    cache ??= new Map();

    let combinations = 0;
    let currentLen = 0;
    let forcedPosition = -1;
    for (let i = 0; i < springs.length; i++) {
        if (springs[i] === '?' || springs[i] === '#') currentLen++;
        else currentLen = 0;
        if (springs[i] === '#' && forcedPosition === -1) forcedPosition = i;
        if (forcedPosition !== -1 && i > forcedPosition + arrangement[0]) return combinations;

        if (currentLen === arrangement[0] && (springs.length === i + 1 || springs[i + 1] === '.' || springs[i + 1] === '?')) {
            if (arrangement.length === 1) {
                if (springs.slice(i + 1).includes('#')) {
                    currentLen--;
                    if (forcedPosition !== -1 && forcedPosition === i - currentLen) return 0;
                    continue;
                }
                combinations++
            }
            else {
                const innerSprings = springs.slice(i + 2);
                const cacheName = `${innerSprings}${arrangement.join(',')}`;
                let n;
                if (cache.has(cacheName)) n = cache.get(cacheName)!;
                else {
                    n = numOfCombinations(innerSprings, arrangement.slice(1), cache);
                    cache.set(cacheName, n);
                }
                combinations += n;
            }
        }
        if (currentLen === arrangement[0]) {
            currentLen--;
            if (forcedPosition !== -1 && forcedPosition === i - currentLen) break;
        }
    }

    return combinations
}

let totalCombinations = 0;
for (const line of lines) {
    const [springs, arrangement] = line.split(' ').map((v, i) => i === 1 ? Array(5).fill(v).flatMap(v => v.split(',')).map(v => +v) : v) as [string, number[]];
    totalCombinations += numOfCombinations(Array(5).fill(springs).join('?'), arrangement)
}
console.log(totalCombinations);