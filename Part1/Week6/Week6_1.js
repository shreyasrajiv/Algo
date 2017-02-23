/* global require */

var createHash = function(arr) {
 var hash = {};

 for (var i = 0; i < arr.length; i++) {
  if (hash[arr[i]] === undefined) {
   hash[arr[i]] = 1;
  } else {
   hash[arr[i]] = hash[arr[i]] + 1;
  }
 }

 return hash;
};

var hasTwoSum = function(hash, target) {
 console.log('sum for target: ' + target);

 for (var key in hash) {
  var expectedKey = target - parseInt(key);
  if (hash[expectedKey]) {
   return true;
  }
 }

 return false;
};

var computeTwoSumForRange = function(hash, start, end) {
 var totalTwoSums = 0;

 for (var i = start; i < end + 1; i++) {
  if (hasTwoSum(hash, i)) {
   totalTwoSums += 1;
  }
 }

 return totalTwoSums;
};

var fs = require('fs'),
 hash = createHash,
 twoSum = computeTwoSumForRange;

var rawInput = fs.readFileSync('prob1.txt').toString();
var numbersArr = rawInput.trim().split(/\r?\n/);
var hashedArray = hash(numbersArr);

var totalTargetHitCounts = twoSum(hashedArray, -10000, 10000);

console.log('hits: ' + totalTargetHitCounts);