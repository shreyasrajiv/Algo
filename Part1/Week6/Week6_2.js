/* global require */

var MaxHeap = function() {
 var heap = [];

 var insert = function(num) {
  heap.push(num);

  bubbleUp(heap.length - 1);
 };

 var swap = function(child, parent) {
  var tmp = heap[parent];
  heap[parent] = heap[child];
  heap[child] = tmp;
 };

 var bubbleUp = function(index) {
  if (index < 0) return;

  if (heap[index] > parent(index)) {
   swap(index, parentIndex(index));
   bubbleUp(parentIndex(index));
  }
 };

 var bubbleDown = function(index) {
  var childNodes = childrenIndexes(index);
  if (heap[childNodes[0]] === undefined && heap[childNodes[1]] === undefined) return;

  var hiIndex = childNodes[0];

  if (heap[childNodes[1]] === undefined) {
   hiIndex = childNodes[0];
  } else if (heap[childNodes[0]] >= heap[childNodes[1]]) {
   hiIndex = childNodes[0];
  } else if (heap[childNodes[0]] < heap[childNodes[1]]) {
   hiIndex = [childNodes[1]];
  }

  if (heap[hiIndex] > heap[index]) {
   swap(hiIndex, index);
   bubbleDown(hiIndex);
  }
 };

 var parent = function(index) {
  return heap[parentIndex(index)];
 };

 var parentIndex = function(index) {
  return Math.floor((index + 1) / 2) - 1;
 };

 var childrenIndexes = function(index) {
  return [(2 * (index + 1) - 1), (2 * (index + 1))];
 };

 var max = function() {
  return heap[0];
 };

 var extractMax = function() {
  swap(0, heap.length - 1);
  heap.splice(heap.length - 1);
  bubbleDown(0);
 };

 var size = function() {
  return heap.length;
 };

 return {
  insert: insert,
  max: max,
  extractMax: extractMax,
  size: size,
  heap: function() {
   return heap;
  }
 };
};

var MinHeap = function() {
 var heap = [];

 var insert = function(num) {
  heap.push(num);

  bubbleUp(heap.length - 1);
 };

 var swap = function(left, right) {
  var tmp = heap[right];
  heap[right] = heap[left];
  heap[left] = tmp;
 };

 var bubbleUp = function(index) {
  if (index < 0) return;

  if (heap[index] < parent(index)) {
   swap(index, parentIndex(index));
   bubbleUp(parentIndex(index));
  }
 };

 var bubbleDown = function(index) {
  var childNodes = childrenIndexes(index);
  if (heap[childNodes[0]] === undefined && heap[childNodes[1]] === undefined) return;

  var loIndex = childNodes[0];

  if (heap[childNodes[1]] === undefined) {
   loIndex = childNodes[0];
  } else if (heap[childNodes[0]] <= heap[childNodes[1]]) {
   loIndex = childNodes[0];
  } else if (heap[childNodes[0]] > heap[childNodes[1]]) {
   loIndex = [childNodes[1]];
  }

  if (heap[loIndex] < heap[index]) {
   swap(loIndex, index);
   bubbleDown(loIndex);
  }
 };

 var parent = function(index) {
  return heap[parentIndex(index)];
 };

 var parentIndex = function(index) {
  return Math.floor((index + 1) / 2) - 1;
 };

 var childrenIndexes = function(index) {
  return [(2 * (index + 1) - 1), (2 * (index + 1))];
 };

 var min = function() {
  return heap[0];
 };

 var extractMin = function() {
  swap(0, heap.length - 1);
  heap.splice(heap.length - 1);
  bubbleDown(0);
 };

 var size = function() {
  return heap.length;
 };

 return {
  insert: insert,
  min: min,
  extractMin: extractMin,
  size: size,
  heap: function() {
   return heap;
  }
 };
};

var Heap = require('heap');

var MedianMaintenance = function(inputStream) {
 var heapLo = new Heap(function(a, b) {
   return b - a;
  }),
  heapHi = new Heap(),
  stream = inputStream,
  medianSum = 0;

 var insert = function(num) {
  var toRedistribute;
  num = parseInt(num);
  if (heapLo.size() === 0 && heapHi.size() === 0) {
   heapLo.push(num);
  } else if (heapLo.peek() >= num) {
   heapLo.push(num);
  } else if (heapHi.peek() <= num || heapHi.size() === 0) {
   heapHi.push(num);
  } else {
   heapLo.push(num);
  }

  if (heapHi.size() > heapLo.size() && (heapHi.size() - 1) > heapLo.size()) {
   toRedistribute = heapHi.peek();
   heapHi.pop();
   heapLo.push(toRedistribute);
  }

  if (heapHi.size() < heapLo.size() && heapHi.size() < (heapLo.size() - 1)) {
   toRedistribute = heapLo.peek();
   heapLo.pop();
   heapHi.push(toRedistribute);
  }

 };

 var median = function() {
  if (heapHi.size() === 0 && heapLo.size() === 1) return heapLo.peek();
  if (heapLo.size() === 0 && heapHi.size() === 1) return heapHi.peek();
  if (heapHi.size() === heapLo.size()) return heapLo.peek();
  if (heapHi.size() > heapLo.size()) return heapHi.peek();
  if (heapLo.size() > heapHi.size()) return heapLo.peek();
 };


 var sumOfMedians = function() {
  while (stream.hasNext()) {
   insert(stream.next());
   medianSum += median();
  }

  return medianSum;
 };

 return {
  median: median,
  sumOfMedians: sumOfMedians
 };
};

var fs = require('fs');

var NumberStream = function(path) {
 var index = 0,
  numbers = fs.readFileSync(path).toString().trim().split(/\r?\n/);

 numbers = numbers.map(function(str) {
  return parseInt(str);
 });

 var next = function() {
  var nextNum = numbers[index];
  if (nextNum === undefined) throw 'error';
  index += 1;
  return nextNum;
 };

 var hasNext = function() {
  return !!numbers[index];
 };

 return {
  next: next,
  hasNext: hasNext
 };
};