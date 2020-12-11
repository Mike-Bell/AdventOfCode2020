

const parseInput = input => input.split('\r\n').map(line => line.split('').map(c => ({'.': 0, 'L': 1, '#': 2}[c])));

const runPart1 = lines => {
   let current = lines;
   const getAdjacentOccupiedSeats = (i, j) => {
      let sum = 0;
      [-1, 0, 1].forEach(di => {
         const row = current[i + di];
         if (!row) {
            return;
         }
         [-1, 0, 1].forEach(dj => {
            if (di === 0 && dj === 0) {
               return;
            }

            if (row[j + dj] === 2) {
               sum++;
            }
         });
      });

      return sum;
   };

   while(true) {
      const next = lines.map(line => [...line]);

      current.forEach((line, i) => {
         line.forEach((val, j) => {
            const adjacents = getAdjacentOccupiedSeats(i, j);
            if (val === 1 && adjacents === 0) {
               next[i][j] = 2;
            } else if (val === 2 && adjacents >= 4) {
               next[i][j] = 1;
            } else {
               next[i][j] = val;
            }
         });
      });

      if (next.every((line, i) => line.every((val, j) => current[i][j] === val))) {
         break;
      }

      current = next;
   }

   return current.reduce((acc, line) => {
      return acc + line.reduce((acc2, val) => acc2 + (val === 2), 0);
   }, 0);
};

const runPart2 = lines => {
   let current = lines;
   const getAdjacentOccupiedSeats = (i, j) => {
      let sum = 0;
      [-1, 0, 1].forEach(di => {
         [-1, 0, 1].forEach(dj => {
            if (di === 0 && dj === 0) {
               return;
            }

            let multiplier = 1;
            while (true) {
               const row = current[i + di * multiplier];
               if (!row) {
                  break;
               }

               const val = row[j + dj * multiplier];
               if (val === undefined || val === 1) {
                  break;
               }

               if (val === 2) {
                  sum++;
                  break;
               }

               multiplier++;
            }
         });
      });

      return sum;
   };

   while(true) {
      const next = lines.map(line => [...line]);

      current.forEach((line, i) => {
         line.forEach((val, j) => {
            if (val === 0) {
               return;
            }

            const adjacents = getAdjacentOccupiedSeats(i, j);
            if (val === 1 && adjacents === 0) {
               next[i][j] = 2;
            } else if (val === 2 && adjacents >= 5) {
               next[i][j] = 1;
            } else {
               next[i][j] = val;
            }
         });
      });

      if (next.every((line, i) => line.every((val, j) => current[i][j] === val))) {
         break;
      }

      current = next;
   }

   return current.reduce((acc, line) => {
      return acc + line.reduce((acc2, val) => acc2 + (val === 2), 0);
   }, 0);
};

module.exports = {parseInput, runPart1, runPart2};