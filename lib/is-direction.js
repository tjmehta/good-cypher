'use strict';

module.exports = isDirection;

/**
 * check if val is a direction
 * @module
 * @param  {String}  str
 * @return {Boolean} isDirection
 */
function isDirection (str) {
  return str === '>' || str === '<';
}