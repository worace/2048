keyCode = function(dir) {
  return {37: "left", 38: "up", 39: "right", 40: "down", left: 37, up: 38, right: 39, down:40}[dir];
}

var Utils = {
  rand: function(length) {
    return Math.floor((Math.random() * (length - 1)));
  },
  contains: function(array, element) {
    return array.indexOf(element) > -1;
  }
}

function Square(val) {
  this.value = val;
}

Square.prototype.htmlContent = function() {
  if (this.empty()) {
    return ""
  } else {
    return this.value.toString();
  }
}

Square.prototype.empty = function() {
  return this.value === 0;
}

Square.prototype.render = function($element) {
  $element.append(this.domElement());
}

Square.prototype.domElement = function() {
  var square = document.createElement("div");
  var p = document.createElement("p");
  $(p).html(this.htmlContent());
  var $sq = $(square);
  $sq.addClass("square");
  $sq.append(p);
  return $sq;
}

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

//Init a grid of specified width and height
//optVals allows provision of explicit numeric
//values for testing
function Grid(width, height, optVals) {
  this.width = width;
  this.height = height;
  this.startingVals = [2,4];
  this.squares = [];
  this.populateGrid()

  if (optVals) {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].value = optVals[i];
    }
  }
}

Grid.prototype.populateGrid = function() {
  var preFilledIndices = this.preFilledIndices(this.width * this.height);
  for(var i = 0; i < this.width * this.height; i++) {
    if (Utils.contains(preFilledIndices, i)) {
      this.squares.push(new Square(this.startingVal()));
    } else {
      this.squares.push(new Square(0));
    }
  }
}

Grid.prototype.fillRandomSquare = function() {
  var empties = _.select(this.squares, function(sq) {
    return sq.empty();
  });
  _.sample(empties).value = this.startingVal();
}

Grid.prototype.startingVal = function() {
  return this.startingVals[Utils.rand(this.startingVals.length - 1)];
}

Grid.prototype.preFilledIndices = function(length) {
  var i1 = Utils.rand(length);
  var i2 = i1;

  while(i2 === i1) {
    i2 = Utils.rand(length);
  }
  return [i1,i2];
}

Grid.prototype.render = function($element) {
  this.squares.forEach(function(sq) {
    sq.render($element);
  });
}

Grid.prototype.rows = function() {
  var rows =[];
  for (var i = 0; i < this.width; i ++) {
    rows.push(this.squares.slice(i * this.width, i * this.width + this.width));
  }
  return rows;
}
Grid.prototype.cols = function() {
  var cols =[];
  for (var i = 0; i < this.width; i ++) {
    cols.push(_.pluck(this.rows(), i));
  }
  return cols;
}

Grid.prototype.shiftGroups = function(groups) {
  groups.forEach(function(group) {
    new Group(group).shift();
  });
}

Grid.prototype.shift = function(dir) {
  if (dir === "right") {
    this.shiftGroups(this.rows());
  } else if (dir === "left") {
    this.shiftGroups(this.rows().map(function(r) { return r.reverse() }));
  } else if (dir === "up") {
    this.shiftGroups(this.cols().map(function(c) { return c.reverse() }));
  } else if (dir === "down") {
    this.shiftGroups(this.cols());
  }
}

function TFE() {
  this.width = 4;
  this.height = 4;
  this.grid = new Grid(this.width, this.height);
}

TFE.prototype.init = function(rootSelector) {
  this.$root = $(rootSelector);
  this.grid.render(this.$root);
  this.attachKeyListeners();
}

TFE.prototype.keyPress = function(dir) {
  if (dir !== undefined) {
    this.grid.shift(dir)
    $(".square").remove();
    this.grid.fillRandomSquare();
    this.grid.render(this.$root);
  };
}

TFE.prototype.attachKeyListeners = function() {
  $("body").keyup(function(event) {
    this.keyPress(keyCode(event.which));
  }.bind(this));
}

