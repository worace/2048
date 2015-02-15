function Group(squares) {
  this.squares = squares;
}

Group.prototype.swapSquareValues = function(sq1, sq2) {
  var v1 = sq1.value;
  var v2 = sq2.value;
  sq1.value = v2;
  sq2.value = v1;
}

Group.prototype.performSwaps = function(squares) {
  var swapped = false;
  for (var i = 0; i < squares.length; i ++) {
    var sq = squares[i];
    var neighbor = squares[i+1];
    if (neighbor && neighbor.empty() && !sq.empty()) {
      this.swapSquareValues(sq, neighbor);
      swapped = true;
    }
  }
  return swapped;
}

Group.prototype.combineSquares = function(squares) {
  for (var i = squares.length - 1; i >= 0; i --) {
    var sq = squares[i];
    var neighbor = squares[i - 1];
    if (neighbor && neighbor.value === sq.value) {
      sq.value = neighbor.value + sq.value;
      var previous = squares[i - 2];
      if (previous) {
        // pull value from neighbor's neighbor into
        // newly created space where neighbor was
        neighbor.value = previous.value;
        previous.value = 0;
      } else {
        neighbor.value = 0;
      }
      this.performSwaps(squares);
    }
  }
}

Group.prototype.shift = function() {
  var swapped = true;
  while (swapped) {
   swapped = this.performSwaps(this.squares);
  }
  this.combineSquares(this.squares);
}
