'use strict';

var set1 = require('./set1');
console.log(set1);
var nth_fibonacci = require('./set1').nth_fibonacci;
console.log(nth_fibonacci);
var sum_of_digits = set1.sum_of_digits;

exports.nth_fibonacci_1 = function(test) {
  test.equal(1, nth_fibonacci(1));
  test.done();
};

exports.nth_fibonacci_2 = function(test) {
  test.equal(1, nth_fibonacci(2));
  test.done();
};

exports.nth_fibonacci_3 = function(test) {
  test.equal(2, nth_fibonacci(3));
  test.done();
};

exports.nth_fibonacci_10 = function(test) {
  test.equal(55, nth_fibonacci(10));
  test.done();
};

exports.sum_of_digits_1325132435356 = function(test) {
  test.equal(43, sum_of_digits(1325132435356));
  test.done();
};
exports.sum_of_digits_123 = function(test) {
  test.equal(6, sum_of_digits(123));
  test.done();
};
exports.sum_of_digits_6 = function(test) {
  test.equal(6, sum_of_digits(6));
  test.done();
};
exports.sum_of_digits_minus10 = function(test) {
  test.equal(1, sum_of_digits(-10));
  test.done();
};

exports.prime_factorization_10 = function(test) {
  test.equal([
    [2, 1],
    [5, 1]
  ].toString(), set1.prime_factorization(10).toString());
  test.done();
};

exports.prime_factorization_14 = function(test) {
  test.equal([
    [2, 1],
    [7, 1]
  ].toString(), set1.prime_factorization(14).toString());
  test.done();
};

exports.prime_factorization_356 = function(test) {
  test.equal([
    [2, 2],
    [89, 1]
  ].toString(), set1.prime_factorization(356).toString());
  test.done();
};

exports.prime_factorization_1000 = function(test) {
  test.equal([
    [2, 3],
    [5, 3]
  ].toString(), set1.prime_factorization(1000).toString());
  test.done();
};
