  function defaultArguments(func, params) {
    var names = func.names || func.toString()
      .replace(/\/\/.*$|\/\*.*?\*\/|\s/gm, '')
      .match(/(?:[\w]+(?:,[\w]+)*)?(?=\))/m)[0].split(',');
    
    var detour = function () {
      var input = arguments;

      var nmap = names.map(function (val, i) {
        return i < input.length ? input[i] : params[names[i]];
      });

      return func.apply(this, nmap);
    };
    
    detour.names = names;
    return detour;
  }
