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
  g.squares.forEach(function(sq) {
    if (sq.empty()) {
      zeros.push(sq);
    } else {
      others.push(sq);
    }
  });

  assert.equal(2, others.length);
  assert.equal(14, zeros.length);
});

QUnit.skip("it combines values when shifting", function( assert ) {
  var g = new Grid(2,2);
  // 2 2
  // 2 2
  g.squares.forEach(function(sq) {
    sq.value = 2;
  });
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

QUnit.skip("it fills another square on arrow key press", function( assert ) {
  new TFE().init("#grid-root");
  assert.equal(2, filledSquares().length);
  triggerKeyPress("left");
  assert.equal(3, filledSquares().length);
});

// Group
QUnit.test("it inits with squares", function( assert ) {
  var sq1 = new Square(2);
  var sq2 = new Square(0);
  var g = new Group([sq1, sq2]);
  assert.equal(g.squares.length, 2);
});

QUnit.test("it combines same value squares", function( assert ) {
  var sq1 = new Square(2);
  var sq2 = new Square(2);
  new Group([sq1, sq2]).shift();
  assert.equal(sq1.value, 0);
  assert.equal(sq2.value, 4);
});

QUnit.test("it shifts full squares into empty squares", function( assert ) {
  var sq1 = new Square(2);
  var sq2 = new Square(0);
  new Group([sq1, sq2]).shift();
  assert.equal(sq1.value, 0);
  assert.equal(sq2.value, 2);
});

QUnit.test("it combines across empty squares", function( assert ) {
  var squares = [new Square(2), new Square(0), new Square(0), new Square(2)]
  var g = new Group(squares)
  g.shift();

  assert.equal(0, g.squares[0].value);
  assert.equal(0, g.squares[1].value);
  assert.equal(0, g.squares[2].value);
  assert.equal(4, g.squares[3].value);
});

QUnit.test("it doesnt combine different numbers", function( assert ) {
  var squares = [new Square(2), new Square(0), new Square(0), new Square(4)]
  var g = new Group(squares)
  g.shift();

  assert.equal(0, g.squares[0].value);
  assert.equal(0, g.squares[1].value);
  assert.equal(2, g.squares[2].value);
  assert.equal(4, g.squares[3].value);
});

QUnit.test("it only allows 1 combination per square per shift", function( assert ) {
  var squares = [new Square(2), new Square(2), new Square(2), new Square(2)]
  var g = new Group(squares)
  g.shift();

  // 2 2 2 2 -> 0 0 4 4
  // getting 2 0 2 4
  assert.equal(g.squares[0].value, 0); // getting 2
  assert.equal(g.squares[1].value, 0); // pass
  assert.equal(g.squares[2].value, 4); // getting 2
  assert.equal(g.squares[3].value, 4); // pass
});

QUnit.test("leaves odd matches out", function( assert ) {
  var squares = [new Square(0), new Square(2), new Square(2), new Square(2)]
  var g = new Group(squares)
  g.shift();

  assert.equal(0, g.squares[0].value);
  assert.equal(0, g.squares[1].value);
  assert.equal(2, g.squares[2].value);
  assert.equal(4, g.squares[3].value);
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
