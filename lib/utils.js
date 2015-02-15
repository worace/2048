var Utils = {
  rand: function(length) {
    return Math.floor((Math.random() * (length - 1)));
  },
  contains: function(array, element) {
    return array.indexOf(element) > -1;
  },
  keyCode: function(dir) {
    //two-way map of keycode -> direction and
    //direction -> keycode
    return {37: "left", 38: "up", 39: "right", 40: "down", left: 37, up: 38, right: 39, down:40}[dir];
  }
}
