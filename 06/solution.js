const parseInput = input => input.split('\r\n\r\n').map(group => group.split('\r\n').map(person => person.split('')));

const runPart1 = groups => groups
   .map(group => 
      Object.keys(group
         .reduce((answers, person) => {
            person.forEach(answer => {
               answers[answer] = true;
            });
            return answers;
         }, {})
      ).length
   ).reduce((acc, curr) => acc + curr, 0);

const runPart2 = groups => groups
   .map(group => 
      Object.values(
         group.reduce((answerCounts, person) => {
            person.forEach(answer => {
               answerCounts[answer] = (answerCounts[answer] || 0) + 1;
            });
            return answerCounts;
         }, {})
      ).filter(numYes => numYes === group.length).length
   ).reduce((acc, curr) => acc + curr, 0);

module.exports = {parseInput, runPart1, runPart2};