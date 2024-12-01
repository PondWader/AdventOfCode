import fs from "fs";

const input = fs.readFileSync('./14/input.txt', 'utf-8').replaceAll('\r', '');

const map = new Map<string, 'sand' | 'rock'>();

let lowestY = 0;
for (const path of input.split('\n')) {
    const points = path.split(' -> ').map(p => p.split(',').map(c => parseInt(c)));

    points.forEach((point, i) => {
        const [x, y] = point;
        if (!points[i + 1]) return;
        const [nextX, nextY] = points[i + 1];

        map.set(`${x},${y}`, 'rock')
        for (let xChange = nextX - x; xChange !== 0; xChange > 0 ? xChange-- : xChange++) {
            map.set(`${x + xChange},${y}`, 'rock');
        }
        for (let yChange = y - nextY; yChange !== 0; yChange > 0 ? yChange-- : yChange++) {
            map.set(`${x},${y - yChange}`, 'rock');
            if (y - yChange > lowestY) lowestY = y - yChange;
        }
    })
}

let restingSand = 0;
function dropSand(x: number, y: number): boolean {
    if (y > lowestY + 2) return false;

    let res = false;
    if (![
        [x, y + 1],
        [x - 1, y + 1],
        [x + 1, y + 1]
    ].some(([newX, newY]) => {
        if (map.get(`${newX},${newY}`) === undefined && newY !== lowestY + 2) {
            res = dropSand(newX, newY);
            return true
        }
        return false;
    })) {
        map.set(`${x},${y}`, 'sand');
        restingSand++;
        res = true;
        if (y === 0 && x === 500) res = false;
    }

    return res;
}

while (true) {
    if (!dropSand(500, 0)) break;
}
console.log(restingSand)