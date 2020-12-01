const parseInput = input => input.split(',').map(n => +n);

const runPart1 = inpts => {
   const nums = [...inpts];
   for (let i = nums.length; true; i++) {
      for (let j = i - 2; j >= 0; j--) {
         if (nums[j] === nums[i - 1]) {
            nums[i] = i - j - 1;
            break;
         }
      }

      nums[i] = nums[i] || 0;
      
      if (i + 1 === 2020) {
         return nums[i];
      }
   }
};

const runPart2 = inpts => {
   const nums = [...inpts];
   const lasts = new Map();
   for (let i = 0; i < nums.length; i++) {
      lasts.set(nums[i], i);
   }

   let lastNum = nums[nums.length - 1];
   for (let i = nums.length; true; i++) {
      if (!lasts.has(lastNum)) {
         lasts.set(lastNum, i - 1);
         lastNum = 0;
      } else {
         const tmp = lasts.get(lastNum);
         lasts.set(lastNum, i - 1);
         lastNum = i - 1 - tmp;
      }
      
      if (i + 1 === 30000000) {
         return lastNum;
      }
   }
};

module.exports = {parseInput, runPart1, runPart2};