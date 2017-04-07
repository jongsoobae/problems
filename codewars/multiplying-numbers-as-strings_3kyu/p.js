function multiply(a, b) {
  "use strict";
  if(!a) a = '0';
  if(!b) b = '0';

  let k, mul = new Array(a.length+b.length+1).fill(0);

  a.split('').reverse().forEach(function(va, ia) {
    b.split('').reverse().forEach(function(vb, ib) {
      k = ia + ib;
      mul[k] += parseInt(va) * parseInt(vb);

      if(mul[k] > 9) {
        mul[k+1] = mul[k+1] + Math.floor(mul[k]/10);
        mul[k] = mul[k] % 10;
      }
    });
  });

  return mul.reverse().join('').replace(/^0+/, '') || '0';
  /*
  for( i = 0 ; i < a.length; i++ ) {
    for( j = 0 ; j < b.length; j++ ) {
      k = a.length + b.length-i-j;

      let aa = parseInt(a[a.length-i-1]);
      let bb = parseInt(b[b.length-j-1]);
      mul[k] += aa * bb;

      if(mul[k] > 9) {
        mul[k-1] = mul[k-1] + Math.floor(mul[k]/10);
        mul[k] = mul[k] % 10;
      }
    }
  }
  return mul.join('').replace(/^0+/, '') || '0';
  */
}

console.log(multiply("1020303004875647366210", "2774537626200857473632627613"));
console.log(multiply("", "2774537626200857473632627613"));
