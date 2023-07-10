// https://leetcode.com/problems/3sum/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums = nums.sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < nums.length - 1; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([0,1,1]));
console.log(threeSum([0,0,0]));
console.log(threeSum([-3,0,-5,2,-4,-2,1,-2,-1,3,1,3,1,3,-3,-5,1]));