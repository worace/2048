module("Square Tests");
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
  assert.equal("<p>5</p>", $elem.html());
  assert.ok($elem.hasClass("square"));
});

QUnit.test("it renders itself onto a dom element", function( assert ) {
  var $elem = $(document.createElement("div"));
  assert.equal(0, $elem.children().length);
  new Square(5).render($elem);
  assert.equal(1, $elem.children(".square").length);
});
