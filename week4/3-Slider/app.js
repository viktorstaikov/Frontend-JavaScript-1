'use strict';

google.load('search', '1');

var imageSearch;
var page, index;

$(document).ready(function() {

  $('#prev-image').prop('disabled', true);
  $('#next-image').prop('disabled', true);
  $('#save-img').prop('disabled', true);

  imageSearch = new google.search.ImageSearch();

  imageSearch.setSearchCompleteCallback(document, searchComplete, null);
  imageSearch.setResultSetSize(4);

  page = 0;
  index = 0;

  $('#search-btn').on('click', loadImages);

  $('#prev-image').on('click', showPrevImage);
  $('#next-image').on('click', showNextImage);
  $('#save-img').on('click', saveImage);
});

function loadImages() {
  var query = $('input.input-lg').val();
  console.log(query);

  imageSearch.execute(query);
}

function searchComplete() {
  if (imageSearch.results && imageSearch.results.length > 0) {
    console.log('we have results :)');

    $('#next-image').prop('disabled', false);
    $('#save-img').prop('disabled', false);

    showImage(index);
  } else {
    console.log('no results :(');
  }
}

function showPrevImage() {
  index--;
  if (index % 4 === 3) {
    page--;
    imageSearch.gotoPage(page);
  } else {
    showImage(index);
  }
}

function showNextImage() {
  $('#prev-image').prop('disabled', false);

  index++;
  if (index % 4 === 0) {
    page++;
    imageSearch.gotoPage(page);
  } else {
    showImage(index);
  }
}

function showImage(imageIndex) {
  if (imageIndex === 0) {
    $('#prev-image').prop('disabled', true);
  }

  console.log('show image ' + imageIndex);

  $('#current-image').attr('src', imageSearch.results[imageIndex % 4].url);
  $('#save-img').attr('href', imageSearch.results[imageIndex % 4].url);
}

function saveImage() {
  window.location = imageSearch.results[index % 4].url;
}
