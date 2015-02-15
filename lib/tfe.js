//Top-level object for controlling game-dom
//interactions
function TFE(width) {
  this.width = width || 4;
  this.height = this.width;
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
  $("body").keydown(function(event) {
    this.keyPress(Utils.keyCode(event.which));
  }.bind(this));
}
