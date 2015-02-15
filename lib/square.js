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

Square.prototype.render = function($element, identifier) {
  $element.append(this.domElement(identifier));
}

Square.prototype.domElement = function(identifier) {
  var square = document.createElement("div");
  var p = document.createElement("p");
  $(p).html(this.htmlContent());
  $(p).addClass("value-"+this.value);
  var $sq = $(square);
  $sq.addClass("square");
  if (identifier) {
    $sq.attr("id", "square-"+identifier);
  }
  $sq.append(p);
  return $sq;
}
