this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior makes the object follow another object or the mouse.
     * 
     * @param {Object} props
     *        targetObj: Object. The object to be followed. Default is the 
     *          mouse
     *        speed: Number. The speed in px/s. Default is 100 px/s.
     *        distance: Number. The goal distance from the target in px. 
     *          Default is 0px. This will try to catch the given object
     *        setCenter: bool. Automatically register the image center. Default is true.
     *        angleOffset: Number. Degrees to shift the heading of the object. Default 90 (straight up).
     *
     *
     */

    var Follow = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var _targetCoord = {};

        var _setCenter = props.setCenter || true;
        var _targetObj = props.targetObj || false;
        var _speed = props.speed || 100;
        var _followDistance = props.distance || 0;
        var _angOffset = props.angleOffset || 90;

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