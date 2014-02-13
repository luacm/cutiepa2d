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
    * @param {Number} [props.speed=5] The maximum speed the object can travel.
    * @param {Boolean} [props.faceDirection=false] Whether or not you want the object to face in the direction it's moving/
    * @param {Number} [props.angleOffset=90] This is the object orientation where 90 is straight up, 
    *     the zero point is the cartesian positive x axis and degrees rotate counter-clockwise up from this x axis. 
    * @param {Number} [props.position] The position of the center of the joystick.
    * @param {Number} [props.position.x] The x-coordinate of the center of the joystick.
    * @param {Number} [props.position.y] The y-coordinate of the center of the joystick.
    * @param {Number} [props.baseDisk] Properties of the lower base disk of the joystick - the part that doens't move.
    * @param {String} [props.baseDisk.color="#ccc"] What color the base disk should be.
    * @param {Number} [props.baseDisk.radius=60] The radius of the base disk.
    * @param {Number} [props.baseDisk.alpha=0.3] The level of transparency of the base disk.
    * @param {Number} [props.pointerDisk] Properties of the upper pointer disk of the joystick - the part that moves.
    * @param {String} [props.pointerDisk.color="#aaa"] What color the pointer disk should be.
    * @param {Number} [props.pointerDisk.radius=30] The radius of the pointer disk.
    * @param {Number} [props.pointerDisk.alpha=0.3] The level of transparency of the pointer disk.
    */
    var JoystickMovement = function(props) {
        if (!props.baseDisk) props.baseDisk = {};
        if (!props.pointerDisk) props.pointerDisk = {};
        if (!props.position) props.position = {};
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _baseDisk = {};
        var _pointerDisk = {};
        var _isDragging = false;
        var _speed = props.speed || 5;
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

            var baseRadius = props.baseDisk.radius || 60;
            var pointerRadius = props.pointerDisk.radius || 20;
            var px = props.position.x || (baseRadius + pointerRadius + 20);
            var py = props.position.y || (cutie.HEIGHT - (baseRadius + pointerRadius + 20));

            _baseDisk = new createjs.Shape();
            _baseDisk.graphics.beginFill(props.baseDisk.color || "#ccc").drawCircle(0, 0, baseRadius);
            _baseDisk.x = px;
            _baseDisk.y = py;
            _baseDisk.alpha = props.baseDisk.alpha || 0.3;
            _baseDisk.radius = baseRadius;
            cutie.getStage().addChild(_baseDisk);

            _pointerDisk = new createjs.Shape();
            _pointerDisk.graphics.beginFill(props.pointerDisk.color || "#aaa").drawCircle(0, 0, pointerRadius);
            _pointerDisk.x = _pointerDisk.defaultX = px;
            _pointerDisk.y = _pointerDisk.defaultY = py;
            _pointerDisk.alpha = props.pointerDisk.alpha || 0.3;
            _pointerDisk.radius = pointerRadius;
            _pointerDisk.addEventListener("mousedown", pointerMouseDown.bind(this, _pointerDisk), false);
            _pointerDisk.addEventListener("pressup", pointerMouseUp, false);
            cutie.getStage().addChild(_pointerDisk);
        };

        this.clean = function(obj) {
        }

        this.tick = function(obj, e) {
            if (_pointerDisk.isDragging) {
                var stage = cutie.getStage();
                _pointerDisk.x = stage.mouseX - _pointerDisk.clickOffsetX;
                _pointerDisk.y = stage.mouseY - _pointerDisk.clickOffsetY;

                var angle = cutie.Util.angle(_pointerDisk, _baseDisk);
                if (_faceDirection) obj.rotation = angle * 180/Math.PI + _angleOffset;

                // Ensure it stays in bounds of the _baseDisk
                if (cutie.Util.distance(_pointerDisk, _baseDisk) > _baseDisk.radius) {
                    _pointerDisk.x = Math.cos(angle) * _baseDisk.radius + _pointerDisk.defaultX;
                    _pointerDisk.y = Math.sin(angle) * _baseDisk.radius + _pointerDisk.defaultY;
                }

                // Need to re-calculate distance in case the previously-calculated distance is out-of-bounds
                var distance = cutie.Util.distance(_pointerDisk, _baseDisk);

                var magnitude = distance/_baseDisk.radius;

                obj.x += Math.cos(angle) * (_speed * magnitude);
                obj.y += Math.sin(angle) * (_speed * magnitude);
            }
        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function pointerMouseDown(obj, e) {
            _pointerDisk.isDragging = true;
            _pointerDisk.clickOffsetX = e.stageX - obj.x;
            _pointerDisk.clickOffsetY = e.stageY - obj.y;
        }

        function pointerMouseUp(e) {
            _pointerDisk.isDragging = false;
            createjs.Tween.get(_pointerDisk).to({ "x": _pointerDisk.defaultX, "y": _pointerDisk.defaultY }, 50);
        }
       
    }

    module.JoystickMovement = JoystickMovement;
})(this.cutie.Behavior);