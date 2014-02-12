this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

/**
 * @submodule Behavior
 */
(function(module){
   
   /**
    * Gives an object analog movement via an on-screen joystick.
    * @class DPadMovement
    * @extends Behavior
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
    * @param {Boolean} [props.eightDirectional = false] A Boolean indicating if the DPad should be 4(false) or 8(true) directional.
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
        var _eightDirectional = ('eightDirectional' in props)?props.eightDirectional:false;


        var _downButton ={};
        var _leftButton ={};
        var _rightButton ={};
        var _upButton ={};
        var _upLeftButton ={};
        var _upRightButton ={};
        var _downLeftButton ={};
        var _downRightButton ={};
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
            _leftButton.alpha = _normalAlpha;
            _leftButton.addEventListener("mousedown", fourDirectionMouseDown.bind(this, _leftButton), false);
            _leftButton.addEventListener("pressup", fourDirectionMouseUp.bind(this, _leftButton), false);
            _leftButton.pressed = false;
            cutie.getStage().addChild(_leftButton);

            
            _rightButton = new createjs.Shape();
            _rightButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _rightButton.x = px + (_buttonSize * 0.5);
            _rightButton.y = py - (_buttonSize * 0.5);
            _rightButton.alpha = _normalAlpha;
            _rightButton.addEventListener("mousedown", fourDirectionMouseDown.bind(this, _rightButton), false);
            _rightButton.addEventListener("pressup", fourDirectionMouseUp.bind(this, _rightButton), false);
            _rightButton.pressed = false;
            cutie.getStage().addChild(_rightButton);

            
            _upButton = new createjs.Shape();
            _upButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _upButton.x = px - (_buttonSize * 0.5);
            _upButton.y = py - (_buttonSize * 1.5);
            _upButton.alpha = _normalAlpha;
            _upButton.addEventListener("mousedown", fourDirectionMouseDown.bind(this, _upButton), false);
            _upButton.addEventListener("pressup", fourDirectionMouseUp.bind(this, _upButton), false);
            _upButton.pressed = false;
            cutie.getStage().addChild(_upButton);

            _downButton = new createjs.Shape();
            _downButton.graphics.beginFill(_buttonColor || "#ccc").drawRect(0, 0, _buttonSize, _buttonSize);
            _downButton.x = px - (_buttonSize * 0.5);
            _downButton.y = py + (_buttonSize * 0.5);
            _downButton.alpha = _normalAlpha;
            _downButton.addEventListener("mousedown", fourDirectionMouseDown.bind(this, _downButton), false);
            _downButton.addEventListener("pressup", fourDirectionMouseUp.bind(this, _downButton), false);
            _downButton.pressed = false;
            cutie.getStage().addChild(_downButton);

            if(_eightDirectional){
                _upLeftButton = new createjs.Shape();
                _upLeftButton.graphics.beginFill("#000").drawRect(0, 0, _buttonSize, _buttonSize);
                _upLeftButton.x = px - (_buttonSize * 1.5);
                _upLeftButton.y = py - (_buttonSize * 1.5);
                _upLeftButton.addEventListener("mousedown", cornerMouseDown.bind(this, _upLeftButton), false);
                _upLeftButton.addEventListener("pressup", cornerMouseUp.bind(this, _upLeftButton), false);
                _upLeftButton.pressed = false;
                _upLeftButton.alpha = 0.01;
                cutie.getStage().addChild(_upLeftButton);

                
                _upRightButton = new createjs.Shape();
                _upRightButton.graphics.beginFill('#000').drawRect(0, 0, _buttonSize, _buttonSize);
                _upRightButton.x = px + (_buttonSize * 0.5);
                _upRightButton.y = py - (_buttonSize * 1.5);
                _upRightButton.addEventListener("mousedown", cornerMouseDown.bind(this, _upRightButton), false);
                _upRightButton.addEventListener("pressup", cornerMouseUp.bind(this, _upRightButton), false);
                _upRightButton.pressed = false;
                _upRightButton.alpha = 0.01;
                cutie.getStage().addChild(_upRightButton);

                
                _downLeftButton = new createjs.Shape();
                _downLeftButton.graphics.beginFill('#000').drawRect(0, 0, _buttonSize, _buttonSize);
                _downLeftButton.x = px - (_buttonSize * 1.5);
                _downLeftButton.y = py + (_buttonSize * 0.5);
                _downLeftButton.addEventListener("mousedown", cornerMouseDown.bind(this, _downLeftButton), false);
                _downLeftButton.addEventListener("pressup", cornerMouseUp.bind(this, _downLeftButton), false);
                _downLeftButton.pressed = false;
                _downLeftButton.alpha = 0.01;
                cutie.getStage().addChild(_downLeftButton);

                
                _downRightButton = new createjs.Shape();
                _downRightButton.graphics.beginFill('#000').drawRect(0, 0, _buttonSize, _buttonSize);
                _downRightButton.x = px + (_buttonSize * 0.5);
                _downRightButton.y = py + (_buttonSize * 0.5);
                _downRightButton.addEventListener("mousedown", cornerMouseDown.bind(this, _downRightButton), false);
                _downRightButton.addEventListener("pressup", cornerMouseUp.bind(this, _downRightButton), false);
                _downRightButton.pressed = false;
                _downRightButton.alpha = 0.01;
                cutie.getStage().addChild(_downRightButton);
            }



        };

        this.clean = function(obj) {
            cutie.getStage().removeChild(_downRightButton);
            cutie.getStage().removeChild(_downLeftButton);
            cutie.getStage().removeChild(_upRightButton);
            cutie.getStage().removeChild(_upLeftButton);
            cutie.getStage().removeChild(_rightButton);
            cutie.getStage().removeChild(_leftButton);
            cutie.getStage().removeChild(_upButton);
            cutie.getStage().removeChild(_downButton);
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


            if(_eightDirectional){
                if(_downLeftButton.pressed){
                    obj.x -= (_speed * time)/2;
                    obj.y += (_speed * time)/2;
                if(_faceDirection) obj.rotation = 225;
                }
                if(_downRightButton.pressed){
                    obj.x += (_speed * time)/2;
                    obj.y += (_speed * time)/2;
                    if(_faceDirection) obj.rotation = 135;
                }
                if(_upLeftButton.pressed){
                    obj.x -= (_speed * time)/2;
                    obj.y -= (_speed * time)/2;
                    if(_faceDirection) obj.rotation = 315;
                }
                if(_upRightButton.pressed){
                    obj.x += (_speed * time)/2;
                    obj.y -= (_speed * time)/2;
                    if(_faceDirection) obj.rotation = 45;
                }
            }

        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function fourDirectionMouseDown(obj, e) {
            obj.alpha = _pressedAlpha;
            obj.pressed = true;
        }

        function fourDirectionMouseUp(obj, e) {
            obj.alpha = _normalAlpha;
            obj.pressed = false;
        }

        function cornerMouseDown(obj, e) {
            obj.pressed = true;
        }

        function cornerMouseUp(obj, e) {
            obj.pressed = false;
        }
       
    }

    module.DPadMovement = DPadMovement;
})(this.cutie.Behavior);