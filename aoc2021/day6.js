// TASK: https://adventofcode.com/2021/day/6
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/f9dc1cc7a2775630505037ca7ef2c805983a8161/day6';

const cache = new Map();
function calculateForSingle(d) {
    if (d < 7) return 1;
    if (!cache.has(d)) {
        const result = calculateForSingle(d - 7) + calculateForSingle(d - 9);
        cache.set(d, result);
        return result;
    }
    return cache.get(d);
}

function solve(lanternfishArray, days) {
    return lanternfishArray.reduce((sum, current) => sum + calculateForSingle(6 - current + days), 0);
}

(async function() {
    const start = await fetch(inputUrl).then(row => row.split(',').map(Number));

    console.log('PART 1: ', solve(start, 80));
    console.log('PART 2: ', solve(start, 256));
})();
