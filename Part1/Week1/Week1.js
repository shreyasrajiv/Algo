/* global require */
var fs = require('fs');

var readIntsFromFile = function(path) {
 var inputArr = fs.readFileSync(path)
  .toString()
  .trim()
  .split('\n');
 for (var i = 0; i < inputArr.length; i++) {
  inputArr[i] = parseInt(inputArr[i]);
 }
 return inputArr;
};

var mergeAndCountSplitInversions = function(a, b) {
 var mergedLength = a.length + b.length,
  mergedArr = [],
  leftIndex = 0,
  rightIndex = 0,
  inversionsCount = 0;

 for (var k = 0; k < mergedLength; k++) {
  var leftSide = a[leftIndex],
   rightSide = b[rightIndex];

  if (leftSide < rightSide) {
   mergedArr.push(leftSide);
   leftIndex += 1;
  } else if (rightSide < leftSide) {
   inversionsCount += a.length - leftIndex;
   mergedArr.push(rightSide);
   rightIndex += 1;
  } else if (rightSide !== undefined) {
   mergedArr.push(rightSide);
   rightIndex += 1;
  } else if (leftSide !== undefined) {
   mergedArr.push(leftSide);
   leftIndex += 1;
  } else {
   throw 'unexpected input';
  }
 }

 return {
  mergedArr: mergedArr,
  inversions: inversionsCount
 };
};

var sortAndCountInversions = function(arr) {
 if (arr.length < 2) {
  return {
   sortedArray: arr,
   inversions: 0
  };
 }

 var middle = Math.floor(arr.length / 2);
 var left = sortAndCountInversions(arr.slice(0, middle));
 var right = sortAndCountInversions(arr.slice(middle));
 var split = mergeAndCountSplitInversions(left.sortedArray, right.sortedArray);

 return {
  sortedArray: split.mergedArr,
  inversions: split.inversions + left.inversions + right.inversions
 };
};

var countInversions = function(arr) {
 if (arr.length <= 1) return 0;
 return sortAndCountInversions(arr)
  .inversions;
};

var inputArr = readIntsFromFile('IntegerArray.txt');
var inversionCount = countInversions(inputArr);
console.log('result: ' + inversionCount);