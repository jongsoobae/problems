  function createArgumentMap(func) {
    if(func.length <=0) return [];
    var o={};
    var _arg = arguments;

    getFnParamNames(func).forEach(function(v, i) {
      o[v] = _arg[i+1];
    });

    return o;



    function getFnParamNames(fn){
      return fn.toString().match(/\(.*?\)/)[0].replace(/[()]/gi,'').replace(/\s/gi,'').split(',');
    }
  }
  createArgumentMap(func1, 'v1', 'v2');
