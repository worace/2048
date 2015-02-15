module("Square Tests");
QUnit.test("it inits with val", function( assert ) {
  assert.equal(15, new Square(15).value);
});

QUnit.test("it accepts optional id", function( assert ) {
  assert.equal(0, new Square(15, 0).id);
});

QUnit.test("it tracks starting and ending position for a round", function( assert ) {
  var sq = new Square(15, 4)
  assert.equal(4, sq.roundStart.id);
  assert.equal(4, sq.roundEnd.id);
});

QUnit.test("it resets round movements", function( assert ) {
  var sq = new Square(15, 4)
  sq.roundStart = new Square(2, 8);
  sq.roundEnd = new Square(2, 2);

  assert.equal(8, sq.roundStart.id);
  assert.equal(2, sq.roundEnd.id);

  sq.resetMoves();

  assert.equal(4, sq.roundStart.id);
  assert.equal(4, sq.roundEnd.id);
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
  assert.equal("<p class=\"value-5\">5</p>", $elem.html());
  assert.ok($elem.hasClass("square"));
});

QUnit.test("it renders itself onto a dom element", function( assert ) {
  var $elem = $(document.createElement("div"));
  assert.equal(0, $elem.children().length);
  new Square(5).render($elem);
  assert.equal(1, $elem.children(".square").length);
});

QUnit.test("it includes provided identifier when rendering", function( assert ) {
  var $elem = $(document.createElement("div"));
  assert.equal(0, $elem.children().length);
  new Square(5, "my-id").render($elem);
  assert.equal(1, $elem.children(".square").length);
  assert.equal(1, $elem.children("#square-my-id").length);
});
