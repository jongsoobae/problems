

class Thing {
  constructor(name) {
    this.name = name
  }

  get is_a () {
    return new Proxy(this, is_a_handler);
  }

  get is_not_a () {
    return new Proxy(this, is_not_a_handler);
  }

  get is_the () {
    return new Proxy(this, is_the_handler);
  }

  get can () {
    return new Proxy(this, can_handler);
  }

  has(count) {
    this.count = count;
    return new Proxy(this, has_handler);
  }
}

var is_a_handler = {
  get: function(t, n) {
    if(typeof(n) == 'string') {
      Object.defineProperty(t, 'is_a_'+ n, {
        get: function() {return true}
      });
    }
    return '';
  }
}

var is_not_a_handler = {
  get: function(t, n) {
    if(typeof(n) == 'string') {
      Object.defineProperty(t, 'is_a_'+ n, {
        get: function() {return false}
      });
    }
    return '';
  }
}

var is_the_handler = {
  get: function(t,n) {
    if(typeof(n) == 'string') {
      return new Proxy({}, {
        get: function(_t, _n) {
          t[n] = _n;
        }
      });
    }
  }
}

var has_handler = {
  get: function(t, n) {
    if(typeof(n) == 'string') {
      if(t.count > 1) {
        t[n] = new Array(t.count).fill(t);
      }
      else t[n] = t;

      return {
        'each': function(fun) {
        }
      };
    }
  }
};

var can_handler = {
  get: function(t, n) {
    if(typeof(n) == 'string' && n!='inspect') {
      
    }
  },
  set: function(t, n) {
    console.log('set', t, n);
  },
  defineProperty: function(t, k, desc) {
    console.log('def');
  },
  apply: function() {
    console.log('apply');
  },
  constructor: function() {
    console.log('constructor');
  }
}


const jane = new Thing('Jane')

console.log(jane.name);
console.log(jane.is_a);
jane.is_a.person
jane.is_not_a.girl
console.log(jane.is_a_person);
console.log(jane.is_a_girl);
jane.is_the.parent_of.joe
console.log(jane.parent_of);
jane.is_the.daugter_of.jack
console.log(jane.daugter_of);
jane.has(2).legs
console.log(jane.legs.length);
console.log(jane.legs[0] instanceof Thing);
jane.has(1).head
console.log(jane.head instanceof Thing);
jane.has(2).arms.each(arm => having(1).hand.having(5).fingers );
jane.can.speak('spoke', phrase =>
  `${name} says: ${phrase}`)
