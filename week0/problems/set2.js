'use strict';

var set2 = {};

//forEach for objects
set2.forEach = function(f, arr) {
  var
    obj = arr,
    keys = Object.keys(arr),
    i = 0,
    n = keys.length;

  for (i; i < n; i++) {
    f(obj[keys[i]], keys[i], obj);
  }
};

set2.map = function(f, arr) {
  var result = [];
  set2.forEach(function(x) {
    result.push(f(x));
  }, arr);

  return result;
};

set2.filter = function(pred, arr) {
  var result = [];
  set2.forEach(function(x) {
    if (pred(x) === true) {
      result.push(x);
    }
  }, arr);
  return result;
};

set2.format = function(str, dict) {
  var result = str;
  set2.forEach(function(value, key) {
    var re = new RegExp('{' + key + '}');
    result = result.replace(re, value, 'g');
  }, dict);
  return result;
};

module.exports = set2;
