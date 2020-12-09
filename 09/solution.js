const parseInput = input => input.split('\r\n').map(n => +n);

const getInvalidNum = nums => {
    const candidates = nums.slice(25);
    for (let i = 0; i < candidates.length; i++) {
        const adders = nums.slice(i, i + 25);
        let isValid = false;
        
        isValid:
        for (let j = 0; j < adders.length; j++) {
            for (let k = 0; k < adders.length; k++) {
                if (j === k) {
                    continue;
                }

                if (adders[j] + adders[k] === candidates[i]) {
                    isValid = true;
                    break isValid;
                }
            }
        }
        if (!isValid) {
            return candidates[i];
        }
    }
};

const runPart1 = nums => getInvalidNum(nums);

const runPart2 = nums => {
    const target = getInvalidNum(nums);
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        let j = 0;
        while (sum < target) {
            sum += nums[i + j];
            j++;

            if (sum === target) {
                const hits = nums.slice(i, i + j + 1);
                return Math.max(...hits) + Math.min(...hits);
            }
        }
    }
};

module.exports = {parseInput, runPart1, runPart2};