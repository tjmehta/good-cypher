'use strict';

var isObject = require('101/is-object');
var isString = require('101/is-string');
var isDirection = require('./lib/is-direction.js');
var validate = require('./lib/validate.js');
var json = JSON.stringify.bind(JSON);

/**
 * Creates a graph relationship
 * @class
 * @param {String} [nameLabel] name and/or label, ex: 'name', ':label', 'name:label'
 * @param {Object} [props]     properties held by relationship
 * @param {String} [direction] direction of the relationship, ex: '>', '<', or none
 */
function Relationship (nameLabel, props, direction) {
  if (isDirection(nameLabel)) {
    // (direction)
    direction = nameLabel;
    props = null;
    nameLabel = null;
  }
  if (isObject(nameLabel)) {
    // (props, direction)
    direction = props;
    props = nameLabel;
    nameLabel = null;
  }
  if (isString(props)) {
    // (nameLabel, direction)
    direction = props;
    props = null;
  }
  // validate
  validate.nameLabel(nameLabel);
  validate.props(props);
  validate.direction(direction);
  // set
  this.nameLabel = nameLabel;
  this.props = props;
  this.direction = direction;
  this._graph = [this];
}

Relationship.prototype.node = function (nameLabel, props) {
  var Node = require('./node.js'); // circular dep
  var n = (nameLabel instanceof Node) ?
    nameLabel : // node
    new Node(nameLabel, props);
  n._graph = this._graph;
  this._graph.push(n);
  return n;
};

Relationship.prototype.toString = function () {
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
  var direction = this.direction;
  var hasBrackets = nameLabel || props;
  var hasBoth     = nameLabel && props;
  return [
    direction === '<' ? direction : '',
    '-',
    hasBrackets ? '['         : '',
    nameLabel   ? nameLabel   : '',
    hasBoth     ? ' '         : '',
    props       ? json(props) : '',
    hasBrackets ? ']'         : '',
    '-',
    direction === '>' ? direction : ''
  ].join('');
};

module.exports = Relationship;