'use strict';
var prompt = require('sync-prompt').prompt;

var board = [ ['*', '*', '*'],
              ['*', '*', '*'],
              ['*', '*', '*'] ];

function printBoard(board) {
  var
    i = 0,
    n = board.length;
  // keep in mind that this is poorly-written JavaScript code
  // we will learn not to use for loops in JavaScript
  for(i; i < n; i++) {
    console.log(board[i].join(''));
  }
}

function parseInput(input) {

  var splits = input.split(' ');
  var x = parseInt(splits[0], 10);
  var y = parseInt(splits[1], 10);

  var valid = splits.length === 2 &&
    (0 <= x && x <= 2) &&
    (0 <= y && y <= 2) &&
    board[x][y] === '*';

  if(valid) {
    return {
      x: x,
      y: y
    };
  }
}

function checkOutcome(pos, xTurn) {
  if(xTurn){
    board[pos.x][pos.y] = 'x';
  }
  else {
    board[pos.x][pos.y] = 'y';
  }

  var weHaveAWinner =
    (board[0][0] != '*' && board[0][0] == board[0][1] && board[0][1] == board [0][2]) ||
    (board[1][0] != '*' && board[1][0] == board[1][1] && board[1][1] == board [1][2]) ||
    (board[2][0] != '*' && board[2][0] == board[2][1] && board[2][1] == board [2][2]) ||
    (board[0][0] != '*' && board[0][0] == board[1][0] && board[1][0] == board [2][0]) ||
    (board[0][1] != '*' && board[0][1] == board[1][1] && board[1][1] == board [2][1]) ||
    (board[0][2] != '*' && board[0][2] == board[1][2] && board[1][2] == board [2][2]) ||
    (board[0][0] != '*' && board[0][0] == board[1][1] && board[1][1] == board [2][2]) ||
    (board[0][2] != '*' && board[0][2] == board[1][1] && board[1][1] == board [2][0]);

  if(board[0].indexOf('*') === -1 && board[1].indexOf('*') === -1 && board[2].indexOf('*') === -1) {
    return 2;
  }
  else if(weHaveAWinner) {
    return 1;
  }
  else {
    return 0;
  }
}

// entry point for the game
function gameLoop() {
  var
    xTurn = true,
    input = null,
    position = null;
  while(true) {

    console.log('This is the current state of the board:');
    printBoard(board);

    if(xTurn) {
      console.log('Place for x');
    } else {
      console.log('Place for y');
    }

    while(true) {
      // this is blocking prompt
      input = prompt('x y>');

      position = parseInput(input);
      if(position) {
        var outcome = checkOutcome(position, xTurn);
        if(outcome) {
          if(outcome == 1){
            console.log('You win :)');
          }
          else {
            console.log('No winner :(');
          }
          printBoard(board);
          return;
        }

        //console.log(position);
        xTurn = !xTurn;
        break;
      }
      else {
        console.log('Invalid input - x and y should be between 0 and 2 and the position must be empty (*)');
      }
    }
  }
}

gameLoop();
