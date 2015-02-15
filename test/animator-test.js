module("Animator Tests");
QUnit.test("it inits with empty queue", function( assert ) {
  var a = new Animator()
  assert.deepEqual(a.queue, []);
});

QUnit.skip("it moves elements", function( assert ) {
  var a = new Animator()
  assert.deepEqual(a.queue, []);
});
