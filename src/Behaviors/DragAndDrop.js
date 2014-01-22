//Drag and Drop behavior
this.cutie = this.cutie || {};

(function(module){
    var _isDragging = false;
    var _clickOffset = {}

    var DragAndDrop = function(props) {
        this.props = props;
    };

    DragAndDrop.prototype = new module.Behavior();

    DragAndDrop.prototype.init = function(obj) {
        obj.addEventListener('mousedown', mousedown.bind(this, obj), false);
        obj.addEventListener('pressup', mouseup.bind(this, obj), false);
    }

    DragAndDrop.prototype.clean = function(obj) {
    }

    DragAndDrop.prototype.tick = function(obj) {
        if(_isDragging) {
            var stage = cutie.getStage();
            obj.x = stage.mouseX - _clickOffset.x;
            obj.y = stage.mouseY - _clickOffset.y;
        }
    }

    function mousedown(obj, e) {
        _isDragging = true;
        _clickOffset.x = e.stageX - obj.x;
        _clickOffset.y = e.stageY - obj.y;
    }

    function mouseup(obj, e) {
        _isDragging = false;
    }

    module.DragAndDrop = DragAndDrop;
})(this.cutie);

/*
document.addEventListener('keyup', function(obj) {
                return function(e) {upLeftRight(e, obj); };
            } (this) , false);
*/