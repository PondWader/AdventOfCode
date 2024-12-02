import fs from "fs";

const input = fs.readFileSync('./2/input.txt', 'utf-8').trim().replaceAll('\r', '');

function isSafe(levels: number[], isFirst = true): boolean {
    let lastVal = levels[0];
    let direction = levels[1] - levels[0];
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - lastVal;
        if (Math.abs(diff) > 3 || direction * diff < 1) {
            if (isFirst) {
                for (let j = 0; j < 3; j++) {
                    if (isSafe(levels.toSpliced(i - j, 1), false)) return true;
                }
            }
            return false;
        }
        lastVal = levels[i];
    }
    return true;
}

console.log(input.split('\n').filter(report => isSafe(report.split(' ').map(v => +v))).length);