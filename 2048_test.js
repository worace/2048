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

// Grid
QUnit.test("it inits with width and height", function( assert ) {
  assert.equal(4, new Grid(4).width);
  assert.equal(5, new Grid(4, 5).height);
});

QUnit.test("it populates with 2 pre-filled squares", function( assert ) {
  var g = new Grid(4,4)
  var zeros = [];
  var others = [];
  for (i in g.squares) {
    if (g.squares[i].empty()) {
      zeros.push(g.squares[i]);
    } else {
      others.push(g.squares[i]);
    }
  }

  assert.equal(2, others.length);
  assert.equal(14, zeros.length);
});

QUnit.test("it assigns edges to squares", function( assert ) {
  var g = new Grid(4,4,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  assert.equal(5, g.squares[5].value);
  //  1
  //4 5 6
  //  9
  assert.equal(1, g.squares[5].top.value);
  assert.equal(6, g.squares[5].right.value);
  assert.equal(9, g.squares[5].down.value);
  assert.equal(4, g.squares[5].left.value);
});

QUnit.test("edges of edge squares are undefined", function( assert ) {
  var g = new Grid(4,4,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  assert.equal(undefined, g.squares[0].left);
  assert.equal(undefined, g.squares[0].top);
  assert.equal(undefined, g.squares[3].right);
  assert.equal(undefined, g.squares[3].top);
  assert.equal(undefined, g.squares[12].left);
  assert.equal(undefined, g.squares[12].bottom);
  assert.equal(undefined, g.squares[15].right);
  assert.equal(undefined, g.squares[15].bottom);
});

QUnit.skip("it combines values when shifting", function( assert ) {
  var g = new Grid(2,2);
  // 2 2
  // 2 2
  for (var i in g.squares) {
    g.squares[i].value = 2;
  }
  assert.equal(4, g.squares.filter(function(sq) { return !sq.empty() } ).length);
  g.shift("left")
  // 4 0
  // 4 0
  assert.equal(2, g.squares.filter(function(sq) { return !sq.empty() } ).length);
});


// Square

QUnit.test("it inits with val", function( assert ) {
  assert.equal(15, new Square(15).value);
});

QUnit.test("it finds htmlContent", function( assert ) {
  assert.equal("15", new Square(15).htmlContent());
  assert.equal("", new Square(0).htmlContent());
});

QUnit.test("it is empty if val is 0", function( assert ) {
  assert.ok(!(new Square(15).empty()));
  assert.ok(new Square(0).empty());
});

QUnit.test("it generates a dom element", function( assert ) {
  var sq = new Square(5);
  var $elem = sq.domElement();
  assert.equal("5", $elem.html());
  assert.ok($elem.hasClass("square"));
});

QUnit.test("it renders itself onto a dom element", function( assert ) {
  var $elem = $(document.createElement("div"));
  assert.equal(0, $elem.children().length);
  new Square(5).render($elem);
  assert.equal(1, $elem.children(".square").length);
});

QUnit.test("it shifts its value to neighbor square", function( assert ) {
  var dirs = ["left", "right", "top", "down"]
  for (var i in dirs) {
    var sq = new Square(2);
    var dir = dirs[i];
    sq[dir] = new Square(2);
    sq.shift(dir, 0);
    assert.equal(0, sq.value, dir);
    assert.equal(4, sq[dir].value);
  }
});

QUnit.test("it shifts across empty squares", function( assert ) {
  var sq = new Square(2);
  var middle = new Square(0);
  var right = new Square(2);
  middle.right = right;
  sq.right = middle;

  sq.shift("right", 0);
  assert.equal(0, sq.value);
  assert.equal(0, middle.value);
  assert.equal(4, right.value);
});

QUnit.skip("it fills another square on arrow key press", function( assert ) {
  new TFE().init("#grid-root");
  assert.equal(2, filledSquares().length);
  triggerKeyPress("left");
  assert.equal(3, filledSquares().length);
});

function triggerKeyPress(dir) {
  var e = jQuery.Event("keydown");
  e.which = keyCode(dir);
  $("body").trigger(e);
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
