this.cutie = this.cutie || {};

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
     */

    var AsteroidMovement = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        
        var props = props || {};
        var keys = props.keys || {};
        var _forwardKey = keys.forward || module.KeyCodes.W;
        var _rightKey = keys.turnRight || module.KeyCodes.D;
        var _leftKey = keys.turnLeft || module.KeyCodes.A;

        var _setCenter = props.setCenter || true;

        var _forwardDown = false;
        var _rightDown = false;
        var _leftDown = false;

        var _rotation = props.rotation || 90;
        var _accel = props.acceleration || 5;
        var _decel = props.deceleration || 1;

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

            var theta = (obj.rotation - 90)*Math.PI/180;
            if(_forwardDown) {
                module.Log.v("forward");
                _velocity.x += _accel*time*Math.cos(theta);
                _velocity.y += _accel*time*Math.sin(theta);
                module.Log.v("vx " + _velocity.x + " vy " + _velocity.y);
            }
            else {
                var yMod = 0;
                var xMod = 0;
                if(_velocity.y != 0) yMod = _velocity.y/Math.abs(_velocity.y);
                if(_velocity.x != 0) xMod = _velocity.x/Math.abs(_velocity.x);

                if(_velocity.x != 0) theta = Math.atan(Math.abs(_velocity.y/_velocity.x));
                else theta = Math.PI/2;

                _velocity.x -= _decel*time*xMod*Math.cos(theta);
                _velocity.y -= _decel*time*yMod*Math.sin(theta);

                if(_velocity.x*xMod < 0) _velocity.x = 0;
                if(_velocity.y*yMod < 0) _velocity.y = 0;

            }

            obj.x += _velocity.x;
            obj.y += _velocity.y;
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
})(this.cutie);