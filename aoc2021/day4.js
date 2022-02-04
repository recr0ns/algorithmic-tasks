// TASK: https://adventofcode.com/2021/day/4
const { fetch } = require('./helpers');

const luckyUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/d61d94c563575465cfd71678e11526200ceb5ab8/day4-lucky';
const boardsUrl = 'https://gist.githubusercontent.com/recr0ns/a6ba4b1777cf9dc2ea7d9d29549b8ebb/raw/d61d94c563575465cfd71678e11526200ceb5ab8/day4-boards';

function checkRowFilled(board, row) {
    for (let index = 0; index < board[row].length; index++) {
        if (board[row][index] !== true) {
            return false;
        }
    }
    return true;
}

function checkColumnFilled(board, col) {
    for (let index = 0; index < board.length; index++) {
        if (board[index][col] !== true) {
            return false;
        }
    }
    return true;
}

function markAndCheck(board, number) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col] === number) {
                board[row][col] = true;
                if (checkRowFilled(board, row) || checkColumnFilled(board, col)) {
                    return board;
                } else {
                    return null;
                }
            }
        }
    }
    return null;
}

function sumOfBoard(board) {
    return board.reduce((sum, row) => sum + row.reduce((localSum, item) => item !== true ? localSum + item : localSum, 0), 0);
}

function part1(boards, numbers) {
    for (const num of numbers) {
        for (const board of boards) {
            const filled = markAndCheck(board, num);
            if (filled) {
                return sumOfBoard(filled) * num;
            }
        }
    }
}

function part2(boards, numbers) {
    const won = new Set();
    for (const num of numbers) {
        for (let index = 0; index < boards.length; index++) {
            if (won.has(index)) continue;

            const filled = markAndCheck(boards[index], num);
            if (filled) {
                won.add(index);
                if (won.size === boards.length) {
                    return sumOfBoard(filled) * num;
                }
            }
        }
    }
}

(async function () {
    const lucky = await fetch(luckyUrl).then(data => data.split(',').map(Number));
    const boards = await fetch(boardsUrl).then(data => data.split('\n\n').map(b => b.split('\n').map(row => row.split(' ').filter(Boolean).map(Number))));

    console.log('PART 1: ', part1(boards, lucky));
    console.log('PART 2: ', part2(boards, lucky));
})();
