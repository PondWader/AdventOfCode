import fs from "fs";

const input = fs.readFileSync('./13/input.txt', 'utf-8').replaceAll('\r', '').trim();
const sections = input.split('\n\n').map(v => v.split('\n'));

let total = 0;
sectionsLoop:
for (const section of sections) {
    for (let row = 0; row < section.length - 1; row++) {
        let fixedSmudge = false;
        if (section.slice(row + 1, row * 2 + 2).every((v, i, line) => {
            return (v.split('').every((_, j) => {
                if (v[j] === section[row - i][j]) return i + 1 === line.length && j + 1 === v.length ? fixedSmudge : true;
                else if (fixedSmudge) return false;
                fixedSmudge = true;
                return true;
            }))
        })) {
            total += (row + 1) * 100;
            continue sectionsLoop;
        }
    }
    for (let col = 0; col < section[0].length - 1; col++) {
        let fixedSmudge = false;
        if (section.every((line, j, sec) => line.slice(col + 1, col * 2 + 2).split('').every((v, i, part) => {
            if (v === line[col - i]) return i + 1 === part.length && j + 1 === sec.length ? fixedSmudge : true;
            else if (fixedSmudge) return false;
            fixedSmudge = true;
            return true;
        }))) {
            total += col + 1;
            continue sectionsLoop;
        }
    }
}
console.log(total);