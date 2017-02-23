/* require global */

var dijkstra = function(start, finish, graph) {
 var X = {};
 X[start] = {
  length: 0,
  path: []
 };

 while (!containsVertex(X, finish)) {
  var chosenVertex = getOutgoingEdge(X, graph);
  X[chosenVertex.vertex] = {
   length: chosenVertex.length,
   path: chosenVertex.path
  };
 }

 return X;
};

var containsVertex = function(vertexSet, vertex) {
 return !!vertexSet[vertex];
};

var getOutgoingEdge = function(exploredVertexes, graph) {

 var bestLength = null;
 var outgoingVertex = null;
 var path = null;

 for (var vertex in exploredVertexes) {
  for (var edge in graph[vertex]) {
   if (containsVertex(exploredVertexes, edge)) continue;
   var currentLength = exploredVertexes[vertex].length || 0;
   if (bestLength === null || bestLength > (currentLength + graph[vertex][edge])) {
    bestLength = currentLength + parseInt(graph[vertex][edge]);
    outgoingVertex = edge;
    var pathBefore = exploredVertexes[vertex].path;
    path = pathBefore.concat(parseInt(edge));
   }
  }
 }

 return {
  vertex: outgoingVertex,
  length: bestLength,
  path: path
 };
};

var fs = require('fs');

var readFromFile = function(path) {
 var vertexRows = fs.readFileSync(path).toString().trim().split(/\r?\n/);
 var weightedAdjList = {};

 for (var i = 0; i < vertexRows.length; i++) {
  var tokens = vertexRows[i].split('\t');
  var vertexKey = tokens[0];
  var vertexEdges = {};
  for (var j = 1; j < tokens.length; j++) {
   var edge = tokens[j].split(',');
   if (edge[0]) {
    vertexEdges[edge[0]] = parseInt(edge[1]);
   }
  }

  weightedAdjList[vertexKey] = vertexEdges;
 }
 return weightedAdjList;
};

var graph = readFromFile('dijkstraData.txt');

console.log('Results: ');
console.log('7\t:' + dijkstra(1, 7, graph)["7"].length);
console.log('37\t:' + dijkstra(1, 37, graph)["37"].length);
console.log('59\t:' + dijkstra(1, 59, graph)["59"].length);
console.log('82\t:' + dijkstra(1, 82, graph)["82"].length);
console.log('99\t:' + dijkstra(1, 99, graph)["99"].length);
console.log('115\t:' + dijkstra(1, 115, graph)["115"].length);
console.log('133\t:' + dijkstra(1, 133, graph)["133"].length);
console.log('165\t:' + dijkstra(1, 165, graph)["165"].length);
console.log('188\t:' + dijkstra(1, 188, graph)["188"].length);
console.log('197\t:' + dijkstra(1, 197, graph)["197"].length);