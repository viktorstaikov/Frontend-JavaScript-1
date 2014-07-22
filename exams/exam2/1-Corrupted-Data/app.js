'use strict';

var data = require('./data.json');
// var data = require('./data.min.json');

// console.log(data);

var duplicates = [];

duplicates = data.filter(function (item) {

	var filtered = data.filter(function (el) {
		return item.fields.mac === el.fields.mac;
	});

	return filtered.length > 1;
});

console.log(duplicates);