var Magic = {};
var FluentCalculator = Magic;

var values = {
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
};

var operators = {
  'plus': function(a,b) {return a+b;},
  'minus': function(a,b) {return a-b;},
  'times': function(a,b) {return a*b},
  'dividedBy': function(a,b) {return a/b;}
};

var MagicOp = {
  pv: 0, op: operators['plus']
};

var MagicValue = {
  'v': 0,
  'valueOf': function() {
    return this.v;
  }
};

for(let number in values) {
  if(!values.hasOwnProperty(number)) continue;

  Object.defineProperty(Magic, number, {
    get: function() {
      MagicValue.v = values[number]; return MagicValue;
    }
  });
  Object.defineProperty(MagicOp, number, {
    get: function() {
      MagicValue.v = this.op(this.pv, values[number]); return MagicValue;
    }
  });
}

for(let _op in operators) {
  if(!operators.hasOwnProperty(_op)) continue;
  Object.defineProperty(MagicValue, _op, {
    get: function() {MagicOp.pv = this.v; MagicOp.op = operators[_op]; return MagicOp;}
  })
}
