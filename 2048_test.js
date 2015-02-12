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
  var filled = $(".square").filter(function(i) {
    return $(this).html() !== "";
  });
  assert.equal(2, filled.length);
});

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
