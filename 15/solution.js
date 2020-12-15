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
   const lasts = {};
   for (let i = 0; i < nums.length; i++) {
      lasts[nums[i]] = i;
   }

   let lastNum = nums[nums.length - 1];
   for (let i = nums.length; true; i++) {
      if (i % 100000 === 0) {
         console.debug(i);
      }

      if (lasts[lastNum] === undefined) {
         lasts[lastNum] = i - 1;
         lastNum = 0;
      } else {
         [lasts[lastNum], lastNum] = [i - 1, i - 1 - lasts[lastNum]];
      }
      
      if (i + 1 === 30000000) {
         return lastNum;
      }
   }
};

module.exports = {parseInput, runPart1, runPart2};