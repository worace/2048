//helper functions for 2048 test suite
function triggerKeyPress(dir) {
  var e = jQuery.Event("keydown");
  e.which = Utils.keyCode(dir);
  $("body").trigger(e);
}

var filledSquares = function() {
  var filled = $(".square p").filter(function(i) {
    return $(this).html() !== "";
  });
  return filled
}

var arrayContainsArray = function(container, target) {
  for (var i in container) {
    var equal = true;
    var element = container[i];
    for (var j = 0; j < element.length; j++) {
      if (target[j] !== element[j]) {
        equal = false
      }
    }
    if (equal) {
      return true;
    }
  }
  return false;
}
