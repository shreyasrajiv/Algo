/* global require */
var fs = require('fs');
var readIntsFromFile = function (path) {
    var inputArr = fs.readFileSync(path)
        .toString()
        .trim()
        .split('\n');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i] = parseInt(inputArr[i]);
    }
    return inputArr;
};

class Question1 {
    this.MAX_INT_VALUE = 999999;

    main() {
        var firstGraph = [];
        var numberOfNodesG1 = loadGraphFromFile("g1.txt", firstGraph);

        var firstGraphComputation = computeFloydWarshallAlgorithm(firstGraph, numberOfNodesG1);

        console.log("*** Minimum shortest path of the graph1 = " + firstGraphComputation + " ***");

        var secondGraph = [];
        var numberOfNodesG2 = loadGraphFromFile("g2.txt", secondGraph);

        var secondGraphComputation = computeFloydWarshallAlgorithm(secondGraph, numberOfNodesG2);

        console.log("*** Minimum shortest path of the graph2 => " + secondGraphComputation + " ***");

        var thirdGraph = [];
        var numberOfNodesG3 = loadGraphFromFile("g3.txt", thirdGraph);

        var thirdGraphComputation = computeFloydWarshallAlgorithm(thirdGraph, numberOfNodesG3);

        console.log("*** Minimum shortest path of the graph3 = " + thirdGraphComputation + " ***");
    }

    computeFloydWarshallAlgorithm(graph, numberOfNodes) {
        var shortestPathLength = 0;
        var A = [];

        for (var i = 0; i < numberOfNodes; i++) {
            for (var j = 0; j < numberOfNodes; j++) {
                for (var k = 0; k < numberOfNodes; k++) {
                    if (k === 0) {
                        if (i === j) {
                            A[i][j][0] = 0;
                        }
                        else {
                            var key = i + "|" + j;
                            var edge = graph[key];

                            if (edge !== null) {
                                A[i][j][0] = edge.length;
                            }
                            else {
                                A[i][j][0] = this.MAX_INT_VALUE;
                            }
                        }
                    }
                    else {
                        if (i === j) {
                            A[i][j][k] = 0;
                        }
                        else {
                            A[i][j][k] = this.MAX_INT_VALUE;
                        }
                    }
                }
            }
        }

        for (k = 1; k < numberOfNodes; k++) {
            for (i = 0; i < numberOfNodes; i++) {
                for (j = 0; j < numberOfNodes; j++) {
                    var firstItem = A[i][j][k - 1];
                    var secondItem = A[i][k][k - 1] + A[k][j][k - 1];

                    A[i][j][k] = Math.min(firstItem, secondItem);
                }
            }
        }

        var negativeCycles = false;

        for (i = 0; i < numberOfNodes; i++) {
            if (A[i][i][numberOfNodes - 1] < 0) {
                negativeCycles = true;
                break;
            }
        }

        if (!negativeCycles) {
            for (i = 0; i < numberOfNodes; i++) {
                for (j = 0; j < numberOfNodes; j++) {
                    shortestPathLength = Math.min(shortestPathLength, A[i][j][numberOfNodes - 1]);
                }
            }
        }
        else {
            shortestPathLength = -1;
        }

        return shortestPathLength;
    }

    loadGraphFromFile(path, graph) {
        var numberOfNodes = 0;
        var inputArr = readIntsFromFile('Jobs.txt');

        numberOfNodes = inputArr[0].split(" ")[0];
        var numberOfVertex = inputArr[0].split(" ")[1];

        var tailNode;
        var headNode;
        var length;
        var str;
        var key;
        var edge;

        for (str in inputArr) {
            tailNode = str[0].split(" ")[0];
            headNode = str[0].split(" ")[1];
            length = str[0].split(" ")[2];

            key = headNode + "|" + tailNode;
            edge = new Edge(headNode, tailNode, length);
            this.graph.push([key, edge]);
        }

        return numberOfNodes;
    }
}

class Edge {
    constructor(headNode, tailNode, length) {
        this.headNode = headNode;
        this.tailNode = tailNode;
        this.length = length;
    }

    getHeadNode() {
        return this.headNode;
    }

    setHeadNode(headNode) {
        this.headNode = headNode;
    }

    getTailNode() {
        return this.tailNode;
    }

    setTailNode(tailNode) {
        this.tailNode = tailNode;
    }

    getLength() {
        return this.length;
    }

    setLength(length) {
        this.length = length;
    }
}
