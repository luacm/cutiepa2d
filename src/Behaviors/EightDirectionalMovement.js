this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior makes the object able to be move in eight
     * directions. Movement is equally fast in all directions
     * including diagonals
     *
     *
     * @memberof cutie.Behavior
     * @constructor
     * @param {Object} [props] The properties being passed in.
     * @param {Number[]} [props.keys=['UpArrow','RightArrow','LeftArrow']] The keycodes for directional movement. {forward, turnRight, turnLeft}
     * @param {Number} [props.speed=100] Speed in px/s.
     *        
     */
  
    var EightDirectionalMovement = function(props) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _upPressed = false;
        var _downPressed = false;
        var _leftPressed = false;
        var _rightPressed = false;

        var props = props || {};
        var keys = props.keys || {};
        var _upKey = keys.up || cutie.KeyCodes.UP;
        var _rightKey = keys.right || cutie.KeyCodes.RIGHT;
        var _downKey = keys.down || cutie.KeyCodes.DOWN;
        var _leftKey = keys.left || cutie.KeyCodes.LEFT;
        

        var _speed = props.speed || 100;
        var _move = {};
        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            document.addEventListener("keydown", keypress, false);
            document.addEventListener("keyup", keyrelease, false);
        };

        this.tick = function(obj, e) {
            _move.x = 0;
            _move.y = 0;
            var time = e.delta/1000;
            if(_upPressed) _move.y -= _speed*time;
            if(_downPressed) _move.y += _speed*time;
            if(_leftPressed) _move.x -= _speed*time;
            if(_rightPressed) _move.x += _speed*time;

            if(Math.abs(_move.x) + Math.abs(_move.y)==2*_speed*time) {
                _move.x /= Math.sqrt(2);
                _move.y /= Math.sqrt(2);
            }

            obj.x += _move.x;
            obj.y += _move.y;
        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function keypress(evt) {
            if(evt.which == _upKey) _upPressed = true;
            if(evt.which == _downKey) _downPressed = true;
            if(evt.which == _leftKey) _leftPressed = true;
            if(evt.which == _rightKey) _rightPressed = true;
        }

        function keyrelease(evt) {
            if(evt.which == _upKey) _upPressed = false;
            if(evt.which == _downKey) _downPressed = false;
            if(evt.which == _leftKey) _leftPressed = false;
            if(evt.which == _rightKey) _rightPressed = false;
        }

    };

    // Copy our behavior into the module
    module.EightDirectionalMovement = EightDirectionalMovement;
})(this.cutie.Behavior);