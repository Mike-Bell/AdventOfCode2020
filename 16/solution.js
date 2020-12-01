const parseInput = input => {
    const splitInp = input.split('\r\n\r\n');
    const rules = splitInp[0].split('\r\n').map(line => {
        const splitLine = line.split(': ');
        const rules = splitLine[1].split(' or ');
        return {
            name: splitLine[0],
            filters: rules.map(r => {
                const splitR = r.split('-');
                return [+splitR[0], +splitR[1]];
            })
        }
    });
    return {
        rules: rules,
        myTicket: splitInp[1].split('\r\n')[1].split(',').map(n => +n),
        tickets: splitInp[2].split('\r\n').slice(1).map(line => line.split(',').map(n => +n))
    };
};

const runPart1 = input => {
    let errors = 0;
    input.tickets.forEach(ticket => {
        ticket.forEach(val => {
            const isValid = input.rules.some(rule => {
                return rule.filters.some(filter => {
                    return val >= filter[0] && val <= filter[1];
                });
            });
            
            if (!isValid) {
                errors += val;
            }
        });
    });
    return errors;
};

const runPart2 = input => {
    // Filter out invalid tickets
    const tickets = input.tickets.filter(ticket => {
        return ticket.every(val => {
            return input.rules.some(rule => {
                return rule.filters.some(filter => {
                    return val >= filter[0] && val <= filter[1];
                });
            });
        });
    });

    // Figure out what possible rules are available for each number position
    const possibilities = input.rules.map(() => input.rules.map(() => true));
    tickets.forEach(ticket => {
        ticket.forEach((val, t) => {
            for (let i = 0; i < possibilities[t].length; i++) {
                if (possibilities[t][i]) {
                    const isPossible = input.rules[i].filters.some(filter => {
                        return val >= filter[0] && val <= filter[1];
                    })
                    possibilities[t][i] = isPossible;
                }
            }
        });
    });

    // By inpection, the number of possibilities starts at 1 for some number and increases to n. This allows us to figure out which number
    // maps to which rule by process of elimination
    const used = [];
    const numToRuleMap = [];
    for (let i = 0; i < possibilities.length; i++) {
        const numIndex = possibilities.findIndex(p => p.filter(ele => ele).length === i + 1);
        const ruleIndex = possibilities[numIndex].findIndex((ele, j) => ele && !used.includes(j));
        used.push(ruleIndex);
        numToRuleMap[numIndex] = ruleIndex;
    }

    // Multiply all the numbers that start with departure
    let product = 1;
    numToRuleMap.forEach((ruleIndex, numIndex) => {
        if (input.rules[ruleIndex].name.startsWith('departure')) {
            product = product * input.myTicket[numIndex];
        }
    })
    return product;
};

module.exports = {parseInput, runPart1, runPart2};