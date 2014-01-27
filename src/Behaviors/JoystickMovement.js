this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
   
    var JoystickMovement = function(props) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _baseDisk = {};
        var _pointerDisk = {};
        var _isDragging = false;
        var _speed = 0;

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            var baseRadius = 60;
            var pointerRadius = 20;
            var px = baseRadius + pointerRadius + 20;
            var py = cutie.HEIGHT - (baseRadius + pointerRadius + 20);
            _speed = 10;

            _baseDisk = new createjs.Shape();
            _baseDisk.graphics.beginFill("#ccc").drawCircle(0, 0, baseRadius);
            _baseDisk.x = px;
            _baseDisk.y = py;
            _baseDisk.alpha = 0.2;
            _baseDisk.radius = baseRadius;
            cutie.getStage().addChild(_baseDisk);

            _pointerDisk = new createjs.Shape();
            _pointerDisk.graphics.beginFill("#aaa").drawCircle(0, 0, pointerRadius);
            _pointerDisk.x = _pointerDisk.defaultX = px;
            _pointerDisk.y = _pointerDisk.defaultY = py;
            _pointerDisk.alpha = 0.3;
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