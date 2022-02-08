// TASK: https://adventofcode.com/2021/day/13
const { fetch } = require('./helpers');

const inputUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/da4dfeda5125365932a40c287cb4571f5e3d4ed3/day13';

function prepareData(dataString) {
    let [dots, folds] = dataString.split('\n\n');

    dots = dots.split('\n').map((row) => row.split(',').map(Number));
    folds = folds.split('\n').map((row) => {
        const [text, position] = row.split('=');
        return [text.charAt(text.length - 1), Number(position)];
    })

    return { dots, folds };
}

function createField(dots) {
    const [maxX, maxY] = dots.reduce((data, current) => {
        data[0] = Math.max(data[0], current[0]);
        data[1] = Math.max(data[1], current[1]);
        return data;
    }, [0, 0]);

    const field = Array.from({ length: maxY + 1 }).fill(0).map(() => Array.from({ length: maxX + 1 }).fill(false));

    dots.forEach(([x, y]) => field[y][x] = true);

    return field;
}

function fold(field, [sizeX, sizeY], [direction, point]) {
    let count = 0;
    if (direction === 'x') {
        for (let row = 0; row < sizeY; row++) {
            for (let col = 1; col <= point; col++) {
                field[row][point - col] ||= field[row][point + col];
                if (field[row][point - col]) count++;
            }
        }
        return { field, size: [(sizeX - 1) / 2, sizeY], count };
    } else if (direction === 'y') {
        for (let row = 1; row <= point; row++) {
            for (let col = 0; col < sizeX; col++) {
                field[point - row][col] ||= field[point + row][col];
                if (field[point - row][col]) count++;
            }
        }
        return { field, size: [sizeX, (sizeY - 1) / 2], count };
    }
}

function part1(field, currentFold) {
    const { count } = fold(field, [field[0].length, field.length], currentFold);
    return count;
}

function part2(initialField, folds) {
    let field = initialField, size = [initialField[0].length, initialField.length], count;

    folds.forEach(currentFold => {
        ({ field, size, count } = fold(initialField, size, currentFold));
    });

    return field.filter((i, index) => index < size[1]).map((row) => row.filter((i, index) => index < size[0]).map(i => i ? '#' : ' ').join('')).join('\n');
}

(async function() {
    const {dots, folds} = await fetch(inputUrl).then(prepareData);

    let field = createField(dots);
    console.log('PART 1: ', part1(field, folds[0]));

    field = createField(dots);
    console.log(`PART 2:\n${part2(field, folds)}`);
})();
