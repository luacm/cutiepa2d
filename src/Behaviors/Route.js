this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

/**
 * @submodule Behavior
 */
(function(module){
    /**
     * This behavior makes the object move along a specified route.
     * @class Route
     * @extends Behavior
     * @constructor
     * @param {Object} [props] The properties being passed in.
     * @param {Array} props.path[] Array of coorinates {x,y} to follow, ordered from first to last.
     * @param {Number} [props.speed=100] Speed in px/s.
     * @param {Number} [props.repeat=1] Number of times to repeat the path. -1 for continuous.
     * @param {Boolean} [props.setCenter=true] Automatically register the image center.
     */

    var Route = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var _coords = props.path || [];
        var _coordNum = 0;
        var _setCenter = props.setCenter || true;

        var _speed = props.speed || 100;
        var _repeat = props.repeat || 1;
        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
        	if(_setCenter) {
                obj.regX = obj.image.width/2;
                obj.regY = obj.image.height/2;
            }
        };

        this.tick = function(obj, e) {
        	if(_repeat != 0 && _coords.length != 0) {
	            var dist = _speed*e.delta/1000;
	            var xDist = _coords[_coordNum].x - obj.x;
	            var yDist = _coords[_coordNum].y - obj.y;

	            var goal = Math.sqrt(xDist*xDist + yDist*yDist);
	            if(goal < dist) {
	            	obj.x = _coords[_coordNum].x;
	            	obj.y = _coords[_coordNum].y;
	            	_coordNum++;
	            	//module.Log.v(_coordNum + " move to " + _coords[_coordNum].x + " " + _coords[_coordNum].y + " " + _coords.length);
	            	if(_coordNum >= _coords.length) {
	            		if(_repeat == -1) _coordNum = 0;
	            		else _repeat--;
	            	}
	            }
	            else {
	            	var theta = Math.atan2(yDist,xDist);

	            	obj.x += dist*Math.cos(theta);
	            	obj.y += dist*Math.sin(theta);
	            }
            }

        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        
    }

    module.Route = Route;
})(this.cutie.Behavior);