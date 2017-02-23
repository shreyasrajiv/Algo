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

    main() {
        var clausesOne = readClausesFromFile("2sat1.txt");
        if (processTwoSAT(clausesOne)) {
            console.log("2sat1.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat2.txt => No Satisfiable (0)");
        }

        var clausesTwo = readClausesFromFile("2sat2.txt");
        if (processTwoSAT(clausesTwo)) {
            console.log("2sat2.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat2.txt => No Satisfiable (0)");
        }

        var clausesThree = readClausesFromFile("2sat3.txt");
        if (processTwoSAT(clausesThree)) {
            console.log("2sat3.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat3.txt => No Satisfiable (0)");
        }

        var clausesFour = readClausesFromFile("2sat4.txt");
        if (processTwoSAT(clausesFour)) {
            console.log("2sat4.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat4.txt => No Satisfiable (0)");
        }

        var clausesFive = readClausesFromFile("2sat5.txt");
        if (processTwoSAT(clausesFive)) {
            console.log("2sat5.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat5.txt => No Satisfiable (0)");
        }

        var clausesSix = readClausesFromFile("2sat6.txt");
        if (processTwoSAT(clausesSix)) {
            console.log("2sat6.txt => Satisfiable (1)");
        }
        else {
            console.log("2sat6.txt => No Satisfiable (0)");
        }
    }

    processTwoSAT(clauses) {
        var falseClauses = [];
        var confArray = [];

        for (var i = 0; i < clauses.length; i++) {
            confArray.push(true);
        }

        var n = clauses.size();
        var count = 1;
        var done = false;

        while (count <= Math.log(n) / Math.log(2)) {
            var count2 = 1;

            Collections.shuffle(confArray);

            while (count2 <= 2 * n * n) {
                var c = generateRandomFalse(clauses, falseClauses, confArray);

                if (c === null) {
                    done = true;
                    break;
                }
                else {
                    var r = Math.random + 1;

                    if (r === 1) {
                        var b = confArray.get(Math.abs(c.getA()));
                        confArray[Math.abs(c.getA())] = !b;
                    }
                    else {
                        b = confArray.get(Math.abs(c.getB()));
                        confArray[Math.abs(c.getB())] = !b;
                    }
                }

                count2++;
            }

            if (done) {
                break;
            }

            count++;
        }

        return done;
    }

    generateRandomFalse(clauses, falseClauses, confArray) {
        var randomClause = null;

        falseClauses.clear();

        for (var c in clauses) {
            if (!c.evaluate(confArray[Math.abs(c.getA())], confArray[Math.abs(c.getB())])) {
                falseClauses.push(c);
            }
        }

        if (!falseClauses.isEmpty()) {
            Collections.shuffle(falseClauses);
            randomClause = falseClauses[0];
        }

        return randomClause;
    }

    readClausesFromFile(filename) {
        var clauses = [];
        var inputArr = readIntsFromFile(filename);

        var nItems = inputArr[0];

        var str;
        while (str in inputArr) {
            var i = str.split(" ")[0];
            if (i < 0) {
                i = i + 1;
            }
            else {
                i = i - 1;
            }

            var j = str.split(" ")[1];
            if (j < 0) {
                j = j + 1;
            }
            else {
                j = j - 1;
            }

            clauses.push(new Clause(i, j));
        }

        return clauses;
    }
}

class Clause {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    evaluate(a1, b1) {
        if (a < 0) {
            a1 = !a1;
        }

        if (b < 0) {
            b1 = !b1;
        }

        return a1 || b1;
    }
}
