//Drag and Drop behavior
this.cutie = this.cutie || {};

(function(module){
    var DragAndDrop = function(props) {
        this.props = props;
    };

    DragAndDrop.prototype._isDragging = false;
    DragAndDrop.prototype._clickOffset = {};

    DragAndDrop.prototype.init = function(obj) {
        obj.addEventListener('mousedown', mousedown.bind(this, obj), false);
        obj.addEventListener('pressup', mouseup.bind(this, obj), false);
    }

    DragAndDrop.prototype.clean = function(obj) {
    }

    DragAndDrop.prototype.tick = function(obj) {
        if(this._isDragging) {
            var stage = cutie.getStage();
            obj.x = stage.mouseX - this._clickOffset.x;
            obj.y = stage.mouseY - this._clickOffset.y;
        }
    }

    function mousedown(obj, e) {
        this._isDragging = true;
        this._clickOffset.x = e.stageX - obj.x;
        this._clickOffset.y = e.stageY - obj.y;
    }

    function mouseup(obj, e) {
        this._isDragging = false;
    }

    module.DragAndDrop = DragAndDrop;
})(this.cutie);

/*
document.addEventListener('keyup', function(obj) {
                return function(e) {upLeftRight(e, obj); };
            } (this) , false);
*/