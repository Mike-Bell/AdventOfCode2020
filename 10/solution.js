const parseInput = input => input.split('\r\n').map(n => +n);

const runPart1 = nums => {
   nums = [...nums].sort((a, b) => a - b);
   const difs = {1: 0, 2: 0, 3: 1};
   nums.forEach((n, i) => {
      difs[n - (nums[i - 1] || 0)] += 1;
   });

   return difs[1] * difs[3];
};

const recurse = (nums, i, cache) => {
   if (i === nums.length - 1) {
      return 1;
   }

   if (cache[i] === -1) {
      cache[i] = [1, 2, 3]
         .filter(j => nums[i + j] <= nums[i] + 3)
         .map(j => recurse(nums, i + j, cache))
         .reduce((acc, curr) => acc + curr, 0);
   }

   return cache[i];
};

const runPart2 = nums => {
   nums = [0, ...nums].sort((a, b) => a - b);
   nums.push(nums[nums.length - 1] + 3);
   return recurse(nums, 0, nums.map(() => -1));
}

module.exports = {parseInput, runPart1, runPart2};