class LRUCounter{
    constructor(n, o) {
      this.lrucounter = [];
      this._capacity = n;
      this.size = 0;

      for(let k in o) {
        if(o.hasOwnProperty(k))
          this.cache(k, o[k]);
      }
    }

    get capacity() {
      return this._capacity;
    }

    set capacity(n) {
      this._capacity = n;
      console.log('capacity set',this.size);
      while(this.size > 1) {
        this._delete_key(this._counter_shift());
        this.size--;
      }
      console.log('capacity set',this.size);
    }

    // methods
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

    cache(k, v) {
      if(this._counter_exists(k)) {
        this._counter_remove(k);
      }
      else if(this.size == this.capacity) {
        let dk = this._counter_shift();
        this._delete_key(dk);
      }
      this._counter_push(k);
      this.size = this.lrucounter.length;

      Object.defineProperty(this, k, {
        set: function(_v) {
          this['_'+k] = _v;
          this._counter_remove(k);
          this._counter_push(k);
        },
        get: function() {
          return this['_'+k];
        },
        configurable: true
      });

      this[k] = v;

      return this;
    }

    delete (k) {
      this._delete_key(k);
      this._counter_remove(k);
      this.size--;
    }

    _delete_key (k) {
      delete this[k];
      delete this['_'+k];
    }
}

let store = new LRUCounter(3, {'a': 1});

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
store.capacity = 1; // should resize the store to have just one element
console.log(Object.keys(store));
