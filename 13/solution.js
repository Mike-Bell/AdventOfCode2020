const lcm = require('../utils/lcm');

const parseInput = input => input;

const runPart1 = input => {
   const splitInp = input.split('\r\n');
   
   const inp = {
      estimate: +splitInp[0],
      waits: splitInp[1].split(',').filter(inp => inp !== 'x').map(inp => +inp)
   };

   const remainders = inp.waits.map(w => [w, Math.ceil(inp.estimate / w) * w - inp.estimate]);

   let min = -1;
   let minId = -1;
   remainders.forEach(r => {
      if (min === -1 || r[1] < min) {
         [minId, min] = r;
      }
   });

   return min * minId;
};

const runPart2 = input => {
   const splitInp = input.split('\r\n');
   
   const inp = splitInp[1].split(',');

   const targets = [];
   inp.forEach((n, i) => {
      if (n !== 'x') {
         const nn = +n;
         let diff = nn - i;
         while (diff < 0) {
            diff += nn;
         }
         diff = diff % nn;
         targets.push({
            n: nn,
            offset: diff
         });
      }
   });

   let delta = targets[0].n;
   let period = targets[0].offset;
   targets.slice(1).forEach(({n, offset}) => {
      while (period % n !== offset) {
         period += delta;
      }

      delta = delta * n;
   });

   return period;
};

module.exports = {parseInput, runPart1, runPart2};