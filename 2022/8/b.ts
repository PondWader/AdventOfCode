import fs from "fs";

const input = fs.readFileSync('./8/input.txt', 'utf-8').replaceAll('\r', '');

const trees = input.split('\n').map(row => row.split('').map(tree => parseInt(tree)));

const countVisibleTreesInDirection = (x: number, y: number, xChange: number, yChange: number) => {
    const treeHeight = trees[y][x];

    let visibleTrees = 0;
    while (true) {
        x += xChange;
        y -= yChange;

        if (!trees[y] || trees[y][x] === undefined) break;
        visibleTrees++;
        if (trees[y][x] >= treeHeight) break;
    }

    return visibleTrees;
};

let highestScenicScore = -1;
for (let x = 0; x < trees[0].length; x++) {
    for (let y = 0; y < trees.length; y++) {
        const scenicScore = countVisibleTreesInDirection(x, y, 0, 1) * countVisibleTreesInDirection(x, y, 1, 0) * countVisibleTreesInDirection(x, y, 0, -1) * countVisibleTreesInDirection(x, y, -1, 0);
        if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
    }
}

console.log(highestScenicScore);