/* global require */
var fs = require('fs');
var readIntsFromFile = function(path) {
    var inputArr = fs.readFileSync(path).toString().trim().split('\n');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i] = parseInt(inputArr[i]);
    }
    return inputArr;
};

class Question3 {
    this.graph = [];
    this.numberOfNodes = 0;
    this.spanningTree = [];

    main() {
        readGraphFromFile();
        console.log("*** Overall Cost = " + primMSTAlgorithm() + " ***");
    }

    primMSTAlgorithm() {
        var overallCost = 0;
        var position = 0;

        spanningTree.push(0, new ExpandedNode(0, position));

        var minimumCost = Number.MAX_SAFE_INTEGER;

        var minimumI = 0;
        var minimumJ = 0;

        while (!allNodesExpanded()) {
            for (var i = 0; i < numberOfNodes; i++) {
                if (isNodeExpanded(i)) {
                    for (var j = 0; j < numberOfNodes; j++) {
                        if (!isNodeExpanded(j)) {
                            if (minimumCost > graph[i][j]) {
                                minimumCost = graph[i][j];
                                minimumI = i;
                                minimumJ = j;
                            }
                        }
                    }
                }
            }

            spanningTree.push(minimumJ, new ExpandedNode(minimumJ, position));
            overallCost += graph[minimumI][minimumJ];
            minimumCost = Number.MAX_SAFE_INTEGER;
        }
        return overallCost;
    }

    allNodesExpanded() {
        return (spanningTree.length === numberOfNodes);
    }

    isNodeExpanded(index) {
        return (spanningTree[index] !== null);
    }

    readJobsFromFile() {
        var jobsArray;
        var weight;
        var length;
        var inputArr = readIntsFromFile('Jobs.txt');

        for (var line in inputArr) {

            weight = line.split(" ")[0];
            length = line.split(" ")[1];

            jobsArray.push(new JobQ1(weight, length));
        }

        return jobsArray;
    }

    readGraphFromFile() {
        var inputArr = readIntsFromFile('Edges.txt');
        var numberOfNodes = inputArr.length;

        for (var i = 0; i < numberOfNodes; i++) {
            for (var j = 0; j < numberOfNodes; j++) {
                graph[i][j] = Number.MAX_SAFE_INTEGER;
            }
        }

        for (var line in inputArr) {
            {
                var firstToken = line.split(" ")[0];
                var secondToken = line.split(" ")[1];
                var thirdToken = line.split(" ")[2];

                i = firstToken - 1;
                j = secondToken - 1;
                graph[i][j] = thirdToken;
                graph[j][i] = thirdToken;
            }
        }
    }
}

class ExpandedNode {
    constructor(nodeIndex, position) {
        this.nodeIndex = nodeIndex;
        this.position = position;
    }

    getNodeIndex() {
        return this.nodeIndex;
    }

    setNodeIndex(nodeIndex) {
        this.nodeIndex = nodeIndex;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }
}