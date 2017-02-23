/* global require */
var fs = require('fs');
var readIntsFromFile = function(path) {
    var inputArr = fs.readFileSync(path).toString().trim().split('\n');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i] = parseInt(inputArr[i]);
    }
    return inputArr;
};

class Question2 {
    main() {
        var jobsArray = readJobsFromFile();
        Array.sort(jobsArray, new JobsComparatorQ2());

        for (var job in jobsArray) {
            console.log("Job " + (jobsArray.indexOf(job) + 1) + " = Range : " + job.jobRangeValue());
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

class JobQ2 {
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
        return this.weight / this.length;
    }
}

class JobsComparatorQ2 {
    compare(job1, job2) {
        var result = 0;

        if (job1.jobRangeValue() < job2.jobRangeValue()) {
            result = 1;
        } else if (job1.jobRangeValue() > job2.jobRangeValue()) {
            result = -1;
        }

        return result;
    }
}