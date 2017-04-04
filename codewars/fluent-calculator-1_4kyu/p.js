var Magic = {
};
var FluentCalculator = Magic;

(function () {
  'use strict';
  var values = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'ehight', 'nine', 'ten'];
  var operators = {
    'plus': function(a,b) {return a+b;},
    'minus': function(a,b) {return a-b;},
  };

  class Value {
    constructor(v) {
      this.v = v;
    }

    get plus() {
      return new Operation(this.v, operators['plus']);
    }
    get minus() {
      return new Operation(this.v, operators['minus']);
    }

    valueOf() {
      return this.v;
    }
  }

  class Operation {
    constructor(pv, op) {
      this.op = op;
      this.pv = pv;
    }

    get one() {
      return new Value(this.op(this.pv, 1));
    }

    get two() {
      return new Value(this.op(this.pv, 2));
    }
  }

  Object.defineProperty(Operation, 'three', {
    get: function() {
      return new Value(this.op(this.pv, 3));
    }
  })

  var x = new Operation(0, operators['plus']);
  console.log(x.one);
  console.log(x.two);
  console.log(x.three);

  var one = new Value(1);
/*
  Object.defineProperty(one, 'plus', {
    get: function() {
      return get_new_operation(one);
    },
  });

  function get_new_operation(value_obj) {
    var _o = new Operation(value_obj.v);
    Object.defineProperty(_o, 'one', {
      get: function() {
        return get_new_value(_o, 1);
      }
    });

    return _o;
  }

  function get_new_value(op_obj, v) {
    var _v = new Value(op_obj.pv + v);
    Object.defineProperty(_v, 'plus', {
      get: function() {
        return get_new_operation(_v);
      }
    });
    return _v;
  }
  */

})();
