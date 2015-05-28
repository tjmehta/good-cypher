'use strict';

var isObject = require('101/is-object');
var TransactionStream = require('cypher-stream/TransactionStream');

function TransactionStream () {
  TransactionStream.apply(this, args);
}

TransactionStream.prototype.match = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'MATCH '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.where = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'WHERE '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.create = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'CREATE '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.merge = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'MERGE '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.delete = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'DELETE '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.set = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'SET '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.forEach = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'FOREACH '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.with = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'WITH '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.unique = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'UNIQUE '+opts.statement,
    parameters: opts.parameters
  });

};
TransactionStream.prototype.indexOn = function (statementOrOpts) {
  var opts = this._getOpts(statementOrOpts);
  this.write({
    statement: 'INDEX ON '+opts.statement,
    parameters: opts.parameters
  });
};

TransactionStream.prototype._getOpts = function (statementOrOpts) {
  return isObject(statementOrOpts) ?
    statementOrOpts : // opts
    {
      statement: statementOrOpts + '',
      parameters: {}
    };
};

module.exports = TransactionStream;