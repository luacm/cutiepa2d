/** 
 * CutiePa2d - Game Framework built on createjs and easeljs
 * 
 * Contributors:
 *      - Greyson Parrelli @greysonp
 *      - Adam Schaub   @maybenot
 *      - Stephen Louie @stephenrlouie
 * 
 * Developed Jan - Feb 2014 to aid Lehigh studens for the mobiLEhigh competition
 *
 */

this.cutie = this.cutie || {};

(function(module) {

	var DisplayObject = module.DisplayObject.prototype;

	DisplayObject._clone = DisplayObject.clone;
	DisplayObject.clone = function() {
		var c = this._clone();
		c.behaviors = this.behaviors.slice() || [];
		return c;
	}

	DisplayObject.addBehavior = function(behavior) {
		this.behaviors = this.behaviors || [];
		behavior.init(this);
		this.behaviors.push(behavior);
	}

	DisplayObject.removeBehavior = function(type) {
		var i = this.behaviors.length-1;
		while(i >= 0){
			if(this.behaviors[i].type == type){
				this.behaviors[i].clean(this);
				this.behaviors.splice(i, 1);
			}
			i--;
		}
	}

	DisplayObject._tickInternal = function(e) {
		this.behaviors = this.behaviors || [];
		for(var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].tick(this, e);
		}
		if(this.tick) this.tick(e);
	}
	
})(this.cutie);