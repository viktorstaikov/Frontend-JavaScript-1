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

	$canvas.on('click', game.start);

	ctx.fillStyle = "blue";
	ctx.font = "bold 40px Arial";
	ctx.fillText('Click to start game', ctx.canvas.width / 2 - 200 / 2, ctx.canvas.height / 2 - 40 / 2, 200);
})