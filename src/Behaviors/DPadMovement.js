this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

/**
 * @submodule Behavior
 */
(function(module){
   
   /**
    * Gives an object analog movement via an on-screen joystick.
    * @class DPadMovement
    * @constructor
    * @param {Object} [props] The properties being passed in.
    * @param {Number} [props.speed=100] The maximum speed the object can travel.
    * @param {Boolean} [props.faceDirection=true] Whether or not you want the object to face in the direction it's moving.
    * @param {Number} [props.position] The position of the center of the DPad.
    * @param {Number} [props.position.x] The x-coordinate of the center of the Dpad. By Default
    *   it is placed in the bottom left corner.
    * @param {Number} [props.position.y] The y-coordinate of the center of the DPad. By default
    *   it is placed in the bottom left corner.
    * @param {String} [props.buttonColor='#ccc'] The hex RBG value of the color of the button.
    * @param {Number} [props.normalAlpha = 1] The unpressed transparency of the buttons.
    * @param {Number} [props.pressedAlpha = 0.5] The pressed transparency of the buttons.
    */
    var DPadMovement = function(props) {
        if (!props.position) props.position = {};
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================

        var _speed = ('speed' in props)?props.speed:100;
        var _faceDirection = ('faceDirection' in props)?props.faceDirection:true;
        var _buttonSize = ('buttonSize' in props)?props.buttonSize:40;
        var _buttonColor = ('buttonColor' in props)?props.buttonColor:'#ccc';
        var _normalAlpha = ('normalAlpha' in props)?props.normalAlpha:1;
        var _pressedAlpha = ('pressedAlpha' in props)?props.pressedAlpha:0.5;

        var _downButton ={};
        var _leftButton ={};
        var _rightButton ={};
        var _upButton ={};
        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            // Make sure the object's registration point is in the correct place for rotation
            if (_faceDirection) {
                obj.regX = obj.image.width/2;
                obj.regY = obj.image.height/2;
            }

            var px = props.position.x || (_buttonSize * 2);
            var py = props.position.y || (cutie.HEIGHT - (_buttonSize * 2));

            
            _leftButton = new createjs.Shape();
            _leftButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _leftButton.x = px - (_buttonSize * 1.5);
            _leftButton.y = py - (_buttonSize * 0.5);
            _leftButton.addEventListener("mousedown", pointerMouseDown.bind(this, _leftButton), false);
            _leftButton.addEventListener("pressup", pointerMouseUp.bind(this, _leftButton), false);
            _leftButton.pressed = false;
            cutie.getStage().addChild(_leftButton);

            
            _rightButton = new createjs.Shape();
            _rightButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _rightButton.x = px + (_buttonSize * 0.5);
            _rightButton.y = py - (_buttonSize * 0.5);
            _rightButton.addEventListener("mousedown", pointerMouseDown.bind(this, _rightButton), false);
            _rightButton.addEventListener("pressup", pointerMouseUp.bind(this, _rightButton), false);
            _rightButton.pressed = false;
            cutie.getStage().addChild(_rightButton);

            
            _upButton = new createjs.Shape();
            _upButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _upButton.x = px - (_buttonSize * 0.5);
            _upButton.y = py - (_buttonSize * 1.5);
            _upButton.addEventListener("mousedown", pointerMouseDown.bind(this, _upButton), false);
            _upButton.addEventListener("pressup", pointerMouseUp.bind(this, _upButton), false);
            _upButton.pressed = false;
            cutie.getStage().addChild(_upButton);

            _downButton = new createjs.Shape();
            _downButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _downButton.x = px - (_buttonSize * 0.5);
            _downButton.y = py + (_buttonSize * 0.5);
            _downButton.addEventListener("mousedown", pointerMouseDown.bind(this, _downButton), false);
            _downButton.addEventListener("pressup", pointerMouseUp.bind(this, _downButton), false);
            _downButton.pressed = false;
            cutie.getStage().addChild(_downButton);

        };

        this.clean = function(obj) {
        }

        this.tick = function(obj, e) {
            var time = e.delta/1000;
            if(_downButton.pressed){
                obj.y += _speed * time;
                if(_faceDirection) obj.rotation = 180;
            }
            if(_upButton.pressed){
                obj.y -= _speed * time;
                if(_faceDirection) obj.rotation = 0;
            }
            if(_leftButton.pressed){
                obj.x -= _speed * time;
                if(_faceDirection) obj.rotation = 270;
            }
            if(_rightButton.pressed){
                obj.x += _speed * time;
                if(_faceDirection) obj.rotation = 90;
            }
        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function pointerMouseDown(obj, e) {
            obj.alpha = _pressedAlpha;
            obj.pressed = true;
        }

        function pointerMouseUp(obj, e) {
            obj.alpha = _normalAlpha;
            obj.pressed = false;
        }
       
    }

    module.DPadMovement = DPadMovement;
})(this.cutie.Behavior);