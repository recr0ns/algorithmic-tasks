// TASK: https://adventofcode.com/2021/day/5
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/b58db8d5871ba36dfb3f4b6d1e887220ee7690ef/day5';
const SIDE_SIZE = 1000;

function solve(part, segments) {
    const field = Array.from({ length: SIDE_SIZE }).map(() => Array.from({ length: SIDE_SIZE }).fill(0));
    let count = 0;

    for (const [start, end] of segments) {
        const offsetX = Math.sign(end[0] - start[0]);
        const offsetY = Math.sign(end[1] - start[1]);

        if (part === 1 && offsetX !== 0 && offsetY !== 0) continue;

        for(let x = start[0], y = start[1]; true; x += offsetX, y += offsetY) {
            const breakAfter = x === end[0] && y === end[1];
            if (field[y][x] === true) {
                if (breakAfter) break; else continue;
            }

            field[y][x] += 1;
            if (field[y][x] >= 2) {
                field[y][x] = true;
                count++;
            }
            if (breakAfter) {
                break;
            }
        }
    }

    return count;
}


(async function () {
    const segments = await fetch(inputUrl).then(d => d.split('\n').map(row => row.split(' -> ').map(side => side.split(',').map(Number))));

    console.log('PART 1: ', solve(1, segments));
    console.log('PART 2: ', solve(2, segments));
})();
