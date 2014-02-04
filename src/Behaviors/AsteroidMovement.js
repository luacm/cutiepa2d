this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

/**
 * @submodule Behavior
 */
(function(module){
    /**
     * This behavior give the object controls like the classic asteroid game;
     * thrust forward, turn left, and turn right. The center of rotation of the
     * object must be set seperately.
     * @class AsteroidMovement
     * @extends Behavior
     * @constructor
     * @param {Object} [props] The properties being passed in.
     * @param {Number[]} [props.keys=['UpArrow','RightArrow','LeftArrow']] The keycodes for directional movement. {forward, turnRight, turnLeft}
     * @param {Number} [props.acceleration=5] Speed gained in pixels/s^2.
     * @param {Number} [props.deceleration=1] Speed lost in pixels/s^2 (when no key is pressed).
     * @param {Number} [props.rotation=90] Rotation speed in deg/s.
     * @param {Boolean} [props.setCenter=true] Automatically register the image center.
     * @param {Number} [props.angleOffset=90] This is the orientation where 90 is straight up, 
     *     the zero point is the cartesian positive x axis and degrees rotate counter-clockwise up from this x axis.
     */
    var AsteroidMovement = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var keys = props.keys || {};
        var _forwardKey = keys.forward || cutie.KeyCodes.UP;
        var _rightKey = keys.turnRight || cutie.KeyCodes.RIGHT;
        var _leftKey = keys.turnLeft || cutie.KeyCodes.LEFT;

        var _setCenter = props.setCenter || true;

        var _forwardDown = false;
        var _rightDown = false;
        var _leftDown = false;

        var _rotation = props.rotation || 90;
        var _accel = props.acceleration || 100;
        var _decel = props.deceleration || 40;

        var _angOffset;
        if('angleOffset' in props)
            _angOffset = props.angularOffset;
        else
            _angOffset = 90;

        var _velocity = {"x":0, "y":0};//speed, orientation

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            if(_setCenter) {
                obj.regX = obj.image.width/2;
                obj.regY = obj.image.height/2;
            }
            document.addEventListener("keydown", keydown, false);
            document.addEventListener("keyup", keyup, false);
        };

        this.tick = function(obj, e) {
            var time = e.delta/1000;
            if(_rightDown) obj.rotation += time*_rotation;
            if(_leftDown) obj.rotation -= time*_rotation;

            var theta = (obj.rotation - _angOffset)*Math.PI/180;
            if(_forwardDown) {
                _velocity.x += _accel*time*Math.cos(theta);
                _velocity.y += _accel*time*Math.sin(theta);
            }
            else {
                theta = Math.atan2(_velocity.y, _velocity.x);
                _velocity.x -= _decel*time*Math.cos(theta);
                _velocity.y -= _decel*time*Math.sin(theta);

                _velocity.x = (Math.abs(_velocity.x) < 1)?0:_velocity.x;
                _velocity.y = (Math.abs(_velocity.y) < 1)?0:_velocity.y;
            }

            obj.x += _velocity.x*time;
            obj.y += _velocity.y*time;
        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function keydown(e) {
            if(e.which == _forwardKey) _forwardDown = true;
            if(e.which == _rightKey) _rightDown = true;
            if(e.which == _leftKey) _leftDown = true;
        }

        function keyup(e) {
            if(e.which == _forwardKey) _forwardDown = false;
            if(e.which == _rightKey) _rightDown = false;
            if(e.which == _leftKey) _leftDown = false;
        }
    }

    module.AsteroidMovement = AsteroidMovement;
})(this.cutie.Behavior);