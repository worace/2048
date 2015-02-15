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
