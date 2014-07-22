'use strict';

$(document).ready(function() {

  $.getJSON('http://localhost:8080/names', initNamesList);
});


function initNamesList(names) {
  var
    template = $('#names-tmpl').html(),
    parsedHtml = _.template(template, {
      items: names
    });

  $('#wrap').append(parsedHtml);

  $('.name').on('change keydown paste input', function(e) {
    $(e.currentTarget).siblings('.btn').removeAttr('disabled');
  });

  $('.btn').on('click', function(e) {
    var
      nameId = $(e.currentTarget).data('id'),
      name = $(e.currentTarget).siblings('.name').val();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/name',
      contentType: 'application/json',
      data: JSON.stringify({
        name: name,
        nameId: nameId
      })
    });
  });
}