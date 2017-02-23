/* global require, process */

var fs = require('fs');

var readInput = function(path) {
 var inputArr = fs.readFileSync(path).toString().trim().split('\n');
 for (var i = 0; i < inputArr.length; i++) {
  inputArr[i] = parseInt(inputArr[i]);
 }
 return inputArr;
};

var swap = function(arr, i, j) {
 var tmp = arr[i];
 arr[i] = arr[j];
 arr[j] = tmp;
 return arr;
};

var medianSwap = function(arr, leftIndex, rightIndex) {
 var middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
 var first = arr[leftIndex];
 var middle = arr[middleIndex];
 var last = arr[rightIndex];
 var median = [first, middle, last].sort(function(a, b) {
  return a - b;
 })[1];

 var medianIndex = leftIndex;
 if (median === last) medianIndex = rightIndex;
 if (median === middle) medianIndex = middleIndex;

 return swap(arr, leftIndex, medianIndex);
};

function QuickSorter(unsortedArr, pivot) {
 var arr = unsortedArr,
  pivotType = pivot,
  comparisons = 0;

 var sort = function(leftIndex, rightIndex) {
  if (leftIndex === undefined || leftIndex === null) leftIndex = 0;
  if (rightIndex === undefined || rightIndex === null) rightIndex = arr.length - 1;

  if (leftIndex < rightIndex) {
   comparisons += rightIndex - leftIndex;
   setPivot(leftIndex, rightIndex);
   var partitionedPivotIndex = partition(leftIndex, rightIndex);
   sort(leftIndex, partitionedPivotIndex - 1);
   sort(partitionedPivotIndex + 1, rightIndex);
  }
 };

 var partition = function(leftIndex, rightIndex) {
  var i = leftIndex + 1;
  var pivot = arr[leftIndex];
  for (var j = leftIndex + 1; j <= rightIndex; j++) {
   if (arr[j] < pivot) {
    arr = swap(arr, i, j);
    i += 1;
   }
  }
  arr = swap(arr, leftIndex, i - 1);
  return i - 1;
 };

 var setPivot = function(leftIndex, rightIndex) {
  if (pivotType === 'FIRST_ITEM') {} else if (pivotType === 'LAST_ITEM') {
   arr = swap(arr, leftIndex, rightIndex);
  } else if (pivotType === 'MEDIAN') {
   arr = medianSwap(arr, leftIndex, rightIndex);
  } else {
   throw 'Error';
  }
 };

 return {
  sort: sort,
  arr: function() {
   return arr;
  },
  comparisons: function() {
   return comparisons;
  }
 };
}

var pivotType = process.argv[2] || 'FIRST_ITEM',
 inputArr = readInput('QuickSort.txt');

var firstElementPivotSort = new QuickSorter(inputArr, pivotType);
firstElementPivotSort.sort();

console.log(pivotType + ' pivot. No of comparisons: = ' + firstElementPivotSort.comparisons());