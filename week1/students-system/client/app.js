'use strict';

var _students;

$(document).ready(function() {
  //alert('Hooray, everything runs ok. You can remove this annoying alert from the code.');

  $.getJSON('http://localhost:3000/students', function(students, textStatus) {
    if (textStatus != 'success') {
      alert(textStatus);
    }
    _students = students;

    //alert('Students came. Open your console and remove this alert!');

    //start here
    populateTable($('.table'), students);
  });

  $('#group-btn').on('click', function() {
    var $wrap = $('#groupedWrap');
    //alert('What are you looking at? Go implement that logic.');
    var grouped = groupBy(function(student) {
      return student.course;
    }, _students);

    var courses = Object.keys(grouped);

    courses.forEach(function(course) {
      var $innerWrap = $('<div class="col-xs-12">').appendTo($wrap);
      $innerWrap.append('<h2>' + course + '</h2>');
      var $table = $('<table class="table">').appendTo($innerWrap);

      populateTable($table, grouped[course]);
    });
  });

  $('#search-btn').on('click', searchHandler);

  $('#filter-btn').on('click', filterHandler);

  $('#search-btn').on('click', clearHandler);
});

function populateTable($table, students) {
  $table.empty();
  $table.append('<tr>\
                            <th>Id</th>\
                            <th>Name</th>\
                            <th>Course</th>\
                        </tr>');

  var $tbody = $('<tbody>').appendTo($table);
  //$table.children('tbody');
  //$tbody.empty();
  students.forEach(function(student) {
    $tbody.append('<tr>\
                            <td data-field="id">' + student.id + '</td>\
                            <td data-field="name">' + student.name + '</td>\
                            <td data-field="course">' + student.course + '</td>\
                        </tr>');
  });
}

function groupBy(groupingFunction, arr) {
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
}

function search(name) {
  var $tds = $('td[data-field="name"]:contains(' + name + ')');
  return $tds;
}

function searchHandler() {
  var name = $('#search-box').val();

  var $tds = search(name);
  $('.success').removeClass('success');
  $tds.parent().addClass('success');
}

function filterHandler() {
  searchHandler();
  $('.success').addClass('result').removeClass('success');
  $('tr:not(.result)').hide();
}

function clearHandler() {
  $('tr').removeClass('result').show();
}
