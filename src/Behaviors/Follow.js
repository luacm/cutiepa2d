this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * Gives an object the ability to follow another object or the mouse.
     * 
     * @memberof cutie.Behavior
     * @constructor
     * @param {Object} [props] The properties being passed in.
     * @param {Boolean} [props.targetObj=false] This is the object that is going to be followed. 
     *      If no object is passed in, it will follow the mouse. 
     * @param {Number} [props.speed=100] This is an integer value giving the speed in px/s
     * @param {Number} [props.distance=0] This is the follow distance in px. 
     * @param {Boolean} [props.setCenter=true] This is signifies if the object doing the following should rotate around its center
     * @param {Number} [props.angleOffset=90] This is the following orientation where 90 is straight up, 
     *     the origin is the cartesian positive x axis and degrees rotate counter-clockwise up from this x axis. 
     *
     */

    var Follow = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var _targetCoord = {};

        var _setCenter = ('setCenter' in props)?props.setCenter:true;
        var _targetObj = ('targetObj' in props)?props.targetObj:false;
        var _speed = ('speed' in props)?props.speed:100;
        var _followDistance = ('distance' in props)?props.distance:0;
        var _angOffset = ('angleOffset' in props)?props.angleOffset:90;

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
        	//If the mouse is the object
            setCoords();
            if(_setCenter) {
                obj.regX = obj.image.width/2;
                obj.regY = obj.image.height/2;
            }
        };

        this.tick = function(obj, e) {
            var dist = _speed*e.delta/1000;
            setCoords();
            var xDist = _targetCoord.x - obj.x;
            var yDist = _targetCoord.y - obj.y;


            var distanceFrom = Math.sqrt(xDist*xDist + yDist*yDist);
            //Will keep correct orientation even if within the distance
            var theta = Math.atan2(yDist,xDist);
            obj.rotation = (theta * 180 / Math.PI) + _angOffset;
            if(distanceFrom > _followDistance && dist < distanceFrom) {
            	obj.x += dist*Math.cos(theta);
            	obj.y += dist*Math.sin(theta);
            }

        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        
        function setCoords(){
            if(!_targetObj) {
                var stage = cutie.getStage();
                _targetCoord.x = stage.mouseX;
                _targetCoord.y = stage.mouseY;
            }
            else{
                _targetCoord.x = _targetObj.x;
                _targetCoord.y = _targetObj.y;
            }
        }

    }

    module.Follow = Follow;
})(this.cutie.Behavior);