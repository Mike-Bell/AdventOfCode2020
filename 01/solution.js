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

module.exports = {parseInput, runPart1, runPart2};