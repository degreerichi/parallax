document.addEventListener('DOMContentLoaded', function(){

	var Parallax = function (qry, options) {
		this.options = Object.assign({
			multiplier: 1,
			fadeToBlack: false
		}, options);
		this.query = qry;
		this.listeners = [];
		this.elems = document.querySelectorAll(this.query);
		this.init();
	}

	Parallax.prototype = {
		init: function(){
			for (var i = 0; i < this.elems.length; i++) {
				this.listeners[i] = function(self, index){
					self.setBackgroundPosition(self.elems[index]);
				}
			}
			this.initListeners();
			this.loadParallax();
		},
		initListeners: function(){
			var _self = this;
			window.addEventListener('scroll', function(){
				_self.runParallax();
			});
		},
		runParallax: function(){
			for (var i = 0; i < this.listeners.length; i++) {
				this.listeners[i](this, i);
			}
		},
		setBackgroundPosition: function(elem){
			if (window.scrollY + elem.offsetTop < elem.offsetTop  || elem.offsetTop + elem.offsetHeight < window.scrollY) return false;
			var backpositiony = this.calcPosition(elem);
			elem.style.backgroundPosition = '50% '+(((backpositiony * this.options.multiplier)-100)*-1)+'%';
		},
		calcPosition: function(elem){
			var min = elem.offsetTop;
			var max = elem.offsetTop + elem.offsetHeight;
			var range = max - min;
			return window.scrollY / range * 100;
		},
		loadParallax: function(){
			this.runParallax();
		}
	}

	var plx = new Parallax('.parallax', {
		multiplier: 4
	});

});