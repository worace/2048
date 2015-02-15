module("Group Tests");
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

QUnit.test("it assigns roundEnd for squares as it shifts", function( assert ) {
  var sq1 = new Square(2, 1);
  var sq2 = new Square(0, 2);
  new Group([sq1, sq2]).shift();
  assert.equal(2, sq1.roundEnd.id);

  assert.equal(2, sq2.roundEnd.id);
});

QUnit.test("it tracks roundEnd for square shifted across multiple empty squares", function( assert ) {
  var squares = [new Square(2, 1), new Square(0, 2), new Square(0, 3), new Square(0, 4)]
  var g = new Group(squares)
  g.shift();

  assert.equal(4, squares[0].roundEnd.id);
  assert.equal(1, squares[0].roundStart.id);
  assert.equal(1, squares[3].roundStart.id);
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

QUnit.test("it combines adjacent pair after sliding them", function( assert ) {
  var squares = [new Square(2), new Square(2), new Square(0), new Square(0)]
  var g = new Group(squares)
  g.shift();

  //getting 2 2 0 0 -> 0 0 2 2
  assert.equal(g.squares[0].value, 0);
  assert.equal(g.squares[1].value, 0);
  assert.equal(g.squares[2].value, 0); //getting 2
  assert.equal(g.squares[3].value, 4); //getting 2
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
