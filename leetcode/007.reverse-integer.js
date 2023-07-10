const MAX_INT = 2**31;

/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
    const sign = Math.sign(x);
    const result = sign * Number(Math.abs(x).toString().split('').reverse().join(''));

    if (result > MAX_INT-1 || result < -MAX_INT) return 0;
    return result
};