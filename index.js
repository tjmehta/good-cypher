'use strict'

var CypherStream      = require('cypher-stream/CypherStream');
var TransactionStream = require('./transaction-stream.js');
var GoodNode = require('./node.js');

module.exports = function Connection(url) {
  var factory = function CypherStreamFactory(query, params) {
    var statements = query;
    if (params) {
      statements = [ { statement: query, parameters: params } ];
    }
    return new CypherStream(url, statements, { commit: true });
  };
  factory.transaction = function (opts) {
    return new TransactionStream(url, opts);
  };
  factory.node = function (opts) {
    return new GoodNode(url, opts);
  };

  return factory;
};