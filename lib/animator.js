var Animator = function(callback) {
  this.callback = callback;
  this.queue = [];
  this.finishedCount = 0;
}

Animator.prototype.slide = function(square, destination) {
  var $sq = $("#square-"+square.id);
  var $dest = $("#square-"+destination.id);
  var start = $sq.offset();
  var end = $dest.offset();

  var $clone = $sq.clone();
  $sq.parent().append($clone);
  $sq.css("opacity", 0);
  $clone.css("position", "absolute");
  $clone.css({top: start.top, left: start.left}); //set starting point to avoid animating from origin
  $clone.animate({"top": end.top, "left": end.left}, 250, function() {
    this.throttledCallback();
  }.bind(this));
}

Animator.prototype.throttledCallback = function() {
  this.finishedCount ++;
  if (this.finishedCount === this.queue.length) {
    this.callback();
  }
}

Animator.prototype.runAnimations = function() {
  this.queue.forEach(function(tuple) {
    this.slide(tuple[0], tuple[1]);
  }.bind(this));
}
