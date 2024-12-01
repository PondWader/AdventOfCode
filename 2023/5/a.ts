import fs from "fs";

const input = fs.readFileSync('./5/input.txt', 'utf-8').replaceAll('\r', '').trim();
const lines = input.split('\n');

const plantInfo: { [x: string]: number }[] = lines.shift()!.split(': ')[1].split(' ').map(v => ({
    seed: +v
}));

function applyRange(source: string, dest: string, destRangeStart: number, sourceRangeStart: number, range: number) {
    plantInfo.filter(plant => !plant[dest] && plant[source] >= sourceRangeStart && plant[source] <= sourceRangeStart + range)
        .forEach(plant => plant[dest] = destRangeStart + plant[source] - sourceRangeStart)
}

lines.join('\n').trim().split('\n\n').forEach(plant => {
    const mapLines = plant.split('\n');
    const [source, dest] = mapLines.shift()!.split(/-to-| /);

    for (const line of mapLines) {
        const [destRangeStart, sourceRangeStart, range] = line.split(' ').map(v => +v);
        applyRange(source, dest, destRangeStart, sourceRangeStart, range);
    }

    for (const plant of plantInfo) {
        if (!plant[dest]) plant[dest] = plant[source];
    }
})

console.log(Math.min(...plantInfo.map(p => p.location)));