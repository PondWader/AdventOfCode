import fs from "fs";
import path from "path";

const input = fs.readFileSync('./7/input.txt', 'utf-8').replaceAll('\r', '');
const lines = input.split('\n');

const dirs: {[key: string]: number} = {}

let currentDir = '';
while (lines[0]) {
    const [_, command, arg] = lines.shift()?.split(' ') as [string, string, string];

    switch (command) {
        case "cd":
            currentDir = path.join(currentDir, arg).replaceAll('\\', '/');;
            break;

        case "ls":
            let dirSize = 0;
            while (lines[0] && !lines[0].startsWith('$')) {
                if (lines[0].startsWith('dir ')) {
                    lines.shift();
                    continue;
                }

                const [fileSize] = lines.shift()!.split(' ').map(a => parseInt(a) || a) as [number, string];
                dirSize += fileSize;
            }
            dirs[currentDir] = dirSize;
            
            let backPath = currentDir;
            while (backPath !== '/') {
                backPath = path.join(backPath, '..').replaceAll('\\', '/');
                dirs[backPath] += dirSize;
            }
            break;
    }
}

console.log(Object.values(dirs).filter(size => size <= 100000).reduce((a, b) => a + b))