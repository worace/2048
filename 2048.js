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
  var $sq = $(square);
  $sq.addClass("square");
  $sq.html(this.htmlContent())
  return $sq;
}

Square.prototype.shift = function(dir, value) {
  if (this[dir]) {
    if (this.value === 0) {
      this[dir].shift(dir, value);
    } else {
      this[dir].shift(dir, this.value);
      this.value = value;
    }
  } else {
    this.value = this.value + value;
  }
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
    for (var i in this.squares) {
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
  this.assignEdges();
}

Grid.prototype.assignEdges = function() {
  for (var i in this.squares) {
    i = parseInt(i)
    var sq = this.squares[i]
    sq.top = this.squares[(i - this.width)];
    if (!(i % this.width === this.width - 1)) {
      sq.right = this.squares[(i + 1)];
    }
    sq.down = this.squares[(i + this.width)];
    if (!(i % this.width == 0)) {
      sq.left = this.squares[(i - 1)];
    }
  }
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
  for (var i in this.squares) {
    this.squares[i].render($element);
  }
}

Grid.prototype.shift = function(dir) {
  for (var i in this.squares) {
    this.squares[i].shift(dir);
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
  };
}

TFE.prototype.attachKeyListeners = function() {
  $("body").keydown(function(event) {
    this.keyPress(keyCode(event.which));
  }.bind(this));
}

