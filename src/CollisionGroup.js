this.cutie = this.cutie || {};

(function(module) {

	var collisionEvent = new module.Event("collision");

	var CollisionGroup = function() {
		
	};

	var _collisionEnabled = false;


	module.EventDispatcher.initialize(CollisionGroup.prototype);
	module.CollisionGroup = CollisionGroup;
})(this.cutie);