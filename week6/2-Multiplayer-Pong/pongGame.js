'use strict';

var point = function (x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.normalize = function normalize() {
    var length = Math.sqrt(this.x * this.x + this.y * this.y);

    this.x = this.x / length;
    this.y = this.y / length;
  };
};

var player = function (ctx, playerSide, playerColor, opt) {
  if (!opt) {
    opt = {};
  }

  var
    width = opt.width || 10,
    height = opt.height || 80,
    offset = opt.offset || 20,
    speed = opt.speed || 10,
    side = playerSide,
    color = playerColor || 'blue';

  var position;
  if (side === 'left') {
    position = new point(offset + width / 2, ctx.canvas.height / 2);
  } else {
    position = new point(ctx.canvas.width - offset - width / 2, ctx.canvas.height / 2);
  }

  function move(dir, dist) {
    var travelled = dist || speed;
    if (dir === 'up') {
      position.y -= travelled;
    }
    if (dir === 'down') {
      position.y += travelled;
    }
  }

  function initControls() {
    var _lastPos = position;
    $(document).mousemove(function (e) {

      var dir = (e.offsetY - _lastPos.y < 0) ? 'up' : 'down';

      move(dir, Math.abs(e.offsetY - _lastPos.y));
      _lastPos.y = e.offsetY;
    });
    // $(document).keydown(function (event) {

    //   if (event.keyCode === 38) {
    //     move('up');
    //   }

    //   if (event.keyCode === 40) {
    //     move('down');
    //   }
    // });
  }

  function print() {
    ctx.fillStyle = color;
    ctx.fillRect(position.x - width / 2, position.y - height / 2, width, height);
  }

  return {
    init: initControls,

    print: print,
    position: position,
    width: width,
    height: height
  };
};

var ball = function (ctx, opt) {
  if (!opt) {
    opt = {};
  }

  var
    radius = opt.radius || 5,
    speed = opt.speed || 5,
    color = opt.color || 'yellow',
    position = new point(ctx.canvas.width / 2, ctx.canvas.height / 2),
    direction = new point(Math.random() * 0.6 + 0.3, Math.random()),
    moveInterval;

  direction.normalize();

  function move() {
    position.x += direction.x * speed;
    position.y += direction.y * speed;
  }

  function print() {
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  function bounceSmart(normal) {
    // reference: http://stackoverflow.com/questions/3306838/algorithm-for-reflecting-a-point-across-a-line
    var
      x = direction.x,
      y = direction.y,
      a = normal.x,
      c = normal.y;
    var d = (x + (y - c) * a) / (1 + a * a);

    direction.x = 2 * d - x;
    direction.y = 2 * d * a - y + 2 * c;
  }

  function bounce(normal) {
    if (Math.abs(normal.x) === 1 && normal.y === 0) {
      direction.x = -direction.x;
    } else if (normal.x === 0 && Math.abs(normal.y) === 1) {
      direction.y = -direction.y;
    } else {
      bounceSmart(normal);
    }
  }

  return {
    startMoving: function () {
      moveInterval = setInterval(function moving() {
        move();
        if (position.y >= ctx.canvas.height - radius) {
          bounce({
            x: 0,
            y: -1
          });
        }
        if (position.y < radius) {
          bounce({
            x: 0,
            y: 1
          });
        }
      }, 10);
    },
    stopMoving: function () {
      clearInterval(moveInterval);
    },
    bounce: bounce,

    print: print,
    position: position,
    radius: radius
  };
};

var pongGame = function (ctx) {
  var player1 = new player(ctx, 'left', 'red');
  var player2 = new player(ctx, 'right', 'blue');
  var b = new ball(ctx);
  var interval;

  function end(winner) {
    clearInterval(interval);
    var msg = 'player ' + winner + ' wins!';

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var
      maxWidth = 100,
      tHeight = 40;

    ctx.fillStyle = "blue";
    ctx.font = "bold " + tHeight + "px Arial";
    ctx.fillText(msg, ctx.canvas.width / 2 - maxWidth / 2, ctx.canvas.height / 2 - tHeight / 2, maxWidth);
  }

  function checkForCollision() {
    var n;

    if (b.position.x < player1.position.x + player1.width / 2) {
      if (Math.abs(b.position.y - player1.position.y) <= player1.height) {
        // n = new point(ctx.canvas.width / 2 - player1.position.x, ctx.canvas.height / 2 - player1.position.y);
        // n.normalize();
        n = new point(1,0);
        b.bounce(n);
      } else {
        end(2);
      }
    }

    if (b.position.x > player2.position.x - player2.width / 2) {
      if (Math.abs(b.position.y - player2.position.y) <= player2.height) {
        // n = new point(ctx.canvas.width / 2 - player2.position.x, ctx.canvas.height / 2 - player2.position.y);
        // n.normalize();
        n = new point(-1,0);
        b.bounce(n);
      } else {
        end(1);
      }
    }
  }

  function start() {
    player1.init();
    player2.init();
    b.startMoving();

    interval = setInterval(function () {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      player1.print();
      player2.print();
      b.print();

      checkForCollision();

    }, 10);
  }

  return {
    start: start
  };
};