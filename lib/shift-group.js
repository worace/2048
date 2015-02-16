function Group(squares) {
  this.squares = squares;
}

Group.prototype.swapSquares = function(sq1, sq2) {
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
      sq.roundStart.roundEnd = neighbor;
      neighbor.roundStart = sq.roundStart;
      this.swapSquares(sq, neighbor);
      swapped = true;
    }
  }
  return swapped;
}

// Squares combine from "end" of group to "beginning"
// e.g. 0 2 2 2 -> 0 0 2 4
// 2 2 2 2
// 2 2 0 4
// 2 0 2 4
// 0 2 2 4
// 0 0 4 4
Group.prototype.combineSquares = function(squares) {
  for (var i = squares.length - 1; i >= 0; i --) {
    var sq = squares[i];
    var neighbor = squares[i - 1];
    if (neighbor && !(sq.empty() || neighbor.empty()) && neighbor.value === sq.value) {
      sq.roundStart = neighbor.roundStart;
      neighbor.roundStart.roundEnd = sq;

      sq.value = neighbor.value + sq.value;
      var previous = squares[i - 2];
      if (previous) {
        // pull value from neighbor's neighbor into
        // newly created space where neighbor was
        neighbor.roundStart = previous.roundStart;
        previous.roundStart.roundEnd = neighbor;
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
