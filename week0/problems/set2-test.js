'use strict';

var set2 = require('./set2');
var set2_tests = {};

set2_tests.forEach_with_array = function(test) {
  var arr = [1,2,3];
  var ans = [];

  set2.forEach(function(x){
    ans.push(x*x);
  }, arr);

  test.equal([1,4,9].toString(), ans.toString());
  test.done();
};

set2_tests.forEach_with_object = function(test) {
  var arr = {
    x:1,
    y:2,
    z:3
  };
  var ans = [];

  set2.forEach(function(x){
    ans.push(x*x);
  }, arr);

  test.equal([1,4,9].toString(), ans.toString());
  test.done();
};

set2_tests.map = function(test) {
  var arr = [1,2,3];
  var ans = set2.map(function(x){
    return x*x;
  }, arr);

  test.equal([1,4,9].toString(), ans.toString());
  test.done();
};

set2_tests.filter = function(test) {
  var arr = [1,2,3];
  var ans = set2.filter(function(x){
    return x % 2 === 0;
  }, arr);

  test.equal([2].toString(), ans.toString());
  test.done();
};

set2_tests.format = function(test) {
  var original = '{lang} is a very weird {thing}!';
  var formated = set2.format(original, {
    'lang' : 'JavaScript',
    'thing' : 'language'
  });
  test.equal('JavaScript is a very weird language!', formated);
  test.done();
};

module.exports = set2_tests;
