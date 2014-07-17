'use strict';

var
  ctx,
  canvasW = 800,
  canvasH = 400;

$(document).ready(function() {
  var $canvas = $('#canvas');

  ctx = $canvas[0].getContext('2d');
  $canvas[0].width = canvasW;
  $canvas[0].height = canvasH;

  var game = new pongGame(ctx);

  game.start();
})
