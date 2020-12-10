const parseInput = input => input.split('\r\n').map(n => +n);

const runPart1 = nums => {
   nums = [...nums].sort((a, b) => a - b);
   const difs = {1: 0, 2: 0, 3: 1};
   nums.forEach((n, i) => {
      difs[n - (nums[i - 1] || 0)] += 1;
   });

   return difs[1] * difs[3];
};

const recurse = (nums, i, last, cache) => {
   if (nums[i] > last + 3 || i >= nums.length) {
      return 0;
   }

   if (i === nums.length - 1) {
      return 1;
   }

   let sum = 0;
   cache[i] = cache[i] || [-1, -1, -1];
   [1, 2, 3].forEach(j => {
      const cachedVal = cache[i][j - 1];
      if (cachedVal === -1) {
         cache[i][j - 1] = recurse(nums, i + j, nums[i], cache);
      }
      sum += cache[i][j - 1];
   });
   return sum;
};

const runPart2 = nums => {
   nums = [0, ...nums].sort((a, b) => a - b);
   nums.push(nums[nums.length - 1] + 3);
   return recurse(nums, 0, 0, {});
}

module.exports = {parseInput, runPart1, runPart2};