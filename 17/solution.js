const range = require('../utils/range');

const parseInput = input => input.split('\r\n').map(line => line.split('').map(ele => ele === '#'));

const runPart1 = input => {
    let grid = {
        bounds: {
            x: [],
            y: [],
            z: []
        }
    };

    const getValue = (x, y, z) => {
        return !!(grid[x] && grid[x][y] && grid[x][y][z]);
    };

    const visualize = () => {
        console.debug('visualization:');
        range(grid.bounds.z[0], grid.bounds.z[1] + 1).forEach(z => {
            console.debug(`z=${z}`);
            range(grid.bounds.x[0], grid.bounds.x[1] + 1).forEach(x => {
                let line = '';
                range(grid.bounds.y[0], grid.bounds.y[1] + 1).forEach(y => {
                    line += getValue(x, y, z) ? '#' : '.';
                });
                console.debug(line);
            });
        });
    };

    const getNeighbors = (x, y, z) => {
        let sum = 0;
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                [-1, 0, 1].forEach(dz => {
                    if (dx !== 0 || dy !== 0 || dz !== 0) {
                        sum += getValue(x + dx, y + dy, z + dz);
                    }
                });
            });
        });
        return sum;
    }

    const turnOn = (x, y, z, subject) => {
        subject.bounds = subject.bounds || {
            x: [],
            y: [],
            z: []
        };

        if (subject.bounds.x[0] === undefined) {
            subject.bounds.x = [x - 1, x + 1];
        }

        if (subject.bounds.y[0] === undefined) {
            subject.bounds.y = [y - 1, y + 1];
        }

        if (subject.bounds.z[0] === undefined) {
            subject.bounds.z = [z - 1, z + 1];
        }

        subject.bounds.x[0] = Math.min(subject.bounds.x[0], x -1);
        subject.bounds.y[0] = Math.min(subject.bounds.y[0], y -1);
        subject.bounds.z[0] = Math.min(subject.bounds.z[0], z -1);

        subject.bounds.x[1] = Math.max(subject.bounds.x[1], x +1);
        subject.bounds.y[1] = Math.max(subject.bounds.y[1], y +1);
        subject.bounds.z[1] = Math.max(subject.bounds.z[1], z +1);

        subject[x] = subject[x] || {};
        subject[x][y] = subject[x][y] || {};
        subject[x][y][z] = true;
    };

    input.forEach((line, x) => {
        line.forEach((ele, y) => {
            if (ele) {
                turnOn(x, y, 0, grid);
            }
        });
    });

    const runStep = () => {
        const newGrid = {};
        range(grid.bounds.x[0], grid.bounds.x[1] + 1).forEach(x => {
            range(grid.bounds.y[0], grid.bounds.y[1] + 1).forEach(y => {
                range(grid.bounds.z[0], grid.bounds.z[1] + 1).forEach(z => {
                    const val = getValue(x, y, z);
                    const n = getNeighbors(+x, +y, +z);
                    if (val) {
                        if (n === 2 || n === 3) {
                            turnOn(+x, +y, +z, newGrid);
                        }
                    } else {
                        if (n === 3) {
                            turnOn(+x, +y, +z, newGrid);
                        }
                    }
                });
            });
        });

        grid = newGrid;
    }

    range(6).forEach(_ => {
        runStep();
    });

    let sum = 0;
    range(grid.bounds.x[0], grid.bounds.x[1] + 1).forEach(x => {
        range(grid.bounds.y[0], grid.bounds.y[1] + 1).forEach(y => {
            range(grid.bounds.z[0], grid.bounds.z[1] + 1).forEach(z => {
                sum += getValue(x, y, z);
            });
        });
    });

    return sum;
};

const runPart2  = input => {
    let grid = {
        bounds: {
            x: [],
            y: [],
            z: [],
            w: []
        }
    };

    const getValue = (x, y, z, w) => {
        return !!(grid[x] && grid[x][y] && grid[x][y][z] && grid[x][y][z][w]);
    };

    const getNeighbors = (x, y, z, w) => {
        let sum = 0;
        [-1, 0, 1].forEach(dx => {
            [-1, 0, 1].forEach(dy => {
                [-1, 0, 1].forEach(dz => {
                    [-1, 0, 1].forEach(dw => {
                        if (dx !== 0 || dy !== 0 || dz !== 0 || dw !== 0) {
                            sum += getValue(x + dx, y + dy, z + dz, w + dw);
                        }
                    });
                });
            });
        });
        return sum;
    }

    const turnOn = (x, y, z, w, subject) => {
        subject.bounds = subject.bounds || {
            x: [],
            y: [],
            z: [],
            w: []
        };

        if (subject.bounds.x[0] === undefined) {
            subject.bounds.x = [x - 1, x + 1];
        }

        if (subject.bounds.y[0] === undefined) {
            subject.bounds.y = [y - 1, y + 1];
        }

        if (subject.bounds.z[0] === undefined) {
            subject.bounds.z = [z - 1, z + 1];
        }

        if (subject.bounds.w[0] === undefined) {
            subject.bounds.w = [w - 1, w + 1];
        }

        subject.bounds.x[0] = Math.min(subject.bounds.x[0], x -1);
        subject.bounds.y[0] = Math.min(subject.bounds.y[0], y -1);
        subject.bounds.z[0] = Math.min(subject.bounds.z[0], z -1);
        subject.bounds.w[0] = Math.min(subject.bounds.w[0], w -1);

        subject.bounds.x[1] = Math.max(subject.bounds.x[1], x +1);
        subject.bounds.y[1] = Math.max(subject.bounds.y[1], y +1);
        subject.bounds.z[1] = Math.max(subject.bounds.z[1], z +1);
        subject.bounds.w[1] = Math.max(subject.bounds.w[1], w +1);

        subject[x] = subject[x] || {};
        subject[x][y] = subject[x][y] || {};
        subject[x][y][z] = subject[x][y][z] || {};
        subject[x][y][z][w] = true;
    };

    input.forEach((line, x) => {
        line.forEach((ele, y) => {
            if (ele) {
                turnOn(x, y, 0, 0, grid);
            }
        });
    });

    const runStep = () => {
        const newGrid = {};
        range(grid.bounds.x[0], grid.bounds.x[1] + 1).forEach(x => {
            range(grid.bounds.y[0], grid.bounds.y[1] + 1).forEach(y => {
                range(grid.bounds.z[0], grid.bounds.z[1] + 1).forEach(z => {
                    range(grid.bounds.w[0], grid.bounds.w[1] + 1).forEach(w => {
                        const val = getValue(x, y, z, w);
                        const n = getNeighbors(+x, +y, +z, +w);
                        if (val) {
                            if (n === 2 || n === 3) {
                                turnOn(+x, +y, +z, +w, newGrid);
                            }
                        } else {
                            if (n === 3) {
                                turnOn(+x, +y, +z, +w, newGrid);
                            }
                        }
                    });
                });
            });
        });

        grid = newGrid;
    }

    range(6).forEach(_ => {
        runStep();
    });

    let sum = 0;
    range(grid.bounds.x[0], grid.bounds.x[1] + 1).forEach(x => {
        range(grid.bounds.y[0], grid.bounds.y[1] + 1).forEach(y => {
            range(grid.bounds.z[0], grid.bounds.z[1] + 1).forEach(z => {
                range(grid.bounds.w[0], grid.bounds.w[1] + 1).forEach(w => {
                    sum += getValue(x, y, z, w);
                });
            });
        });
    });

    return sum;
};

module.exports = {parseInput, runPart1, runPart2};