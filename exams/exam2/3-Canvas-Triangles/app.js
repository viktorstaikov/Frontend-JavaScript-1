'use strict';

var ctx;
var points = [];

window.onload = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 600;

  var ctx = canvas.getContext('2d');

  canvas.addEventListener('click', function(e) {
    // console.log(e);

    var color = $('#colorpicker').val();
    ctx.fillStyle = color;
    ctx.fillRect(e.layerX - 1, e.layerY - 1, 2, 2);

    points.push({
      x: e.layerX,
      y: e.layerY
    })

    if (points.length === 3) {

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.lineTo(points[2].x, points[2].y);
      ctx.fill();

      points = [];
    }
  });

  document.getElementById('clear-btn').addEventListener('click', function(e) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });

  document.getElementById('save-btn').addEventListener('click', function(e) {

    if (typeof(localStorage) !== "undefined") {
      localStorage.setItem("triangles-" + Date.now(), canvas.toDataURL());
      initLoadDdl();
    } else {
      alert("Local Storage not supported");
    }
  });

  initLoadDdl();
};

function initLoadDdl() {

  var images = Object.keys(localStorage).filter(function(key) {
    return key.match('^triangles-');
  })

  var
    template = $('#load-image-ddl-tmpl').html(),
    parsedHtml = _.template(template, {
      items: images
    });

  $('#load-ddl').empty();
  $('#load-ddl').append(parsedHtml);

  $('#load-btn').on('click', function(){
    var selection = $('#load-ddl').val();

    if (typeof(localStorage) !== "undefined") {
      var image = localStorage.getItem(selection);

      var background = new Image();
      background.src = image;

      background.onload = function(){
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(background,0,0);
      }
    } else {
      alert("Local Storage not supported");
    }
  })
}