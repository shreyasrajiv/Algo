/* global require */

var DFSFinishTime = function() {
 var finishHash = {};
 var exploredVertexes = {};
 var finishTime = 1;
 var DFSFinishTime = function(digraph) {

  var largestKey = digraph.largestVertex();
  for (var i = largestKey; i > 0; i--) {

   if (!exploredVertexes[i] === true) {
    dfs(digraph, i);
   }
  }

  return finishHash;
 };

 var dfs = function(digraph, vertex) {
  exploredVertexes[vertex] = true;
  var nodesToVisit = digraph.edges(vertex);

  for (var i = 0; i < nodesToVisit.length; i++) {
   if (!exploredVertexes[nodesToVisit[i]] === true) {
    dfs(digraph, nodesToVisit[i]);
   }
  }
  finishHash[finishTime] = vertex;
  finishTime += 1;
 };

 return {
  run: DFSFinishTime
 };
};

var findLargestKey = function(graph) {
 return Object.keys(graph).length;
};

var DFSWithMagicOrder = function(inputGraph, magicOrder) {
 var digraph = inputGraph;
 var order = magicOrder;
 var count = 0;
 var ids = [];
 var exploredVertexes = {};

 var run = function() {
  var largestKey = findLargestKey(order);
  for (var i = largestKey; i > 0; i--) {
   if (!(exploredVertexes[order[i]] === true)) {
    dfs(digraph, order[i]);
    count += 1;
   }
  }

  return ids.sort(function(a, b) {
   return b - a;
  }).slice(0, 5);
 };

 var dfs = function(digraph, vertex) {
  exploredVertexes[vertex] = true;
  if (!ids[count]) ids[count] = 0;
  ids[count] = ids[count] + 1;
  var edges = digraph.edges(vertex);
  for (var i = 0; i < edges.length; i++) {
   if (!(exploredVertexes[edges[i]] === true)) {
    dfs(digraph, edges[i]);
   }
  }
 };

 return {
  run: run
 };
};

var fs = require('fs'),
 _ = require('lodash'),
 Digraph = function(digraph) {
  var graph = digraph || {};
  var largestVertex = 0;

  var getGraph = function() {
   return graph;
  };

  var addVertex = function(vertex) {
   graph[vertex] = [];
  };

  var addEdge = function(vertex, edge) {
   if (!graph[vertex]) {
    graph[vertex] = [];
    if (largestVertex < vertex) largestVertex = vertex;
   }
   graph[vertex].push(edge);
  };

  var edges = function(vertex) {
   return graph[vertex] || [];
  };

  var reverse = function() {
   var reversed = new Digraph();

   for (var vertex in graph) {
    _.each(graph[vertex], function(edge) {
     reversed.addEdge(edge, parseInt(vertex));
    });
   }

   return reversed;
  };

  var getLargestVertex = function() {
   return largestVertex;
  };

  return {
   getGraph: getGraph,
   addVertex: addVertex,
   addEdge: addEdge,
   edges: edges,
   reverse: reverse,
   largestVertex: getLargestVertex
  };
 };

var graphFromString = function(str) {
 var digraph = new Digraph();
 if (!str) return digraph;

 var splitLines = str.split('\n');

 _.each(splitLines, function(line) {
  var rawLine = line.trim();
  if (rawLine) {
   var vertexEdge = rawLine.split(' ');
   var vertex = parseInt(vertexEdge[0]);
   var edge = parseInt(vertexEdge[1]);
   digraph.addEdge(vertex, edge);
  }
 });

 return digraph;
};

var graphFromFile = function(filePath) {
 return graphFromString(fs.readFileSync(filePath).toString());
};

var kosaraju = function(digraph) {

 var G = digraph;
 var GRev = digraph.reverse();
 var magicOrder = new DFSFinishTime().run(GRev);
 var sccsParams = new DFSWithMagicOrder(G, magicOrder).run();

 return sccsParams;
};

var digraphReader = graphFromFile,
 kosaraju = kosaraju;

var digraph = digraphReader('SCC.txt');
var sccs = kosaraju(digraph);

console.log(sccs);