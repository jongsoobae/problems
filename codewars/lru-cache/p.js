class Node {
	constructor(v) {
		this.v = v;
		this.next = null;
		this.prev = null;	
	}
	
}

class Stack {
	constructor() {
		this.head = null;
		this.tail = null;	
	}
	
	unshift(v) {
		if(this.head === null) {
			this.head = new Node(v);
			this.tail = this.head;
		}
		else {
			var temp = new Node(v);
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
	}

	push(v) {
		if (this.tail === null) {
            this.tail = new Node(v);
            this.head = this.tail;
        } else {
            var temp = new Node(v);
            temp.prev = this.tail;
            this.tail.next = temp;
            this.tail = temp;
        }
	}

	pop() {
		var ret = null;

        if (this.tail !== null) {
            ret = this.tail.data;

            if (this.tail === this.head) {
                this.head = null;
                this.tail = null;
            } else {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
        }

        return ret;
	}

	pop_value(v) {
		var curr = this.find(v);
		if(curr && curr.next != null) {
			if(curr.prev) curr.prev.next = curr.next;
			curr.next.prev = curr.prev;
			curr.next = null;
			curr.prev = null;
		}
	}

	shift() {
		var ret = null;

        if (this.head !== null) {
            ret = this.head.v;

            if (this.tail === this.head) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                if(this.head)this.head.prev = null;
            }
        }
        return ret;
	}

	find(v) {
		var curr = this.head;
		while (curr && curr.v != v) {
			curr = curr.next;
		}

		return curr;
	}

	each(f) {
		var curr = this.head;
        while (curr !== null) {
            f(curr);
            curr = curr.next;
        }
	}

	printList() {
		console.log('\n======== stack start ========');
		this.each(function (item) {
            console.log(item.v);
        });
        console.log('======== stack end ========\n');
	}
}

class LRUCache {
	constructor(capacity, opts) {
		this.stack = new Stack();
		this.capacity = capacity;
		this.size = 0;
		this.properties = {};
		for(var k in opts) {
			this.size++;
			this.stack.push(k);
			this.objectDefine(k, opts[k]);
		}
		this.stack.printList();
	}

	cache(k, v) {
		if(k in this) {
			this[k] = v;
			this.stack.pop_value(k);
			this.stack.push(k);
			return this;
		}

		if(this.size == this.capacity) {
			var x = this.stack.shift();
			console.log('timedout', x);
			delete this.properties[x];
			this.size--;
		}

		this.size++;
		this.stack.push(k);
		this.objectDefine(k, v);
		return this;
	}

	objectDefine(k, v) {
		this.properties[k] = v;
		Object.defineProperty(this, k, {
			get: function() {
				this.stack.printList();
				this.stack.pop_value(k);
				this.stack.push(k);
				return this.properties[k];
			},
			set: function(_v) {
				this.properties[k] = _v;
				this.stack.pop_value(k);
				this.stack.push(k);
			}
		});
	}
};

var store = new LRUCache(3, {a: 1});

console.log('store.size', store.size);
console.log('store.capacity', store.capacity);
console.log('store.a', store.a);
console.log('store.b', store.b);
console.log("store.cache('b', 2)['b']", store.cache('b', 2)['b']);
store.a = 5;
console.log('store.a', store.a);
console.log("store.cache('c', 3).cache('d', 4).b", store.cache('c', 3).cache('d', 4).b);

