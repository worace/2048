module("Grid Tests");
QUnit.test("it inits with width and height", function( assert ) {
  assert.equal(4, new Grid(4, 4).width);
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

QUnit.test("it finds rows", function( assert ) {
  var g = new Grid(3,3);
  _.each(g.squares, function(sq, i) {
    sq.value = i;
  });
  assert.equal(3, g.rows().length);
  assert.deepEqual(_.pluck(g.rows()[0], "value"), [0,1,2]);
  assert.deepEqual(_.pluck(g.rows()[1], "value"), [3,4,5]);
  assert.deepEqual(_.pluck(g.rows()[2], "value"), [6,7,8]);
});

QUnit.test("it finds cols", function( assert ) {
  var g = new Grid(3,3);
  _.each(g.squares, function(sq, i) {
    sq.value = i;
  });
  assert.equal(3, g.cols().length);
  assert.deepEqual(_.pluck(g.cols()[0], "value"), [0,3,6]);
  assert.deepEqual(_.pluck(g.cols()[1], "value"), [1,4,7]);
  assert.deepEqual(_.pluck(g.cols()[2], "value"), [2,5,8]);
});

QUnit.test("it combines values when shifting", function( assert ) {
  var g = new Grid(2,2);
  g.squares.forEach(function(sq) {
    sq.value = 2;
  });
  g.shift("right")
  assert.deepEqual([0,4,0,4], _.pluck(g.squares, "value"));

  var g = new Grid(2,2);
  g.squares.forEach(function(sq) {
    sq.value = 2;
  });
  g.shift("left")
  assert.deepEqual([4,0,4,0], _.pluck(g.squares, "value"));

  var g = new Grid(2,2);
  g.squares.forEach(function(sq) {
    sq.value = 2;
  });
  g.shift("up")
  assert.deepEqual([4,4,0,0], _.pluck(g.squares, "value"));
});

QUnit.test("it adds a new random value to one of the unfilled squares", function( assert ) {
  var g = new Grid(2,2);
  g.squares[0].value = 2;
  g.squares[1].value = 0; //1 is only empty square, so it should get filled in
  g.squares[2].value = 2;
  g.squares[3].value = 2;

  g.fillRandomSquare();
  assert.ok(!g.squares[1].empty());
});
