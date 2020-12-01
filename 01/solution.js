const parseInput = input => input.split('\n').map(n => +n);

const runPart1 = input => {
   for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
         const a = input[i];
         const b = input[j];

         if (a + b === 2020) {
            return a * b;
         }
      }
   }
};

const runPart2 = input => {
   for (let i = 0; i < input.length; i++) {
      for (let j = i + 1; j < input.length; j++) {
         for (let k = j + 1; k < input.length; k++) {
            const a = input[i];
            const b = input[j];
            const c = input[k];

            if (a + b + c === 2020) {
               return a * b * c;
            }
         }
      }
   }
};

const finder = (nums, indices) => {
   const sum = indices.reduce((acc, curr) => acc + nums[curr], 0);
   if (sum === 2020) {
      console.debug('Found solution:', indices, indices.map(i => nums[i]))
      return indices;
   } else if (sum > 2020) {
      return false;
   }

   const currentLastIndex = indices[indices.length - 1] || 0;
   for (let j = currentLastIndex + 1; j < nums.length; j++) {
      const result = finder(nums, [...indices, j]);
      if (result) {
         return result;
      }
   }
}

const runPart3 = input => {
   return finder(input, []).reduce((acc, curr) => acc * curr, 1);
}

module.exports = {parseInput, runPart1, runPart2, runPart3};