import fs from "fs";

const input = fs.readFileSync('./2/input.txt', 'utf-8').trim().replaceAll('\r', '');

console.log(input.split('\n').filter(report => {
    const levels = report.split(' ').map(v => +v);
    let lastVal = levels[0];
    let direction = levels[1] - levels[0];
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - lastVal;
        if (Math.abs(diff) > 3 || direction * diff < 1) {
            return false;
        }
        lastVal = levels[i];
    }
    return true;
}).length);