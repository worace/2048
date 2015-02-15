function Square(val, id) {
  this.value = val;
  this.id = id;
  this.roundStart = this;
  this.roundEnd = this;
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

Square.prototype.resetMoves = function() {
  this.roundStart = this;
  this.roundEnd = this;
}

Square.prototype.render = function($element) {
  $element.append(this.domElement());
}

Square.prototype.domElement = function(identifier) {
  var square = document.createElement("div");
  var p = document.createElement("p");
  $(p).html(this.htmlContent());
  $(p).addClass("value-"+this.value);
  var $sq = $(square);
  $sq.addClass("square");
  if (this.id !== undefined) {
    $sq.attr("id", "square-"+this.id.toString());
  }
  $sq.append(p);
  return $sq;
}
