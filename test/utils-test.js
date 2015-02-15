module("Utils helper module tests");
QUnit.test("it finds arrow key codes", function( assert ) {
  assert.equal(37, Utils.keyCode("left"));
  assert.equal(38, Utils.keyCode("up"));
  assert.equal(39, Utils.keyCode("right"));
  assert.equal(40, Utils.keyCode("down"));
  assert.equal("left", Utils.keyCode(37));
  assert.equal("up", Utils.keyCode(38));
  assert.equal("right", Utils.keyCode(39));
  assert.equal("down", Utils.keyCode(40));
});
