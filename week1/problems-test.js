'use strict';

var f = require('./problems');

exports.sum = function(test) {
  test.equal(5, f.sum(2, 3));
  test.done();
};

exports.sum_throws = function(test) {
  test.throws(function() {
    f.sum(2, '3');
  });
  test.done();
};

exports.concat = function(test) {
  test.equal('23', f.concat('2', '3'));
  test.done();
};

exports.concat_throws = function(test) {
  test.throws(function() {
    f.concat(2, '3');
  });
  test.done();
};

exports.contains = function(test) {
  test.equal(true, f.contains(3, [1, 3, 2]));
  test.done();
};

exports.contains_false = function(test) {
  test.equal(false, f.contains(4, [1, 3, 2]));
  test.done();
};

exports.containsAll = function(test) {
  test.equal(true, f.containsAll([1, 2], [4, 3, 2, 1]));
  test.done();
};

exports.containsAll_false = function(test) {
  test.equal(false, f.containsAll([1, 2, 5], [4, 3, 2, 1]));
  test.done();
};

exports.groupBy = function(test) {
  var students = [{
    'name': 'Daniel Taskoff',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Elena Jeleva',
    'course': 'Programming 101'
  }, {
    'name': 'Luboslava Dimitrova',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Anton Antonov',
    'course': 'Core Java'
  }, {
    'name': 'Nikola Dichev',
    'course': 'Core Java'
  }];

  // var grouped = {
  //   'Frontend JavaScript': [{
  //     name: 'Daniel Taskoff',
  //     course: 'Frontend JavaScript'
  //   }, {
  //     name: 'Luboslava Dimitrova',
  //     course: 'Frontend JavaScript'
  //   }],
  //   'Programming 101': [{
  //     name: 'Elena Jeleva',
  //     course: 'Programming 101'
  //   }],
  //   'Core Java': [{
  //     name: 'Anton Antonov',
  //     course: 'Core Java'
  //   }, {
  //     name: 'Nikola Dichev',
  //     course: 'Core Java'
  //   }]
  // };
  var grouped = f.groupBy(function(student) {
    return student.course;
  }, students);

  var courses = Object.keys(grouped);
  var testIsPassing = courses.reduce(function(success, course) {
    return success && grouped[course].reduce(function(minorSuccess, student) {
      return minorSuccess && f.contains(student, students);
    }, true);
  }, true);

  test.equal(true, testIsPassing);
  test.done();
};

exports.countBy = function(test) {
  var students = [{
    'name': 'Daniel Taskoff',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Elena Jeleva',
    'course': 'Programming 101'
  }, {
    'name': 'Luboslava Dimitrova',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Anton Antonov',
    'course': 'Core Java'
  }, {
    'name': 'Nikola Dichev',
    'course': 'Core Java'
  }];

  var counted_orig = {
    'Frontend JavaScript': 2,
    'Programming 101': 1,
    'Core Java': 2
  };
  var counted = f.countBy(function(student) {
    return student.course;
  }, students);

  var testIsPassing = counted_orig + '' === counted + '';

  test.equal(true, testIsPassing);
  test.done();
};

exports.allways = function(test) {
  var func = f.allways(5);
  test.equal(5, func());
  test.done();
};

exports.only_string = function(test) {
  test.equal(false, f.only('string', [1, '2']));
  test.done();
};

exports.only_number = function(test) {
  test.equal(true, f.only('number', [1, 2]));
  test.done();
};

exports.range = function(test) {
  test.deepEqual([1, 2, 3, 4], f.range(1, 4));
  test.done();
};

exports.find = function(test) {
  test.equal(2, f.find(function(value) {
    return value % 2 === 0;
  }, [1, 2, 3]));
  test.done();
};

exports.find_false = function(test) {
  test.equal(undefined, f.find(function(value) {
    return value % 2 === 0;
  }, [1, 3, 5]));
  test.done();
};

exports.without = function(test) {
  test.deepEqual([1, 2], f.without([3, 4], [1, 2, 3, 4]));
  test.done();
};

exports.pluck = function(test) {
  var students = [{
    'name': 'Daniel Taskoff',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Elena Jeleva',
    'course': 'Programming 101'
  }, {
    'name': 'Luboslava Dimitrova',
    'course': 'Frontend JavaScript'
  }, {
    'name': 'Anton Antonov',
    'course': 'Core Java'
  }, {
    'name': 'Nikola Dichev',
    'course': 'Core Java'
  }];

  var plucked = f.pluck('name', students);
  test.deepEqual(['Daniel Taskoff', 'Elena Jeleva', 'Luboslava Dimitrova', 'Anton Antonov', 'Nikola Dichev'], plucked);
  test.done();
};

exports.zip = function(test) {
  test.deepEqual([
    [1, 4, 7],
    [2, 4, 8],
    [3, 6, 9]
  ], f.zip([1, 2, 3], [4, 4, 6], [7, 8, 9]));
  test.done();
};

exports.wordsHistogram = function(test) {
  test.deepEqual({
    "a": 3,
    "function": 3,
    "is": 1,
    "with": 1,
    "very": 1,
    "functional": 1
  }, f.wordsHistogram("A function is a function with a very functional function!"));
  test.done();
};
