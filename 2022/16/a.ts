import fs from "fs";

const input = fs.readFileSync('./16/input.txt', 'utf-8').replaceAll('\r', '');

type valveData = { id: string, flowRate: number, tunnels: string[] };
const valves = new Map<string, valveData>();
input.split('\n').forEach(line => {
    const split = line.split(' ');
    valves.set(split[1], {
        id: split[1],
        flowRate: parseInt(split[4].slice(5)),
        tunnels: split.slice(9).map(n => n.endsWith(',') ? n.slice(0, -1) : n)
    })
})

const highestToLowestValves = [...valves.values()].sort((a, b) => b.flowRate - a.flowRate);

const currentPositions = [{
    valve: valves.get('AA')!,
    released: 0,
    openedValves: [] as string[],
    minutesLeft: 30
}];
const visitedPositions = new Set<string>(); // Stores all positions that have been visited to avoid duplicates
let highestFinalPosition = 0;
let highestPosFlow = 0;

while (currentPositions.length > 0) {
    const currentPos = currentPositions.shift()!;

    // Skip if it's not possible to reach the highest flow rate even with best possible valve releases
    // Makes it run a lot faster
    if (currentPos.released + highestToLowestValves.filter(v => !currentPos.openedValves.includes(v.id)).reduce((a, b, i) => a + (b.flowRate * (currentPos.minutesLeft - i)), 0) < highestPosFlow) {
        continue;
    }

    if (currentPos.minutesLeft === 0) {
        if (currentPos.released > highestFinalPosition) highestFinalPosition = currentPos.released;
        continue;
    }
    const positionId = `${currentPos.valve.id}-${currentPos.minutesLeft}-${currentPos.openedValves.join(',')}`;
    if (visitedPositions.has(positionId)) continue;
    visitedPositions.add(positionId);

    if (currentPos.valve.flowRate > 0 && !currentPos.openedValves.includes(currentPos.valve.id)) {
        // Open valve, sub-tunnels will be processed next iteration
        const nextPos = {
            valve: currentPos.valve,
            released: currentPos.released + (currentPos.valve.flowRate * (currentPos.minutesLeft - 1)),
            openedValves: [...currentPos.openedValves, currentPos.valve.id],
            minutesLeft: currentPos.minutesLeft - 1
        }

        currentPositions.push(nextPos)

        if (nextPos.released > highestPosFlow) highestPosFlow = nextPos.released;
    }

    for (const tunnel of currentPos.valve.tunnels) {
        currentPositions.push({
            valve: valves.get(tunnel)!,
            released: currentPos.released,
            openedValves: currentPos.openedValves,
            minutesLeft: currentPos.minutesLeft - 1
        })
    }
}

console.log(highestFinalPosition)