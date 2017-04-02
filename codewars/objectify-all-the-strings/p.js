String.prototype.hashify = function() {
	var o = {};
	(this + this[0]).split('').reduce(function(k, v) {
		o[k] = k in o ? [].concat(o[k], v): v;
		return v;
	});
	return o;
}
