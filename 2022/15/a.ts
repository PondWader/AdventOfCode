import fs from "fs";

const input = fs.readFileSync('./15/input.txt', 'utf-8').replaceAll('\r', '');

const map = new Map<string, 'beacon' | 'sensor' | 'empty'>();

const TARGET_Y = 2000000;

for (const line of input.split('\n')) {
    const [sensorX, sensorY, beaconX, beaconY] = line.split('x=').slice(1).flatMap(n => {
        const split = n.split(', y=');
        return [
            parseInt(split[0]),
            parseInt(split[1].split(/\|| /)[0])
        ]
    });

    if (sensorY === TARGET_Y) map.set(`${sensorX},${sensorY}`, 'sensor');
    if (beaconY === TARGET_Y) map.set(`${beaconX},${beaconY}`, 'beacon');

    const sensorRadius = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    const diffToTarget = Math.abs(TARGET_Y - sensorY);

    if (diffToTarget >= sensorRadius) continue;

    const trySet = (x: number, y: number) => {
        if (!map.has(`${x},${y}`)) map.set(`${x},${y}`, 'empty');
    }

    for (let i = 0; i <= sensorRadius - diffToTarget; i++) {
        trySet(sensorX + i, TARGET_Y);
        trySet(sensorX - i, TARGET_Y);
    }
}

console.log('Finished finding points, calculating number of empty points...')
console.log([...map].filter(([_, type]) => type === 'empty').length);