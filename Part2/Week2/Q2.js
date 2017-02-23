class Question2 {
    this.numberOfBits = 0;
    this.numberOfNodes = 0;

    main() {
        var nodesArray = readNodesArrayFromFile();
        var auxNodesMap = [];

        for (var i = 0; i < nodesArray.length; i++) {
            auxNodesMap.push(nodesArray[i], i);
        }

        numberOfNodes = auxNodesMap.length;

        var value = 0;
        var nodesMap = [];

        auxNodesMap.forEach(function (part, index, nodesMap) {
            nodesMap[index] = auxNodesMap[index];
        });

        var unionFind = new QuickUnionPathCompressionUF(numberOfNodes);

        for (var key in nodesMap) {
            var closeNodes = getCloseNodes(key);

            for (var j = 0; j < closeNodes.length; j++) {
                var k = closeNodes[j];

                if (nodesMap.containsKey(k)) {
                    unionFind.union(nodesMap.get(key), nodesMap.get(k));
                }
            }
        }

        console.log("Number of Clusters = " + unionFind.count());
    }

    getCloseNodes(node) {
        var nodeBinary = getBinaryIntArrayFromString(node);
        var output = [];

        var count = 0;

        for (var i = 0; i < numberOfBits; i++) {
            for (var j = i; j < numberOfBits; j++) {
                var newNodeBinary = nodeBinary;

                if (i !== j) {
                    newNodeBinary[i] = (nodeBinary[i] + 1) % 2;
                    newNodeBinary[j] = (nodeBinary[j] + 1) % 2;
                }
                else {
                    newNodeBinary[i] = (nodeBinary[i] + 1) % 2;
                }

                output[count] = getStringFromBinaryIntArray(newNodeBinary);
                count++;
            }
        }

        return output;
    }

    getBinaryIntArrayFromString(node) {
        var nodeBinary;
        var count = 0;

        for (var i = 0; i < node.length; i++) {
            if (node[i] !== ' ') {
                nodeBinary[count] = node[i] - '0';
                count++;
            }
        }

        return nodeBinary;
    }

    getStringFromBinaryIntArray() {
        var sb;

        for (var i = 0; i < numberOfBits; i++) {
            sb.append(binArray[i]);

            if (i < numberOfBits - 1) {
                sb.append(" ");
            }
        }

        return sb;
    }

    readNodesArrayFromFile() {
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
}
