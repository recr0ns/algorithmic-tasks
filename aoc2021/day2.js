// TASK: https://adventofcode.com/2021/day/2
const { fetch } = require('./helpers');

const url = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/c9da57a9f2759dafed0b38566846dd7eb7ac4968/day2';

function part1(commands) {
    const {dx, dy} = commands.reduce((acc, [direction, offset]) => {
        switch (direction) {
            case 'forward':
                acc.dx += +offset;
                break;
            case 'down':
                acc.dy += +offset;
                break;
            case 'up':
                acc.dy -= +offset;
                break;
        }
        return acc;
    }, { dx: 0, dy: 0 });
    return dx * dy;
}

function part2(commands) {
    const {dx, dy} = commands.reduce((acc, [direction, offset]) => {
        switch (direction) {
            case 'forward':
                acc.dx += +offset;
                acc.dy += +offset*acc.aim;
                break;
            case 'down':
                acc.aim += +offset;
                break;
            case 'up':
                acc.aim -= +offset;
                break;
        }
        return acc;
    }, { dx: 0, dy: 0, aim: 0 });
    return dx * dy;
}

(async function run() {
    const response = await fetch(url);
    const commands = response.split('\n').map(row => row.split(' '));
    console.log('PART 1: ', part1(commands));
    console.log('PART 2: ', part2(commands));
})();


