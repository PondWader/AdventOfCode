import fs from "fs";

const input = fs.readFileSync('./17/input.txt', 'utf-8').replaceAll('\r', '');

const rocks = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split('\n\n').map(rock => {
    const lines = rock.split('\n');
    const mapped = lines.map(l => l.split('').map(c => c === '#'));
    return mapped.map((r) => {
        const row = Array(7).fill(false);
        r.forEach((c, i) => row[i + 2] = c);
        return row;
    })
});

const chamber: boolean[][] = Array(3).fill(Array(7).fill(false));

const jets = input.split('') as ('<' | '>')[];
const getNextJet = () => {
    const jet = jets.shift()!
    jets.push(jet);
    return jet;
}

const drop = (rock: boolean[][]) => {
    rock = [...rock]; // So that modifications to rock do not effect the original rock data

    for (let i = chamber.length - 1; i >= 0; i--) {
        const jet = getNextJet();

        let canBePushed = true;
        for (let i = 0; i < rock.length; i++) {
            if (jet === '<' && rock[i][0] === true) {
                canBePushed = false;
                break;
            } 
            if (jet === '>' && rock[i][rock[i].length - 1] === true) {
                canBePushed = false;
                break;
            } 
        }

        if (canBePushed) {
            rock.forEach(layer => {
                layer.forEach((_, i) => {
                    if (jet === '<') {
                        layer[i] = layer[i + 1];
                        layer[i + 1] = false;
                    }
                    if (jet === '>') {
                        layer[i] = layer[i - 1];
                        layer[i] = false;
                    }
                })
            })
        }

        const canDropFurther = i !== 0 && chamber[i].every((c, i) => !c || !rock[rock.length][i]);
        if (!canDropFurther) {
            for (let x = 0; x < rock.length; x++) {
                if (!chamber[chamber.length - 1 - x]) chamber[chamber.length - 1 - x] = Array(7).fill(false);

                for (let j = 0; j < rock[i].length; j++) {
                    if (rock[x][j]) chamber[chamber.length - 1 - x][j] = true;
                }

                for (let u = 0; u < 3; u++) chamber.push(Array(7).fill(false)); // Adding space above
            }
            break;
        }
    }
};

for (let i = 0; i < jets.length; i++) {
    const rock = rocks[i % rocks.length];
    drop(rock);
}

const amt = (chamber.findIndex(row => row.includes(true)) + 1);
console.log(amt * (2022 / jets.length));