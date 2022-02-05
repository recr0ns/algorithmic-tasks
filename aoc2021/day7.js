// TASK: https://adventofcode.com/2021/day/7
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/b18fe07df6acfbf1f0ac12da5612243584baf858/day7';

function prepareData(dataString) {
    return dataString.split(',').map(Number);
}

function cost1(location, target) {
    return Math.abs(target - location);
}

function cost2(location, target) {
    const offset = Math.abs(target - location);
    return ((1 + offset) * offset) / 2;
}

function solve(start, costFn) {
    const [min, max] = start.reduce((extr, current) => [Math.min(extr[0], current), Math.max(extr[1], current)], [start[0], start[0]]);

    let minFuel = Number.MAX_SAFE_INTEGER;
    for (let target = min; target <= max; target++) {
        const fuel = start.reduce((sum, current) => sum + costFn(target, current), 0);
        minFuel = Math.min(minFuel, fuel)
    }
    return minFuel;
}

(async function() {
    const start = await fetch(inputUrl).then(prepareData);

    console.log('PART 1: ', solve(start, cost1));
    console.log('PART 2: ', solve(start, cost2));
})();
