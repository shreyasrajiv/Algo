/* global require */
var fs = require('fs');
var readIntsFromFile = function(path) {
    var inputArr = fs.readFileSync(path).toString().trim().split('\n');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i] = parseInt(inputArr[i]);
    }
    return inputArr;
};

class Question1 {
    this.k = 4;
    this.numberOfEdges = 0;
    this.parents = [];


    main() {
        var edgesArray = [];
        Array.sort(edgesArray);

        var unionFind = new QuickUnionPathCompressionUF(this.numberOfEdges);

        for (var e in edgesArray) {
            unionFind.union(e.getI(), e.getJ());

            if (unionFind.count() === this.k) {
                break;
            }
        }

        var max = Number.MAX_SAFE_INTEGER;

        for (e in edgesArray) {
            if (unionFind.find(e.getI()) !== unionFind.find(e.getJ())) {
                max = Math.min(max, e.getCost());
            }
        }

        console.log("Max-Spacing K-Clustering = " + max);
    }

    readEdgesArrayFromFile() {
        var edgesArray = [];
        var inputArr = readIntsFromFile('clustering1.txt');

        this.numberOfEdges = inputArr.length;
        this.parents = [];

        for (var i = 0; i < this.numberOfEdges; i++) {
            this.parents[i] = -1;
        }

        for (var line in inputArr) {
            i = line.split(" ")[0];
            var j = line.split(" ")[1];
            var v = line.split(" ")[2];
            edgesArray.add(new Edge(i - 1, j - 1, v));
        }

        return edgesArray;
    }
}

class Edge {
    constructor(i, j, cost) {
        this.i = i;
        this.j = j;
        this.cost = cost;
    }


    getI() {
        return this.i;
    }

    setI(i) {
        this.i = i;
    }

    getJ() {
        return this.j;
    }

    setJ(j) {
        this.j = j;
    }

    getCost() {
        return this.cost;
    }

    setCost(cost) {
        this.cost = cost;
    }

    compareTo(edge) {
        var result;

        if (this.getCost() >= edge.getCost()) {
            result = 1;
        } else {
            result = -1;
        }

        return result;
    }
}