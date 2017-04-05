class LRUCache{
    constructor(n, o) {
      Object.defineProperty(this, '_', {
        enumerable: false,
        configurable: true,
        value: {}
      });

      Object.defineProperty(this, 'size', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: 0
      });

      Object.defineProperty(this, 'lrucounter', {
        enumerable: false,
        configurable: true,
        value: []
      });

      Object.defineProperty(this, 'capacity', {
        enumerable: false,
        configurable: false,
        get: function() {return this._.capacity;},
        set: function(n) {
          this._.capacity = n;
          while(this.size > 1) {
            this._delete_key(this._counter_shift());
            this.size--;
          }
        }
      });

      Object.defineProperty(this, 'delete', {
        enumerable: false,
        configurable: false,
        get: function(k) {
          return function(k) {
            if(k in this._) this.size--;
            this._counter_remove(k);
            return this._delete_key(k);;
          }
        }
      });



      this.capacity = n;

      for(let k in o) {
        if(o.hasOwnProperty(k))
          this.cache(k, o[k]);
      }
    }

    cache(k, v) {
      this._define_prop(k);
      this[k] = v;

      if(this.size == this.capacity) {
        this._timedout();
      }
      this.size = this.lrucounter.length;
      return this;
    }

    _delete_key (k) {
      try {
        delete this._[k];
        return delete this[k];
      }
      catch(e) {
        return false;
      }

    }

    _timedout() {
      this._delete_key(this._counter_shift());
    }

    _counter_push(k) {
      this.lrucounter.push(k);
    }
    _counter_remove(k) {
      let idx = this.lrucounter.indexOf(k);
      if(idx >= 0) this.lrucounter.splice(idx,1);
    }
    _counter_exists(k) {
      return this.lrucounter.indexOf(k) >= 0;
    }
    _counter_pop() {
      return this.lrucounter.pop();
    }
    _counter_shift() {
      return this.lrucounter.shift();
    }

    _define_prop(k) {
      Object.defineProperty(this, k, {
        enumerable: true,
        configurable: true,
        get: function() {return this._[k];},
        set: function(v) {
          this._[k] = v;
          this._counter_remove(k);
          this._counter_push(k);
        }
      });
    }
}

let store = new LRUCache(3, {'a': 1});

console.log('size',store.size); // should be 1
console.log('capacity', store.capacity); // should be 3
console.log('a', store.a); // should be 1;
console.log('b', store.cache('b', 2)['b']); // should be 2
store.a = 5;
console.log(store.a); // should be 5
console.log(store.cache('c', 3).cache('d', 4).b);

store.delete('d');
console.log(store.d);
console.log(store.size);
console.log(store.c);
store.cache('c', 4);
console.log(store.c);
console.log(store.lrucounter);
console.log('keke', delete store['delete']);
console.log(store.delete('delete'));
console.log(store.delete('e'));

store.capacity = 1; // should resize the store to have just one element
console.log(Object.keys(store));
console.log(store);
