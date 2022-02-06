// TASK: https://adventofcode.com/2021/day/9
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/3dd00a81f7f74e5c3903f7cdca13dd88cf26e2cf/day9';

function prepareData(dataString) {
    return dataString.split('\n').map(row => row.split('').map(Number));
}

const MAX = 10;

function part1(field) {
    let sum = 0;
    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[row].length; col++) {
            const c = field[row][col];
            if (c < (field[row - 1]?.[col] ?? MAX) && c < (field[row + 1]?.[col] ?? MAX) &&
                c < (field[row][col - 1] ?? MAX) && c < (field[row][col + 1] ?? MAX)) {
                    sum += c + 1;
                }
        }
    }
    return sum;
}

function markBasin(field, row, col) {
    if (row < 0 || row >= field.length || col < 0 || col >= field[row].length || field[row][col] === 9) {
        return 0;
    }

    field[row][col] = 9;
    return 1 + markBasin(field, row - 1, col) + markBasin(field, row + 1, col) + markBasin(field, row, col - 1) + markBasin(field, row, col + 1);

}

function part2(field) {
    const basins = [];
    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[row].length; col++) {
            if (field[row][col] !== 9) {
                basins.push(markBasin(field, row, col));
            }
        }
    }

    const sortedBasins = basins.sort((a, b) => a - b);
    const result = sortedBasins.pop() * sortedBasins.pop() * sortedBasins.pop();
    return result;
}

(async function() {
    const field = await fetch(inputUrl).then(prepareData);

    console.log('PART 1: ', part1(field));
    console.log('PART 2: ', part2(field));
})();
