const parseInput = input => input.split('\r\n').map(line => line.split('').map(letter => letter === 'F' || letter === 'L'));

const getIndexFromPartitions = partitions => {
   let [min, max] = [0, 2 ** partitions.length - 1];
   partitions.forEach(p => {
      if (p) {
         max = (max - min + 1) / 2 + min - 1;
      } else {
         min = (max - min + 1) / 2 + min;
      }
   });
   return min;
};

const getIdFromPartitions = partitions => getIndexFromPartitions(partitions.slice(0, 7)) * 8 + getIndexFromPartitions(partitions.slice(7, 10));

const runPart1 = input => Math.max(...input.map(getIdFromPartitions));

const runPart2 = input => {
   const ids = input.map(getIdFromPartitions).sort();
   for (let i = 0; i < ids.length - 1; i++) {
      if (ids[i + 1] - ids[i] === 2) {
         return ids[i + 1] - 1;
      }
   }
};

module.exports = {parseInput, runPart1, runPart2};