const parseInput = input => input.split('\r\n').map(line => line.split(' ')).map(([code, n]) => [code, +n]);

const createMachine = instructions => {
   let acc = 0;
   let i = 0;
   const linesRun = new Set();
   const ops = {
      'acc': val => {
         acc += val;
         i++;
      },
      'nop': () => {
         i++;
      },
      'jmp': val => {
         i += val;
      }
   };

   const runCurrentLine = () => {
      linesRun.add(i);
      const [op, n] = instructions[i];
      ops[op](n);
      return {acc, i};
   };

   const getLinesRun = () => linesRun;

   return {runCurrentLine, getLinesRun};
}

const runPart1 = lines => {
   const machine = createMachine(lines);

   while (true) {
      const {i, acc} = machine.runCurrentLine();

      if (machine.getLinesRun().has(i)) {
         return acc;
      }
   }
};

const runPart2 = lines => {
   for (let i = 0; i < lines.length; i++) {
      const codeToMutate = lines[i][0];
      if (codeToMutate === 'acc') {
         continue;
      }

      lines[i][0] = codeToMutate === 'jmp' ? 'nop' : 'jmp';

      const machine = createMachine(lines);
      while (true) {
         const {i, acc} = machine.runCurrentLine();

         if (i === lines.length) {
            return acc;
         }

         if (machine.getLinesRun().has(i)) {
            break;
         }
      }

      lines[i][0] = codeToMutate;
   }
};

module.exports = {parseInput, runPart1, runPart2};