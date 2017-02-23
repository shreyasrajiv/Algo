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
    main() {
        var jobsArray = readJobsFromFile();
        Array.sort(jobsArray, new JobsComparatorQ1());

        for (var job in jobsArray) {
            console.log("Job " + (jobsArray.indexOf(job) + 1) + " = Range : " + job.jobRangeValue() + " Weight : " + job.getWeight());
        }

        var sumLength = 0;
        var sumWeighted = 0;

        for (job in jobsArray) {
            sumLength += job.getLength();
            sumWeighted += (sumLength * job.getWeight());
        }

        console.log("Total Sum Weighted = " + sumWeighted);
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
}

class JobQ1 {
    constructor(weight, length) {
        this.weight = weight;
        this.length = length;
    }

    getWeight() {
        return this.weight;
    }

    getLength() {
        return this.length;
    }

    jobRangeValue() {
        return this.weight - this.length;
    }
}


class JobsComparatorQ1 {
    compare(job1, job2) {
        var result;

        if (job1.getWeight() - job1.getLength() === job2.getWeight() - job2.getLength()) {
            result = job1.getWeight() - job2.getWeight();
        } else {
            result = (job1.getWeight() - job1.getLength()) - (job2.getWeight() - job2.getLength());
        }

        return result * (-1);
    }
}