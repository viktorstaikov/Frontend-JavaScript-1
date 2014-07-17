'use string';

var point = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;

  this.normalize = function normalize() {
    var length = Math.sqrt(this.x * this.x + this.y * this.y);

    this.x = this.x / length;
    this.y = this.y / length;
  }
};

var player = function(ctx, side, color, opt) {
  if (!opt) opt = {};

  var
    width = opt.width || 20,
    height = opt.height || 80,
    offset = opt.offset || 20,
    speed = opt.speed || 20,
    side = side,
    color = color || 'blue';

  var position;
  if (side === 'left') {
    position = new point(offset + width / 2, ctx.canvas.height / 2);
  } else {
    position = new point(ctx.canvas.width - offset - width / 2, ctx.canvas.height / 2);
  }

  function initControls() {
    $(document).keydown(function(event) {
      // if (event.keyCode === 39 && direction != "left") {
      //   direction = "right";
      // }

      // if (event.keyCode === 37 && direction != "right") {
      //   direction = "left";
      // }

      if (event.keyCode === 38) {
        //direction = "up";
        move('up');
      }

      if (event.keyCode === 40) {
        move('down');
      }
    });
  }

  function move(dir) {
    if (dir === 'up') {
      position.y -= speed;
    }
    if (dir === 'down') {
      position.y += speed;
    }
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
  }
};

var ball = function(ctx, opt) {
  if (!opt) opt = {};

  var
    radius = opt.radius || 5,
    speed = opt.speed || 5,
    color = opt.color || 'yellow',
    position = new point(ctx.canvas.width / 2, ctx.canvas.height / 2),
    direction = new point(Math.random(), Math.random()),
    moveInterval;

  direction.normalize();

  function move() {
    position.x += direction.x * speed;
    position.y += direction.y * speed;
  }

  function print() {
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();
  }

  function bounce(normal) {
    if (normal.x === 1 && normal.y === 0) {
      direction.x = -direction.x;
    }
    if (normal.x === 0 && normal.y === 1) {
      direction.y = -direction.y;
    }
  }

  return {
    startMoving: function() {
      moveInterval = setInterval(function moving() {
        move();
        if (position.x <= radius || position.x >= ctx.canvas.width - radius) {
          bounce({
            x: 1,
            y: 0
          });
        }
        if (position.y <= radius || position.y >= ctx.canvas.height - radius) {
          bounce({
            x: 0,
            y: 1
          });
        }
      }, 10);
    },
    stopMoving: function() {
      clearInterval(moveInterval);
    },
    bounce: bounce,

    print: print,
    position: position,
    radius: radius
  };
};

var pongGame = function(ctx) {
  var player1 = new player(ctx, 'left', 'red');
  var player2 = new player(ctx, 'right', 'blue');
  var b = new ball(ctx);
  var interval;

  function start() {
    player1.init();
    player2.init();
    b.startMoving();

    interval = setInterval(function() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      player1.print();
      player2.print();
      b.print();

      checkForCollision();

    }, 10);

    function end(winner) {
      clearInterval(interval);
      msg = 'player ' + winner + ' wins!';

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // alert(msg);

      var
        maxWidth = 100,
        tHeight = 40;

      ctx.fillStyle = "blue";
      ctx.font = "bold " + tHeight + "px Arial";
      ctx.fillText(msg, ctx.canvas.width / 2 - maxWidth / 2, ctx.canvas.height / 2 - tHeight / 2, maxWidth);
    }

    function checkForCollision() {

      if (b.position.x < player1.position.x + player1.width / 2) {
        if (Math.abs(b.position.y - player1.position.y) <= player1.height) {
          b.bounce({
            x: 1,
            y: 0
          });
        } else {
          end(2);
        }
      }

      if (b.position.x > player2.position.x - player2.width / 2) {
        if (Math.abs(b.position.y - player2.position.y) <= player2.height) {
          b.bounce({
            x: 1,
            y: 0
          });
        } else {
          end(1);
        }
      }
    }
  }
  return {
    start: start
  }
};
