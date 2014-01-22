//Behavior parent class
this.cutie = this.cutie || {};
(function(module){

	var Behavior = function() {
	};

	//module.EventDispatcher.initialize(Behavior.prototype); //adds event dispatching to behaviors

	Behavior.prototype.initialize = function(type) {
		this.type = type;
	};

	Behavior.prototype.addEventListener = function(type, fn, obj) {
	}

	Behavior.prototype.removeEventListener = function(type, obj) {
	};

	module.Behavior = Behavior;

})(this.cutie);

