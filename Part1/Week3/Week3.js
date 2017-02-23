/* global require */

var _ = require('lodash');

var Graph = function AdjacencyListGraph(inputGraph) {
 var graph = inputGraph;

 var contract = function(vertexA, vertexB) {
  var contractedEdges;
  var aEdges = graph[vertexA];
  var bEdges = graph[vertexB];

  delete graph[vertexB];

  contractedEdges = aEdges.concat(bEdges);
  contractedEdges = _.without(contractedEdges, vertexA, vertexB);
  graph[vertexA] = contractedEdges;

  substituteOldVertexWithNewOne(vertexA, vertexB);

  return graph;
 };

 var substituteOldVertexWithNewOne = function(vertexA, vertexB) {
  for (var vertex in graph) {
   if (graph.hasOwnProperty(vertex) && graph[vertex].indexOf(vertexB) !== -1) {
    for (var i = 0; i < graph[vertex].length; i++) {
     if (graph[vertex][i] === vertexB) {
      graph[vertex][i] = vertexA;
     }
    }
   }
  }
 };

 var getVertexes = function() {
  var vertexes = [];
  for (var vertex in graph) {
   if (graph.hasOwnProperty(vertex)) {
    vertexes.push(parseInt(vertex));
   }
  }

  return vertexes;
 };

 var getEdges = function(vertex) {
  return graph[vertex];
 };

 return {
  contract: contract,
  getVertexes: getVertexes,
  getEdges: getEdges,
  getGraph: function() {
   return graph;
  }
 };
};

var buildAdjacencyList = function(str) {
 if (!str) return [];

 var result = {};
 var splitLines = str.split('\n');
 for (var i = 0; i < splitLines.length; i++) {
  var rawLine = splitLines[i].trim();
  if (rawLine) {
   var splitElements = rawLine.split('\t');

   result[splitElements[0]] = splitElements.slice(1).map(function(el) {
    return parseInt(el);
   });
  }
 }
 return result;
};

var runKarger = function(adjList) {
 var repeatCoefitient = 3;
 var numberOfRuns = new Graph(_.cloneDeep(adjList)).getVertexes().length * repeatCoefitient,
  minCut = 0;

 for (var i = 0; i < numberOfRuns; i++) {
  var cut = contract(_.cloneDeep(adjList));

  if (i === 0 || cut < minCut) {
   minCut = cut;
  }
 }

 return minCut;
};

var contract = function(adjList) {
 var contractedGraph = randomContraction(new Graph(adjList));
 return contractedGraph.getGraph()[contractedGraph.getVertexes()[0]].length;
};

var randomContraction = function(graph) {
 var totalIterations = (graph.getVertexes().length - 2);

 for (var i = 0; i < totalIterations; i++) {
  var currentVertexes = graph.getVertexes();
  var range = currentVertexes.length;
  var aIndex = Math.floor(Math.random() * range);
  var vertexA = currentVertexes[aIndex];
  var vertexB = getRandomFromSet(graph.getEdges(vertexA));
  graph.contract(vertexA, vertexB);
 }

 return graph;
};

var getRandomFromSet = function(arr) {
 var randomIndex = Math.floor(Math.random() * arr.length);
 return arr[randomIndex];
};

var fs = require('fs'),
 listReader = buildAdjacencyList,
 karger = runKarger;

var rawInput = fs.readFileSync('kargerMinCut.txt').toString();
var adjacencyList = listReader(rawInput);
var minCut = karger(adjacencyList);

console.log('The min cut is: ' + minCut);