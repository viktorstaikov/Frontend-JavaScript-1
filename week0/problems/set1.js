'use strict';
var set1 = {};

set1.nth_fibonacci = (function() {
  var fibonacciNumbers = ['nope', 1, 1];
  var f = function(n) {
    var ans = fibonacciNumbers[n];
    if (ans) {
      return ans;
    } else {
      ans = f(n - 1) + f(n - 2);
      fibonacciNumbers[n] = ans;
      return ans;
    }
  };
  return f;
}());

set1.sum_of_digits = (function() {
  var f = function(n) {
    n = Math.abs(parseInt(n));
    var temp_ans = 0;

    if (n) {
      temp_ans = n % 10 + f(n / 10);
    }
    return temp_ans;
  };
  return f;
}());

set1.prime_factorization = (function() {
  function _f(n, del, power, ans) {
    if (n % del === 0) {
      return _f(n / del, del, power + 1, ans);
    } else {
      if (power) {
        ans.push([del, power]);
      }
      if (n == 1) {
        return ans;
      } else {
        return _f(n, del + 1, 0, ans);
      }
    }
  }

  var f = function(n) {
    var ans = [];
    if (n <= 1) {
      ans.push([n, 1]);
    } else {
      ans = _f(n, 2, 0, []);
    }
    return ans;
  };
  return f;
}());

module.exports = set1;
