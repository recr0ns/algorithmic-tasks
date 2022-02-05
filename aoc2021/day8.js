// TASK: https://adventofcode.com/2021/day/8
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/db66067b693f627ddcd9e995e2a02b4a8612e4d3/day8';

function prepareData(dataString) {
    return dataString.split('\n').map(row => row.split(' | ').map(part => part.split(' ')));
}

function part1(data) {
    const possibleLength = new Set([2,3,4,7]);

    return data.reduce((sum, [_, out]) => sum + out.filter((i) => possibleLength.has(i.length)).length, 0);
}

function exclude(source, ...numbers) {
    let result = source.split('');
    for (const num of numbers) {
        const letters = num.split('');
        result = result.filter(letter => !letters.includes(letter));
    }
    return result.join('');
}

function mapAnswer(input) {
    switch (input.length) {
        case 2: return 1;
        case 3: return 7;
        case 4: return 4;
        case 5: // 2, 3, 5; 5 -> b || !c; 2 -> !f || (!b && c); 3 ->
            break;
        case 6: // 0, 6, 9
            break;
        case 7: return 8;
    }
    return undefined;
}

function sortNumbers(unsorted) {
    return unsorted.map(num => num.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(''));
}

function findDigits(unsortedInput) {
    const input = sortNumbers(unsortedInput);
    const map = Array.from({length: 10});

    for (const num of input) {
        const mapped = mapAnswer(num);
        if (mapped) {
            map[mapped] = num;
        }
    }
    const _069 = input.filter(num => num.length === 6);
    const _235 = input.filter(num => num.length === 5);

    const eg = exclude(map[8], map[4], map[7]);

    map[9] = _069.find(num => exclude(num, eg).length === 5);
    map[2] = _235.find(num => exclude(num, eg).length === 3);

    for (const num of _235) {
        switch (exclude(num, map[2]).length) {
            case 2:
                map[5] = num;
                break;
            case 1:
                map[3] = num;
                break;
        }
    }

    for (const num of _069) {
        switch (exclude(num, map[5]).length) {
            case 2:
                map[0] = num;
                break;
            case 1:
                if (num != map[9]) {
                    map[6] = num;
                }
                break;
        }
    }

    // convert array to map `string representation` -> digit
    return map.reduce((result, str, index) => {
        result[str] = index;
        return result;
    }, {});
}

function convert([unsortedInput, unsortedOut]) {
    const digits = findDigits(unsortedInput);
    const out = sortNumbers(unsortedOut);

    return out.reduce((result, num) => result*10 + digits[num], 0);
}

function part2(inputs) {
    return inputs.reduce((sum, current) => sum + convert(current), 0);
}

(async function() {
    const start = await fetch(inputUrl).then(prepareData);

    console.log('PART 1: ', part1(start));
    console.log('PART 2: ', part2(start));
})();
