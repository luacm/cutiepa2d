this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior give the object controls like the classic asteroid game;
     * thrust forward, turn left, and turn right. The center of rotation of the
     * object must be set seperately.
     * 
     * @param {Object} props
     *        keys: {forward, turnRight, turnLeft}. Keycodes for directional movement. Default is {W, D, S}.
     *        acceleration: Number. Speed gained in pixels/s^2. Default is 5 px/s^2.
     *        deceleration: Number. Speed lost in pixels/s^2 (when no key is pressed). Default is 1 px/s^2.
     *        rotation: Number. Rotation speed in deg/s. Default is 90 deg/s.
     *        setCenter: bool. Automatically register the image center. Default is true.
     *        angleOffset: Number. Degrees to shift the heading of the object. Default 90 (straight up).
     */

    var AsteroidMovement = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var keys = props.keys || {};
        var _forwardKey = keys.forward || cutie.KeyCodes.W;
        var _rightKey = keys.turnRight || cutie.KeyCodes.D;
        var _leftKey = keys.turnLeft || cutie.KeyCodes.A;

        var _setCenter = props.setCenter || true;

        var _forwardDown = false;
        var _rightDown = false;
        var _leftDown = false;

        var _rotation = props.rotation || 90;
        var _accel = props.acceleration || 100;
        var _decel = props.deceleration || 40;
        var _angOffset = props.angularOffset || 90;

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