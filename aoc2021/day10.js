// TASK: https://adventofcode.com/2021/day/10
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/62a497143f89f11c6a1cf7af9dee8967562edc43/day10';

function prepareData(dataString) {
    return dataString.split('\n');
}

let open = new Set(['[', '(', '{', '<']);

function mapChar(openChar) {
    switch (openChar) {
        case '[': return ']';
        case '(': return ')';
        case '{': return '}';
        case '<': return '>';
    }
}

function isCorrupted(line) {
    const stack = [];
    for (let index = 0; index < line.length; index++) {
        const current = line[index];
        if (open.has(current)) {
            stack.push(current);
        } else {
            let expected = mapChar(stack.pop());
            if (current != expected) {
                return { corrupted: true, symbol: current };
            }
        }
    }
    return { corrupted: false, rest: stack };
}

function part1(lines) {
    const scoreMap = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }

    return lines.reduce((sum, line) => {
        let status = isCorrupted(line);
        return status.corrupted ? sum + scoreMap[status.symbol] : sum;
    }, 0);
}


function getScore(symbols, scoreMap) {
    return symbols.reduceRight((sum, ch) => sum * 5 + scoreMap[mapChar(ch)], 0);
}

function part2(lines) {
    const scoreMap = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    }

    const scores = lines.reduce((scores, line) => {
        let status = isCorrupted(line);
        if (!status.corrupted) {
            scores.push(getScore(status.rest, scoreMap));
        }
        return scores;
    }, []);

    return scores.sort((a, b) => b - a)[Math.trunc(scores.length / 2)];
}

(async function() {
    const lines = await fetch(inputUrl).then(prepareData);

    console.log('PART 1: ', part1(lines));
    console.log('PART 2: ', part2(lines));
})();
