// TASK: https://adventofcode.com/2021/day/12

const inputString = `FK-gc
gc-start
gc-dw
sp-FN
dw-end
FK-start
dw-gn
AN-gn
yh-gn
yh-start
sp-AN
ik-dw
FK-dw
end-sp
yh-FK
gc-gn
AN-end
dw-AN
gn-sp
gn-FK
sp-FK
yh-gc`;

function prepareData(dataString) {
    function isBigCavern(name) {
        return name === name.toUpperCase();
    }

    function addEdge(graph, from, to) {
        if (!graph[from]) {
            graph[from] = {
                directions: [],
                isBig: isBigCavern(from),
                visitsCount: 0
            }
        }
        graph[from].directions.push(to);
    }

    const directions = dataString.split('\n').map((row) => row.split('-'));

    return directions.reduce((graph, [from, to]) => {
        addEdge(graph, from, to);
        addEdge(graph, to, from);
        return graph;
    }, {});
}


function getPath(graph, current, path, limit) {
    if (current === 'end') {
        path += 'end';
        return 1;
    } else {
        path += `${current},`;
    }

    graph[current].visitsCount += 1;

    let count = 0;
    graph[current].directions.forEach((target) => {
        if (target !== 'start' && (graph[target].visitsCount < limit || graph[target].isBig)) {
            // go deeper
            const copy = Object.keys(graph).reduce((acc, key) => {
                acc[key] = { ...graph[key] };
                return acc;
            }, {});

            const newLimit = limit === 1 ? 1 : (graph[target].visitsCount < limit - 1 || graph[target].isBig ? limit : limit - 1);
            count += getPath(copy, target, path, newLimit);
        }
    });
    return count;
}

function part1(caverns) {
    return getPath(caverns, 'start', '', 1);
}

function part2(caverns) {
    return getPath(caverns, 'start', '', 2);
}

(async function() {
    let cavernsMap = prepareData(inputString);

    console.log('PART 1: ', part1(cavernsMap));
    console.log('PART 2: ', part2(cavernsMap));
})();
