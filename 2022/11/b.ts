import fs from "fs";

const input = fs.readFileSync('./11/input.txt', 'utf-8').replaceAll('\r', '');

const lines = input.split('\n').filter(l => l).map(l => l.split(/: ?/)[1]);
const monkeys: {
    items: number[];
    operation: (worryValue: number) => number;
    testDivisible: number;
    testSuccess: number;
    testFail: number;
    inspectedItems: number;
}[] = [];

for (let i = 0; i < lines.length; i += 6) {
    const [operation, amount] = lines[i + 2].split(' ').slice(3);
    const parsedAmount = amount === 'old' ? 'old' : parseInt(amount);

    monkeys.push({
        items: lines[i + 1].split(', ').map(n => parseInt(n)),
        operation: (worryValue: number) => {
            const opAmount = parsedAmount === 'old' ? worryValue : parsedAmount;

            if (operation === '=') return opAmount;
            else if (operation === '+') return worryValue + opAmount;
            else if (operation === '*') return worryValue * opAmount;
            return worryValue;
        },
        testDivisible: parseInt(lines[i + 3].split(' ').pop()!),
        testSuccess: parseInt(lines[i + 4].split(' ').pop()!),
        testFail: parseInt(lines[i + 5].split(' ').pop()!),
        inspectedItems: 0
    })
}

// Required to keep numbers in a reasonable size so the maths is actually correct
// BigInt is way too slow for this
const numModifier = monkeys.reduce((a, b) => a * b.testDivisible, 1); 

for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
        while (monkey.items.length > 0) {
            const item = monkey.items.shift()!;

            let newValue = monkey.operation(item) % numModifier;

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