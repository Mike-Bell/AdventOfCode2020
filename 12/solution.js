const parseInput = input => input.split('\r\n').map(line => [line[0], +line.slice(1)]);

const runPart1 = inps => {
   let pos = [0, 0];
   let direction = [1, 0];

   const rotate = val => {
      const radians = val * Math.PI / 180
      direction = [
         Math.round(direction[0] * Math.cos(radians) - direction[1] * Math.sin(radians)),
         Math.round(direction[0] * Math.sin(radians) + direction[1] * Math.cos(radians))
      ]
   };

   const commands = {
      N: val => pos[1] += val,
      S: val => pos[1] -= val,
      E: val => pos[0] += val,
      W: val => pos[0] -= val,
      L: val => rotate(val),
      R: val => rotate(-1 * val),
      F: val => pos = [pos[0] + direction[0] * val, pos[1] + direction[1] * val]
   };

   inps.forEach(inp => {
      commands[inp[0]](inp[1]);
   });

   return Math.abs(pos[0]) + Math.abs(pos[1]);
};

const runPart2 = inps => {
   let pos = [0, 0];
   let direction = [10, 1];

   const rotate = val => {
      const radians = val * Math.PI / 180
      direction = [
         Math.round(direction[0] * Math.cos(radians) - direction[1] * Math.sin(radians)),
         Math.round(direction[0] * Math.sin(radians) + direction[1] * Math.cos(radians))
      ]
   };

   const commands = {
      N: val => direction[1] += val,
      S: val => direction[1] -= val,
      E: val => direction[0] += val,
      W: val => direction[0] -= val,
      L: val => rotate(val),
      R: val => rotate(-1 * val),
      F: val => pos = [pos[0] + direction[0] * val, pos[1] + direction[1] * val]
   };

   inps.forEach(inp => {
      commands[inp[0]](inp[1]);
   });

   return Math.abs(pos[0]) + Math.abs(pos[1]);
};

module.exports = {parseInput, runPart1, runPart2};