const parseInput = input => {
    const chunks = input.split('\r\n\r\n');
    const rules = {};
    chunks[0].split('\r\n').forEach(line => {
        const splitLine = line.split(': ');
        if (splitLine[1][0] === '"') {
            rules[splitLine[0]] = {
                type: 'char',
                char: splitLine[1][1]
            };
            return;
        }

        rules[splitLine[0]] = {
            type: 'nodes',
            nodes: splitLine[1].split(' | ').map(part => part.split(' ').map(n => +n))
        };
    });

    const messages = chunks[1].split('\r\n');

    return {
        rules,
        messages
    };
};

const runPart1 = input => {
    const getMatch = (message, rule) => {
        console.debug(message);
        if (rule.type === 'char') {
            return message[0] === rule.char;
        }
        return rule.nodes.some(nodeList => {
            let msg = message;
            let isValid = true;
            nodeList.forEach(node => {
                isValid = isValid && getMatch(msg, input.rules[node]);
                msg = msg.slice(1);
            })
            return isValid;
        });
    };

    return input.messages.filter(msg => getMatch(msg, input.rules[0]));
};

const runPart2 = input => input;

module.exports = {parseInput, runPart1, runPart2};