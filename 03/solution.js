const parseInput = input => input.split('\r\n').map(line => line.split(''));

const runPart1 = lines => lines.filter((line, x) => line[(x * 3) % line.length] === '#').length;

const runPart2 = lines => [{
      x: 1,
      y: 1
   }, {
      x: 3,
      y: 1
   }, {
      x: 5,
      y: 1
   }, {
      x: 7,
      y: 1
   }, {
      x: 1,
      y: 2
   }]
   .map(slope => {
      let y = 0;
      let x = 0;
      let trees = 0;
      while (y < lines.length) {
         if (lines[y][x] === '#') {
            trees++;
         }
         y += slope.y;
         x = (x + slope.x) % lines[0].length;
      }
      return trees;
   })
   .reduce((acc, curr) => acc * curr, 1);

module.exports = {parseInput, runPart1, runPart2};