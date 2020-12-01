const parseInput = input => input.split('\r\n');

const createGraph = lines => {
   const edges = [];
   lines.forEach(line => {
      const [color, second] = line.split(' bags contain ');
      if (second === 'no other bags.') {
         return;
      }
      second.split(', ').forEach(part => {
         const splitPart = part.split(' ');
         const bColor = `${splitPart[1]} ${splitPart[2]}`;
         edges.push([color, {
            n: +splitPart[0],
            color: bColor
         }]);
      });
   });
   return edges;
};

const runGraph = (color, edges, nodesHit) => {
   edges.filter(([, node]) => node.color === color).forEach(([parentColor]) => {
      if (!nodesHit.includes(parentColor)) {
         nodesHit.push(parentColor);
         runGraph(parentColor, edges, nodesHit);
      }
   });
};

const runPart1 = lines => {
   const edges = createGraph(lines);
   const nodesHit = [];
   runGraph('shiny gold', edges, nodesHit);
   return nodesHit.length;
};

const runGraphPart2 = (color, parentMultiplier, edges, edgesUsed) => {
   edges.filter(([aColor]) => aColor === color).forEach(([, node]) => {
      const n = node.n * parentMultiplier;
      edgesUsed.push(n);
      runGraphPart2(node.color, n, edges, edgesUsed);
   });
};

const runPart2 = lines => {
   const edges = createGraph(lines);
   const edgesUsed = [];
   runGraphPart2('shiny gold', 1, edges, edgesUsed);
   return edgesUsed.reduce((acc, curr) => acc + curr, 0);
};

module.exports = {parseInput, runPart1, runPart2};