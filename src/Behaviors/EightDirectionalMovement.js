this.cutie = this.cutie || {};

(function(module){
    /**
     * This behavior makes the object able to be move in eight
     * directions. Movement is equally fast in all directions
     * including diagonals
     * @param {Object} props
     *        keys: [up, down, left, right]. Keycodes for directional movement
     *        speed: Number. The pixels traversed per clock tick
     */
     var LEFT = 37;
     var RIGHT = 39;
     var UP = 38;
     var DOWN = 40;


    var EightDirectionalMovement = function(props) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _upPressed = false;
        var _downPressed = false;
        var _leftPressed = false;
        var _rightPressed = false;

        var props = props || {};
        var _upKey = props.up || UP;
        var _downKey = props.down || DOWN;
        var _leftKey = props.left || LEFT;
        var _rightKey = props.right || RIGHT;

        var _speed = props.speed || 1;
        var _move = {};
        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            document.addEventListener("keydown", keypress, false);
            document.addEventListener("keyup", keyrelease, false);
        };

        this.tick = function(obj) {
            _move.x = 0;
            _move.y = 0;
            if(_upPressed) _move.y -= _speed;
            if(_downPressed) _move.y += _speed;
            if(_leftPressed) _move.x -= _speed;
            if(_rightPressed) _move.x += _speed;

            if(Math.abs(_move.x) + Math.abs(_move.y)==2*_speed) {
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
            module.Log.v("keypress");
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
})(this.cutie);