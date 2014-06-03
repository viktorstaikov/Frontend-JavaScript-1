'use strict';

var f = {};

f.sum = function sum(a, b) {
  if (typeof a === typeof b && typeof a === 'number') {
    return a + b;
  } else {
    throw 'Invalid arguments. Arguments must be of type number';
  }
};

f.concat = function concat(a, b) {
  if (typeof a === typeof b && typeof a === 'string') {
    return a + b;
  } else {
    throw 'Invalid arguments. Arguments must be of type string';
  }
};

f.contains = function(element, arr) {
  var filtered = arr.filter(function(el) {
    if (typeof el === typeof element) {
      if (typeof el === 'object') {
        return JSON.stringify(el) === JSON.stringify(element);
      }
      return el === element;
    }
    return false;
  });
  return filtered.length > 0;
};

f.containsAll = function(elements, arr) {
  var filtered = arr.filter(function(el) {
    return f.contains(el, elements);
  });
  return filtered.length === elements.length;
};

f.groupBy = function(groupingFunction, arr) {
  var grouped = arr.reduce(function(result, element) {
    var key = groupingFunction(element);
    var value = element;
    if (!result.hasOwnProperty(key)) {
      result[key] = [];
    }
    result[key].push(value);
    return result;
  }, {});

  return grouped;
};

f.countBy = function(countingFunction, arr) {
  var counted = arr.reduce(function(result, element) {
    var key = countingFunction(element);
    if (!result.hasOwnProperty(key)) {
      result[key] = 0;
    }
    result[key]++;
    return result;
  }, {});

  return counted;
};

f.allways = function(value) {
  return function() {
    return value;
  };
};

f.only = function(type, arr) {
  return arr.reduce(function(success, value) {
    return success && (typeof value === type);
  }, true);
};

f.range = function(from, to) {
  var ans = [];

  function genNumbers(from, to) {
    if (from < to) {
      genNumbers(from, to - 1);
    }
    ans.push(to);
  }
  genNumbers(from, to);
  return ans;
};

f.find = function(pred, arr) {
  return arr.filter(pred)[0];
};

f.without = function(exclude, arr) {
  return arr.filter(function(value) {
    return !f.contains(value, exclude);
  });
};

f.pluck = function(property, arr) {
  return arr.map(function(element) {
    return element[property];
  });
};

f.zip = function() {
  var result = [];
  var obj = arguments;
  var keys = Object.keys(obj);

  keys.forEach(function(key) {
    obj[key].forEach(function(el, idx) {
      if (!Array.isArray(result[idx])) {
        result[idx] = [];
      }
      result[idx].push(el);
    });
  });

  return result;
};

f.wordsHistogram = function(str) {
  var result = f.countBy(function(ch) {
    return ch;
  }, str.toLowerCase().split(/\W/g));
  delete result[''];
  return result;
};
module.exports = f;
