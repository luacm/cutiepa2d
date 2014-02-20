this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

/**
 * @submodule Behavior
 */
(function(module){
   
   /**
    * Gives an object analog movement via an on-screen joystick.
    * @class JoystickMovement
    * @extends Behavior
    * @constructor
    * @param {Object} [props] The properties being passed in.
    * @param {Number} [props.speed=200] The maximum speed the object can travel (in pixels/sec).
    * @param {Boolean} [props.faceDirection=false] Whether or not you want the object to face in the direction it's moving/
    * @param {Number} [props.angleOffset=90] This is the object orientation where 90 is straight up, 
    *     the zero point is the cartesian positive x axis and degrees rotate counter-clockwise up from this x axis. 
    * @param {cutie.Joystick} [props.joystick] The joystick object you'd like to use.
    */
    var JoystickMovement = function(props) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _joystick = props.joystick || new cutie.Joystick();
        var _isDragging = false;
        var _speed = props.speed || 200;
        var _faceDirection = props.faceDirection || false;
        var _angleOffset = ('angleOffset' in props)?props.angleOffset:90;

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            // Make sure the object's registration point is in the correct place for rotation
            if (_faceDirection) {
                obj.regX = obj.image.width/2;
                obj.regY = obj.image.height/2;
            }

            cutie.getActiveScene().addChild(_joystick);
        };

        this.clean = function(obj) {
            cutie.getActiveScene().removeChild(_joystick);
        }

        this.tick = function(obj, e) {
            if (_joystick.isDragging) {
                var angle = _joystick.angle;
                var magnitude = _joystick.magnitude;

                if (_faceDirection) obj.rotation = angle * 180/Math.PI + _angleOffset;

                var time = e.delta/1000;
                obj.x += Math.cos(angle) * (_speed * magnitude * time);
                obj.y += Math.sin(angle) * (_speed * magnitude * time);
            }
        }
    }

    module.JoystickMovement = JoystickMovement;
})(this.cutie.Behavior);