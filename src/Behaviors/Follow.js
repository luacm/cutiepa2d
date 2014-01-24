this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior makes the object follow another object or the mouse.
     * 
     * @param {Object} props
     *        targetMouse: Boolean. A boolean that specifies if the mouse
     *          is the follow target. Default is true
     *        targetObj: Object. The object to be followed. Default is the 
     *          mouse
     *        speed: Number. The speed in px/s. Default is 100 px/s.
     *        distance: Number. The goal distance from the target in px. 
     *          Default is 0px. This will try to catch the given object
     *        
     *
     *
     */

    var Follow = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var _coords = props.path || [];
        var _targetCoord = {};

        var _targetMouse = props.targetMouse || true;
        var _targetObj = props.targetObj || {};
        var _speed = props.speed || 100;
        var _distance = props.distance || 0;
        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
        	//If the mouse is the object
            setCoords();
        };

        this.tick = function(obj, e) {
            var dist = _speed*e.delta/1000;
            setCoords();
            var xDist = _targetCoord.x - obj.x;
            var yDist = _targetCoord.y - obj.y;
            console.log(obj);
            //console.log('ObjX: ' + obj.x + ', ObjY: ' + obj.y + '\n');

/*
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
                */
            	var theta = Math.atan2(yDist/xDist);
                //console.log('XDist ' + xDist + ' YDist: ' + yDist + ' theta ' + theta + '\n');
                obj.rotation = theta * 180 / Math.PI;
                //console.log('ROATION: ' + obj.rotation + '\n');
            	obj.x += dist*Math.cos(theta);
            	obj.y += dist*Math.sin(theta);
            //}
            

        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        
        function setCoords(){
            if(_targetMouse) {
                var stage = cutie.getStage();
                _targetCoord.x = stage.mouseX;
                _targetCoord.y = stage.mouseY;
            }
            else{
                _targetCoord.x = _targetObj.x;
                _targetCoord.y = _targetObj.y;
            }
            //console.log('TargetX: ' + _targetCoord.x + ', TargetY: ' + _targetCoord.y + '\n');
        }

    }

    module.Follow = Follow;
})(this.cutie.Behavior);