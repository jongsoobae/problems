"use strict"
function pickPeaks(arr){
  let ret = {
    pos: [],
    peaks: []
  };
  let asc = false, plateaus = false, tpos = 0;

  if(arr.length == 0) return ret;

  arr.reduce(function(p, v, i){
    if(!plateaus && p==v) {
      plateaus = true;
      tpos = i - 1;
    }
    if(asc && p>v) {
      ret.peaks.push(p);
      if(plateaus) ret.pos.push(tpos);
      else ret.pos.push(i-1);
      asc = false;
      plateaus = false;
    };
    if(p<v) {
      asc = true;
      plateaus = false;
    }

    return v;
  });
  return ret;

}

console.log(
  pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3])
);

console.log(
  pickPeaks([1, 2, 2, 2, 1,1, 2, 2, 2, 1])
);

console.log(
  pickPeaks([1, 2, 2, 2, 3])
);

console.log(
  pickPeaks([])
);
