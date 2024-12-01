import fs from "fs";

const input = fs.readFileSync('./11/input.txt', 'utf-8').replaceAll('\r', '');

const lines = input.split('\n').filter(l => l).map(l => l.split(/: ?/)[1]);
const monkeys: {
    items: number[];
    operation: string;
    testDivisible: number;
    testSuccess: number;
    testFail: number;
    inspectedItems: number;
}[] = [];

for (let i = 0; i < lines.length; i += 6) {
    monkeys.push({
        items: lines[i + 1].split(', ').map(n => parseInt(n)),
        operation: lines[i + 2],
        testDivisible: parseInt(lines[i + 3].split(' ').pop()!),
        testSuccess: parseInt(lines[i + 4].split(' ').pop()!),
        testFail: parseInt(lines[i + 5].split(' ').pop()!),
        inspectedItems: 0
    })
}

for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
        while (monkey.items.length > 0) {
            const item = monkey.items.shift();
            if (!item) break;

            let newValue: number = 0;
            eval(monkey.operation.replaceAll('new', 'newValue').replaceAll('old', item.toString()));
            newValue = Math.floor(newValue / 3);

            if (newValue % monkey.testDivisible === 0) monkeys[monkey.testSuccess].items.push(newValue);
            else monkeys[monkey.testFail].items.push(newValue);

            monkey.inspectedItems++;
        }
    }
}

console.log(
    monkeys.map(m => m.inspectedItems)
    .sort((a, b) => b - a).slice(0, 2)
    .reduce((a, b) => a * b)
)