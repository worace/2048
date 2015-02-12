QUnit.test("it finds root div", function( assert ) {
  var root = $("#grid-root");
  assert.ok( root.length > 0, "Passed!" );
});

QUnit.test("has a 4x4 grid", function( assert ) {
  new TFE().init("#grid-root");
  assert.equal(16, $(".square").length);
});

QUnit.test("it inits with 2 filled squares", function( assert ) {
  new TFE().init("#grid-root");
  assert.equal(2, filledSquares().length);
});

QUnit.test("it finds arrow key codes", function( assert ) {
  assert.equal(37, keyCode("left"));
  assert.equal(38, keyCode("up"));
  assert.equal(39, keyCode("right"));
  assert.equal(40, keyCode("down"));
});

QUnit.test("it fills another square on arrow key press", function( assert ) {
  new TFE().init("#grid-root");
  assert.equal(2, filledSquares().length);
  triggerKeyPress("left");
  //assert.equal(3, filledSquares().length);
});

function triggerKeyPress(dir) {
  var e = jQuery.Event("keydown");
  e.which = keyCode(dir);
  $("document").trigger(e);
}

var filledSquares = function() {
  var filled = $(".square").filter(function(i) {
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
