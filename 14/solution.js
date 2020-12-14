const parseInput = input => input.split('\r\n').map(line => {
   if (line.startsWith('mask')) {
      return {
         type: 'mask',
         value: line.slice(7)
      };
   }

   return {
      type: 'mem',
      index: +line.slice(line.indexOf('[') + 1, line.indexOf(']')),
      value: +line.slice(line.indexOf('=') + 2)
   }
});

const runPart1 = lines => {
   const mem = {};
   let mask = '';

   const applyMask = val => {
      let bin = val.toString(2);
      bin = '0'.repeat(Math.max(0, mask.length - bin.length)) + bin;
      for (let i = 0; i < mask.length; i++) {
         const ii = bin.length - i - 1;
         const maskChar = mask[mask.length - i - 1];
         if (maskChar === '1' || maskChar === '0') {
            bin = bin.substring(0, ii) + maskChar + bin.substring(ii + 1);
         }
      }

      return parseInt(bin, 2);
   };

   lines.forEach(line => {
      if (line.type === 'mask') {
         mask = line.value;
         return;
      }

      mem[line.index] = applyMask(line.value);
   });

   return Object.values(mem).reduce((acc, curr) => acc + curr, 0);
};

const runPart2 = lines => {
   const mem = {};
   let mask = '';

   const recurse = (bin, i, acc) => {
      if (i >= mask.length) {
         acc.push(parseInt(bin, 2));
         return;
      }

      const maskChar = mask[mask.length - i - 1];
      const ii = bin.length - i - 1;
      if (maskChar === '1') {
         bin = bin.substring(0, ii) + maskChar + bin.substring(ii + 1);
         recurse(bin, i + 1, acc);
      } else if (maskChar === '0') {
         recurse(bin, i + 1, acc);
      } else {
         bin = bin.substring(0, ii) + '1' + bin.substring(ii + 1);
         recurse(bin, i + 1, acc);
         bin = bin.substring(0, ii) + '0' + bin.substring(ii + 1);
         recurse(bin, i + 1, acc);
      }
   };

   const applyMask = val => {
      const acc = [];
      val = val.toString(2);
      val = '0'.repeat(Math.max(0, mask.length - val.length)) + val;
      recurse(val, 0, acc);
      return acc;
   };

   lines.forEach(line => {
      if (line.type === 'mask') {
         mask = line.value;
         return;
      }

      const addresses = applyMask(line.index);
      addresses.forEach(a => {
         mem[a] = line.value;
      });
   });

   return Object.values(mem).reduce((acc, curr) => acc + curr, 0);
};

module.exports = {parseInput, runPart1, runPart2};