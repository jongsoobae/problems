let a = {};

Object.defineProperty(a, 'delete', {
  get: function(k) {
    return function(k) {
      console.log(k);
      return k;
    }
  }
});

console.log(a.delete('k'));
