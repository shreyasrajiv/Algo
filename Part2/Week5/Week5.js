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
    this.nCities = 0;
    this.costMatrix = [];
    this.costMatrixWithPi = [];
    this.finalNode = new Node();

    main() {
        var citiesArray = loadCitiesArrayFromFile();
        createDistancesMatrixArrayFromCities(citiesArray);
        console.log("The minimum cost of TSP is = " + processTSP());
    }

    createDistancesMatrixArrayFromCities(citiesArray) {
        for (var i = 0; i < nCities; i++) {
            var city = citiesArray[i];
            for (var j = 0; j < nCities; j++) {
                var otherCity = citiesArray[j];
                costMatrix[i][j] = city.calculateDistanceToCity(otherCity);
            }
        }
    }

    loadCitiesArrayFromFile() {
        var citiesArray = [];
        var inputArr = readIntsFromFile('tsp.txt');

        nCities = inputArr.split('\\n')[0];

        for (var i = 0; i < nCities; i++) {
            var line = inputArr[i];

            var xCoordinate = line.split(" ")[0];
            var yCoordinate = line.split(" ")[1];

            citiesArray.add(new City(xCoordinate, yCoordinate));
        }
        return citiesArray;
    }

    processTSP() {
        finalNode.lowerBound = Number.MAX_VALUE;
        var currentNode = new Node();
        currentNode.excluded = [];
        costMatrixWithPi = [];
        currentNode.computeHeldKarp();

        var pq = [];

        do {
            do {
                var i = -1;
                for (var j = 0; j < nCities; j++) {
                    if (currentNode.degree[j] > 2 && (i < 0 || currentNode.degree[j] < currentNode.degree[i])) {
                        i = j;
                    }
                }

                if (i < 0) {
                    if (currentNode.lowerBound < finalNode.lowerBound) {
                        finalNode = currentNode;
                    }
                    break;
                }

                var children = [];
                children.push(currentNode.exclude(i, currentNode.parent[i]));

                for (j = 0; j < nCities; j++) {
                    if (currentNode.parent[j] === i) {
                        children.add(currentNode.exclude(i, j));
                    }
                }

                currentNode = children.pop();
                pq.push(children);
            } while (currentNode.lowerBound < finalNode.lowerBound);

            currentNode = pq.pop();
        } while (currentNode !== null && currentNode.lowerBound < finalNode.lowerBound);

        return finalNode.lowerBound;
    }

    class Node {
        this.excluded = [];
        this.pi = [];
        this.lowerBound = 0;
        this.degree = [];
        this.parent = [];

        computeHeldKarp() {
            this.pi = [];
            this.lowerBound = 0;
            this.degree = [];
            this.parent = [];

            var lambda = 0.1;
            while (lambda > 0.000001) {
                var previousLowerBound = this.lowerBound;
                computeOneTree();

                if (!(this.lowerBound < finalNode.lowerBound)) {
                    return;
                }

                if (!(this.lowerBound < previousLowerBound)) {
                    lambda *= 0.9;
                }

                var denom = 0;
                for (var i = 1; i < nCities; i++) {
                    var d = this.degree[i] - 2;
                    denom += d * d;
                }

                if (denom === 0) {
                    return;
                }

                var t = lambda * this.lowerBound / denom;
                for (i = 1; i < nCities; i++) {
                    this.pi[i] += t * (this.degree[i] - 2);
                }
            }
        }

        exclude(i, j) {
            var child = new Node();
            child.excluded = this.excluded;
            child.excluded[i] = this.excluded[i];
            child.excluded[j] = this.excluded[j];
            child.excluded[i][j] = true;
            child.excluded[j][i] = true;

            child.computeHeldKarp();
            return child;
        }

        addEdge(i, j) {
            var q = this.lowerBound;
            this.lowerBound += costMatrixWithPi[i][j];
            this.degree[i]++;
            this.degree[j]++;
        }

        computeOneTree() {
            this.lowerBound = 0;
            this.degree = [0];
            for (var i = 0; i < nCities; i++) {
                for (var j = 0; j < nCities; j++) {
                    costMatrixWithPi[i][j] = this.excluded[i][j] ? Number.MAX_VALUE : costMatrix[i][j] + this.pi[i] + this.pi[j];
                }
            }

            var firstNeighbor;
            var secondNeighbor;

            if (costMatrixWithPi[0][2] < costMatrixWithPi[0][1]) {
                firstNeighbor = 2;
                secondNeighbor = 1;
            }
            else {
                firstNeighbor = 1;
                secondNeighbor = 2;
            }

            for (j = 3; j < nCities; j++) {
                if (costMatrixWithPi[0][j] < costMatrixWithPi[0][secondNeighbor]) {
                    if (costMatrixWithPi[0][j] < costMatrixWithPi[0][firstNeighbor]) {
                        secondNeighbor = firstNeighbor;
                        firstNeighbor = j;
                    }
                    else {
                        secondNeighbor = j;
                    }
                }
            }

            addEdge(0, firstNeighbor);
            this.parent.fill(firstNeighbor);
            this.parent[firstNeighbor] = 0;

            var minCost = costMatrixWithPi[firstNeighbor];

            for (var k = 2; k < nCities; k++) {
                for (i = 1; i < nCities; i++) {
                    if (this.degree[i] === 0) {
                        break;
                    }
                }

                for (j = i + 1; j < nCities; j++) {
                    if (this.degree[j] === 0 && minCost[j] < minCost[i]) {
                        i = j;
                    }
                }

                addEdge(this.parent[i], i);
                for (j = 1; j < nCities; j++) {
                    if (this.degree[j] === 0 && costMatrixWithPi[i][j] < minCost[j]) {
                        minCost[j] = costMatrixWithPi[i][j];
                        this.parent[j] = i;
                    }
                }
            }

            addEdge(0, secondNeighbor);
            this.parent[0] = secondNeighbor;
        }
    }

    class NodeComparator {
        compare(a, b) {
            return Double.compare(a.lowerBound, b.lowerBound);
        }
    }

    class City {
        constructor(xCoordinate, yCoordinate) {
            this.xCoordinate = xCoordinate;
            this.yCoordinate = yCoordinate;
        }

        calculateDistanceToCity(other) {
            return Math.sqrt(Math.pow(xCoordinate - other.xCoordinate, 2) + Math.pow(yCoordinate - other.yCoordinate, 2));
        }
    }
}
