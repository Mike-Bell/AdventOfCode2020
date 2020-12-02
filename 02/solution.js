const parseInput = input => input.split('\n');

const runPart1 = input => {
   return input.filter(line => {
      const splitLine = line.split(' ');
      const [min, max] = splitLine[0].split('-');
      const letter = splitLine[1][0];
      const password = splitLine[2];
      const instances = password.split('').filter(l => l === letter).length;
      return instances >= min && instances <= max;
   }).length;
};

const runPart2 = input => {
   return input.filter((line, i) => {
      const splitLine = line.split(' ');
      const [first, second] = splitLine[0].split('-');
      const letter = splitLine[1][0];
      const password = splitLine[2];
      const letters = password.split('');
      return ((letters[first - 1] === letter) + (letters[second - 1] === letter)) === 1;
   }).length;
};

module.exports = {parseInput, runPart1, runPart2};