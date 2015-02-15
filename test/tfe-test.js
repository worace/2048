module("TFE (integration) tests");
QUnit.test("it fills another square on arrow key press", function( assert ) {
  var tfe = new TFE();
  tfe.grid = new Grid(3,3);
  tfe.grid.squares.forEach(function(sq) {
    sq.value = 0;
  });
  tfe.grid.squares[1].value = 2;
  tfe.init("#grid-root");
  assert.equal(1, filledSquares().length);
  triggerKeyPress("left");
  assert.equal(2, filledSquares().length);
});

QUnit.test("it shifts the rendered grid on key press", function( assert ) {
  var tfe = new TFE();
  tfe.grid = new Grid(3,3);
  tfe.grid.squares.forEach(function(sq) {
    sq.value = 0;
  });
  tfe.grid.squares[1].value = 2;
  tfe.init("#grid-root");

  triggerKeyPress("left");
  assert.equal($($(".square p")[0]).html(), "2");
});

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
