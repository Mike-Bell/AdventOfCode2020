const parseInput = input => input.split('\r\n');

const runPart1 = lines => {
   const evaluate = expr => {
      let nextParen = expr.indexOf(')');
      while (nextParen > -1) {
         let match = nextParen + 1;
         let depth = 0;
         while (expr[match] !== '(' || depth !== 0) {
            if (expr[match] === ')') {
               depth++;
            } else if (expr[match] === '(') {
               depth--;
            }
            match++;
         }
         expr = expr.slice(0, nextParen) + evaluate(expr.slice(nextParen + 1, match)) + expr.slice(match + 1);
         nextParen = expr.indexOf(')');
      }
      const nextOp = expr.split('').findIndex(c => c === '*' || c === '+');

      if (nextOp === -1) {
         return +expr;
      }

      const left = expr.slice(0, nextOp);
      const right = expr.slice(nextOp + 1);
      if (expr[nextOp] === '*') {
         return evaluate(left) * evaluate(right);
      } else if (expr[nextOp] === '+') {
         return evaluate(left) + evaluate(right);
      }
   };

   return lines.map(line => evaluate(line.split('').reverse().join('')))
      .reduce((acc, curr) => acc + curr, 0);
};

const runPart2 = lines => {
   const evaluate = expr => {
      let nextParen = expr.indexOf(')');
      while (nextParen > -1) {
         let match = nextParen + 1;
         let depth = 0;
         while (expr[match] !== '(' || depth !== 0) {
            if (expr[match] === ')') {
               depth++;
            } else if (expr[match] === '(') {
               depth--;
            }
            match++;
         }
         expr = expr.slice(0, nextParen) + evaluate(expr.slice(nextParen + 1, match)) + expr.slice(match + 1);
         nextParen = expr.indexOf(')');
      }
      const nextM = expr.indexOf('*');
      const nextP = expr.indexOf('+');
      const nextOp = nextM !== -1 ? nextM : nextP;

      if (nextOp == -1) {
         return +expr;
      }

      const left = expr.slice(0, nextOp);
      const right = expr.slice(nextOp + 1);
      if (expr[nextOp] === '*') {
         return evaluate(left) * evaluate(right);
      } else if (expr[nextOp] === '+') {
         return evaluate(left) + evaluate(right);
      }
   };

   return lines.map(line => evaluate(line.split('').reverse().join('')))
      .reduce((acc, curr) => acc + curr, 0);
};

module.exports = {parseInput, runPart1, runPart2};