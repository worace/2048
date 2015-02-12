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

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.startingVals = [2,4];
  this.squares = [];
  this.populateGrid()
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

