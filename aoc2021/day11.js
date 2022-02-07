// TASK: https://adventofcode.com/2021/day/11

function prepareData(dataString) {
    return dataString.split('\n').map((row) => row.split('').map(Number));
}

const inputString = `8624818384
3725473343
6618341827
4573826616
8357322142
6846358317
7286886112
8138685117
6161124267
3848415383`;

function shouldFlash(cell) {
    return cell > 9;
}

function flash(field, row, col) {
    field[row][col] = -1; // mark as flashed;
    let flashesCount = 1;

    for (let rowIndex = Math.max(row - 1, 0); rowIndex <= Math.min(row + 1, field.length - 1); rowIndex++){
        for (let colIndex = Math.max(col - 1, 0); colIndex <= Math.min(col + 1, field[rowIndex].length - 1); colIndex++) {
            if (field[rowIndex][colIndex] !== -1) {
                field[rowIndex][colIndex] += 1;
                if (shouldFlash(field[rowIndex][colIndex])) {
                    flashesCount += flash(field, rowIndex, colIndex);
                }
            }
        }
    }
    return flashesCount;
}

function dayStep(field) {
    // increase energy level
    for (let row = 0; row < field.length; row++)
    for (let col = 0; col < field[row].length; col++) field[row][col] += 1;

    let flashes = 0;
    // flash
    for (let row = 0; row < field.length; row++)
    for (let col = 0; col < field[row].length; col++) {
        if (shouldFlash(field[row][col])) {
            flashes += flash(field, row, col);
        }
    }

    // normalize
    for (let row = 0; row < field.length; row++)
    for (let col = 0; col < field[row].length; col++) {
        if (field[row][col] === -1) {
            field[row][col] = 0;
        }
    }

    return flashes;
}

function part1(field) {
    const days = 100;
    let totalFlashes = 0;
    for (let day = 0; day < days; day++) {
        totalFlashes += dayStep(field);
    }
    return totalFlashes;
}

function part2(field) {
    let day = 1;
    const requiredFLashes = field.length * field[0].length;
    while (true) {
        const count = dayStep(field);
        if (count === requiredFLashes) {
            return day;
        }
        day++;
    }
}

(async function() {
    const field = prepareData(inputString);
    console.log('PART 1: ', part1(field));

    const field = prepareData(inputString);
    console.log('PART 2: ', part2(field));
})();
