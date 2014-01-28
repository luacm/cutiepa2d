this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
   
   /**
    * Gives an object movement 
    * @param {Object} props 
    *        speed:
    *        faceDirection:
    *        position: {
    *            x:
    *            y:
    *        }
    *        baseDisk: {
    *            color: 
    *            radius:
    *            alpha:
    *        }
    *        pointerDisk: {
    *            color: 
    *            radius:
    *            alpha:
    *        }
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
                if (_faceDirection) obj.rotation = angle * 180/Math.PI;

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