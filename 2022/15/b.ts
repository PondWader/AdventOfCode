import fs from "fs";

const input = fs.readFileSync('./15/input.txt', 'utf-8').replaceAll('\r', '');

const sensors = new Map<[number, number], number>();

for (const line of input.split('\n')) {
    const [sensorX, sensorY, beaconX, beaconY] = line.split('x=').slice(1).flatMap(n => {
        const split = n.split(', y=');
        return [
            parseInt(split[0]),
            parseInt(split[1].split(/\|| /)[0])
        ]
    });

    const sensorRadius = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    sensors.set([sensorX, sensorY], sensorRadius);
}

for (const [sensor, radius] of sensors) {
    const testPos = (x: number, y: number) => {
        if (y < 0 || x < 0 || x > 4_000_000 || y > 4_000_000) return false;

        for (const [testSensor, testSensorRadius] of sensors) {
            const dist = Math.abs(testSensor[0] - x) + Math.abs(testSensor[1] - y);
            if (dist <= testSensorRadius) return false;
        }
        console.log(`Found point ${x}, ${y} with a tuning frequency of ${(x * 4000000) + y}`);
        process.exit();
    }

    // Test every coordinate on the outside of each sensor's radius
    // It works 🤷‍♂️
    for (let i = 0; i <= radius + 1; i++) {
        testPos(sensor[0] + i, sensor[1] + (radius - i) + 1);
        testPos(sensor[0] + i, sensor[1] - (radius - i) - 1);

        testPos(sensor[0] - i, sensor[1] + (radius - i) + 1);
        testPos(sensor[0] - i, sensor[1] - (radius - i) - 1);

        testPos(sensor[0] + (radius - i), sensor[1] + i + 1);
        testPos(sensor[0] + (radius - i), sensor[1] - i - 1);

        testPos(sensor[0] - (radius - i), sensor[1] + i + 1);
        testPos(sensor[0] - (radius - i), sensor[1] - i - 1);
    }
}