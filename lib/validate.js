'use strict';

var exists = require('101/exists');
var isString = require('101/is-string');
var isObject = require('101/is-object');
var isDirection = require('./is-direction.js');

/**
 * validator utils for different arguments
 * @module
 */

var validate = {};

/**
 * util to validate a name label
 * @param  {String}  nameLabel name, label or both
 */
validate.nameLabel = function (nameLabel) {
  if (!exists(nameLabel)) { return; }
  if (!isString(nameLabel)) {
    throw new TypeError('Invalid name and/or label: ' + nameLabel);
  }
};

/**
 * util to validate node's or relationship' props
 * @param  {String}  nameLabel name, label or both
 */
validate.props = function (props) {
  if (!exists(props)) { return; }
  if (!isObject(props)) {
    throw new TypeError('Invalid props: ' + props);
  }
};

/**
 * util to validate a relationship direction
 * @param  {String}  nameLabel name, label or both
 */
validate.direction = function (direction) {
  if (!exists(direction)) { return; }
  if (!isDirection(direction)) {
    throw new TypeError('Invalid direction: ' + direction);
  }
};


module.exports = validate;