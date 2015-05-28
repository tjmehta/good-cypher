'use strict';

var isObject = require('101/is-object');
var Relationship = require('./relationship.js');
var validate = require('./lib/validate.js');
var json = JSON.stringify.bind(JSON);

function Node (nameLabel, props) {
  if (isObject(nameLabel)) {
    // (props)
    props = nameLabel;
    nameLabel = null;
  }
  // validate
  validate.nameLabel(nameLabel);
  validate.props(props);
  // set
  this.nameLabel = nameLabel;
  this.props = props;
  this._graph = [this];
}

Node.prototype.in = function (label, props) {
  var r = new Relationship(label, props, '<');
  r._graph = this._graph;
  this._graph.push(r);
  return r;
};

Node.prototype.out = function (label, props) {
  var r = new Relationship(label, props, '>');
  r._graph = this._graph;
  this._graph.push(r);
  return r;
};

Node.prototype.edge = function (label, props) {
  var r = new Relationship(label, props);
  r._graph = this._graph;
  this._graph.push(r);
  return r;
};

Node.prototype.edgeLoop = function (label, props) {
  return this
    .edge(label, props)
    .node(this.nameLabel, this.props);
};

Node.prototype.arcLoop = function (label, props) {
  return this
    .out(label, props)
    .node(this.nameLabel, this.props);
};

Node.prototype.toString = function () {
  var graph = this._graph;
  if (graph) {
    return graph.reduce(function (str, part) {
      delete part._graph;
      return str + part.toString();
    }, '');
  }
  var str = '-';
  var nameLabel = this.nameLabel;
  var props     = this.props;
  var hasBoth   = nameLabel && props;
  return [
    '(',
    nameLabel ? nameLabel   : '',
    hasBoth   ? ' '         : '',
    props     ? json(props) : '',
    ')',
  ].join('');
};

module.exports = Node;