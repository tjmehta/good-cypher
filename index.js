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
  factory.transaction = function (options) {
    return new GoodTransactionStream(url, options);
  };
  factory.node = function () {
    return new GoodNode(url, options);
  };

  return factory;
};