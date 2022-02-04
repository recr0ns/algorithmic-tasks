// TASK: https://adventofcode.com/2021/day/3
const { fetch } = require('./helpers');

const url = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/c24c41cf4165dc65a435f2daa030102dc7fcc7ac/day3';

function toDec(rate) {
    return parseInt(rate.join(''), 2);
}

function part1(input) {
    const commonBits = new Array(input[0].length).fill(0);

    for (let number of input) {
        for (let i = 0; i < number.length; i++) {
            commonBits[i] += number[i] === '1' ? 1 : -1;
        }
    }

    const gammaArray = commonBits.map(bit => bit > 0 ? 1 : 0);

    const gammaRate = toDec(gammaArray);
    const epsilonRate = toDec(gammaArray.map(bit => 1 - bit));

    return gammaRate * epsilonRate;
}

function countBitsAtPosition(numbers, position) {
    return numbers.reduce((common, num) => common + (num.charAt(position) === '1' ? 1 : -1), 0);
}

function mostCommonAtPosition(numbers, position) {
    return countBitsAtPosition(numbers, position) >= 0 ? '1' : '0';
}

function leastCommonAtPosition(numbers, position) {
    return countBitsAtPosition(numbers, position) >= 0 ? '0' : '1';
}

function find(input, position, finder) {
    if (input.length === 1) {
        return parseInt(input[0], 2);
    }

    const bit = finder(input, position);
    const newInput = input.filter((num) => num[position] === bit);

    return find(newInput, position + 1, finder);
}

function part2(input) {
    const o2Rate = find(input, 0, mostCommonAtPosition);
    const co2Rate = find(input, 0, leastCommonAtPosition);

    return o2Rate *co2Rate;
}


(async function () {
    const response = await fetch(url);
    const numbers = response.split('\n').filter(Boolean);

    console.log('PART 1: ', part1(numbers));
    console.log('PART 2: ', part2(numbers));
})();
