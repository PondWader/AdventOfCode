import fs from "fs";

const input = fs.readFileSync('./8/input.txt', 'utf-8').replaceAll('\r', '');

const trees = input.split('\n').map(row => row.split('').map(tree => parseInt(tree)));

let visibleTrees = (trees.length + trees[0].length) * 2 - 4;

const treeIsVisibleInDirection = (x: number, y: number, xChange: number, yChange: number) => {
    const treeHeight = trees[y][x];

    while (x !== 0 && x !== trees[0].length - 1 && y !== 0 && y !== trees.length - 1) {
        x += xChange;
        y -= yChange;

        if (trees[y][x] >= treeHeight) return false;
    }

    return true;
}

for (let x = 1; x < trees[0].length - 1; x++) {
    for (let y = 1; y < trees.length - 1; y++) {
        if (
            treeIsVisibleInDirection(x, y, 0, 1)
            || treeIsVisibleInDirection(x, y, 1, 0)
            || treeIsVisibleInDirection(x, y, 0, -1)
            || treeIsVisibleInDirection(x, y, -1, 0)
        ) {
            visibleTrees++;
        }
    }
}

console.log(visibleTrees);