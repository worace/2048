//Init a grid of specified width and height
//optVals allows provision of explicit numeric
//values for testing
function Grid(width, height, optVals) {
  this.width = width;
  this.height = height;
  this.startingVals = [2,2,2,2,4];
  this.squares = [];
  this.populateGrid()

  if (optVals) {
    for (var i = 0; i < this.squares.length; i++) {
      this.squares[i].value = optVals[i];
    }
  }
}

Grid.prototype.populateGrid = function() {
  for(var i = 0; i < this.width * this.height; i++) {
    this.squares.push(new Square(0));
  }
  _(2).times(function() { this.fillRandomSquare(); }.bind(this));
}

Grid.prototype.fillRandomSquare = function() {
  var empties = _.select(this.squares, function(sq) {
    return sq.empty();
  });
  var empty = _.sample(empties)
  if (empty) {
    empty.value = this.startingVal();
  }
}

Grid.prototype.startingVal = function() {
  return _.sample(this.startingVals);
}

Grid.prototype.render = function($element) {
  this.squares.forEach(function(sq, index) {
    sq.render($element, index);
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
