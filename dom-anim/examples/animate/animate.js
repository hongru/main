/* =========== animate js ============ */
/*       @author:hongru.chen           */
/* =================================== */

if (typeof HR == 'undefined' || !HR) 
	HR = {
		extend : function (destination, source, override) {
			if (override === undefined) override = true;
			for (var property in source) {
				if (override || !(property in destination)) {
					destination[property] = source[property];
				}
			}		
			return destination;
		}
	};

(function () {

	var Tween = { 
		Linear: function(t,b,c,d){ return c*t/d + b; },
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
				else var s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	}

	var get = function (ids) {
		var d = document, a = -1;
		this.elements = [];
		if (typeof ids != 'string' && !!ids.length) {
			for (var i=0; i<ids.length; i++) {
				var id = ids[i], o;
				o = typeof id == 'string' ? d.getElementById(id) : id;
				this.elements.push(o);
			}
		} else {
			while (typeof arguments[++a] == 'string') { 
				this.elements.push(d.getElementById(arguments[a]));
			}
		}
	}
	
	get.prototype = {
	
		each : function (fn) {
			for (var i=0; i<this.elements.length; i++) {
				fn.call(this, this.elements[i])
			}
			return this;
		},
		
		setStyle : function (p, v) {
			this.each(function (el) {
				el.style[p] = v;
			});
			return this;
		},
		
		show : function () {
			var _this = this;
			this.each(function (el) {
				_this.setStyle('display', 'block');
			})
			return this;
		},
		
		hide : function () {
			var _this = this;
			this.each(function (el) {
				_this.setStyle('display', 'none');
			})
			return this;
		},
		
		animate: function (config) {
			if (!this.animQueue) this.animQueue = HR._animQueue = [];
			var a = 0, time, tween, ease, callback;
			while (arguments[++a]) {
				if (typeof arguments[a] == 'number') time = arguments[a];
				if (typeof arguments[a] == 'string') {
					if (/^ease*/.test(arguments[a])) ease = arguments[a];
					else tween = arguments[a];
				}
				if (HR.isFunction(arguments[a])) callback = arguments[a];
			}
			
			this.animQueue.push({
				config: config,
				time: time,
				tween: tween,
				ease: ease,
				callback: callback
			});
			if (this.animQueue.length == 1) this.execute(this.animQueue);

			return this;
		},
		
		stop : function (clearQueue) {
			if (clearQueue) HR._animQueue.length = 0;
			this.each(function (el) { 
				if (!!HR.timers[el.id])
					for (var i=0; i<HR.timers[el.id].length; i++) clearTimeout(HR.timers[el.id][i])
			});
			return this;
		},
		
		execute : function (queue) {	
			var _this = this, m = 0, n = 0,
			_anim = function (el, key, from, to, at, tw, ease, cb) {
				var isOP = (key == 'opacity' && !HR.support.opacity), _key = key;
				if (isOP) {to = to*100; _key = 'filter'}
				var	s = +new Date,
					d = at,
					b = parseFloat(from) || 0,
					c = to-b;

				(function () {
					var t = +new Date - s;
					if (t >= d) {
						n ++;
						t = d;
						el.style[_key] = (isOP ? 'alpha(opacity=' : '') + Tween.Linear(t, b, c, d) + (key != 'opacity' ? 'px' : '') + (isOP ? ')' : '');
						!!cb && cb.apply(el);
						if (m == n && _this.animQueue.length > 1) {
							_this.animQueue.shift();
							_this.execute(_this.animQueue);
						}
						
						return;
					}
					el.style[_key] = (isOP ? 'alpha(opacity=' : '') + Tween[tw][ease](t, b, c, d) + (key != 'opacity' ? 'px' : '') + (isOP ? ')' : '');
					
					if (!HR.timers[el.id]) HR.timers[el.id] = [];
					HR.timers[el.id].push(setTimeout(arguments.callee, 16));
					
				})();
			},
			_q = this.animQueue[0];

			return this.each(function (el) {
				for (var k in _q.config) {
					m ++;
					_anim(el, 
						  k, 
						  k == 'opacity' && !HR.support.opacity ? HR.getStyle('filter', el) == '' ? 100 : parseInt(HR.getStyle('filter', el).match(/\d{1,3}/g)[0]) : HR.getStyle(k, el), 
						  _q.config[k], 
						  typeof _q.time == 'number' ? _q.time : 1000, 
						  typeof _q.tween == 'string' && !/^ease*/.test(_q.tween) ? _q.tween : 'Quart',
						  typeof _q.ease == 'string' && /^ease*/.test(_q.ease) ? _q.ease : 'easeOut',
						  _q.callback)
				}
			});
		}
	}
	
	HR.extend(HR, {
		get : function () {
			return new get(arguments);
		},
		isFunction : function(o) {
			return typeof(o) == 'function' && (!Function.prototype.call || typeof(o.call) == 'function');
		},
		getStyle : function (p, el) {
			return el.currentStyle ? el.currentStyle[p] : document.defaultView.getComputedStyle(el, null).getPropertyValue(p);
		},
		support : (function () {
			try {
				var d = document.createElement('div');
				d.style['display'] = 'none';
				d.innerHTML = '<a style="float:left; opacity:.5;"></a>';
				var a = d.getElementsByTagName('a')[0];
				return {
					opacity: a.style.opacity === '0.5'
				}
			} finally {
				d = null;
			}
		})(),
		
		timers : {}

	});

})();