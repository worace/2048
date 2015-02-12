keyCode = function(dir) {
  return {left: 37, up: 38, right: 39, down:40}[dir];
}
var Utils = {
  rand: function(length) {
    return Math.floor((Math.random() * (length - 1)));
  },
  contains: function(array, element) {
    return array.indexOf(element) > -1;
  }
}
function TFE() {
  this.width = 4;
  this.height = 4;
  this.startingVals = [2,4];

  this.init = function(rootSelector) {
    this.$root = $(rootSelector);
    var filledIndices = this.filledIndices(this.width * this.height);
    for(var i = 0; i < this.width * this.height; i++) {
      if (Utils.contains(filledIndices, i)) {
        this.$root.append(this.newSquare(this.startingVal().toString()));
      } else {
        this.$root.append(this.newSquare(""));
      }
    }
  }

  this.startingVal = function() {
    return this.startingVals[Utils.rand(this.startingVals.length - 1)];
  }

  this.filledIndices = function(length) {
    var i1 = Utils.rand(length);
    var i2 = i1;

    while(i2 === i1) {
      i2 = Utils.rand(length);
    }
    return [i1,i2];
  }

  this.newSquare = function(content) {
    var square = document.createElement("div");
    var $sq = $(square);
    $sq.addClass("square");
    $sq.html(content)
    return $sq;
  }
}
