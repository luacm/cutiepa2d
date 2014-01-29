this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior makes the object able to be dragged and
     * dropped with the mouse/touch.
     * @memberof cutie.Behavior
     * @constructor
     * @param {Object} [props] The properties being passed in. For DragAndDrop there are no behaviors
     *        
     */
    var DragAndDrop = function(props) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var _isDragging = false;
        var _clickOffset = {};

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
            obj.addEventListener("mousedown", mousedown.bind(this, obj), false);
            obj.addEventListener("pressup", mouseup.bind(this, obj), false);
        }

        this.clean = function(obj) {
        }

        this.tick = function(obj, e) {
            if(_isDragging) {
                var stage = cutie.getStage();
                obj.x = stage.mouseX - _clickOffset.x;
                obj.y = stage.mouseY - _clickOffset.y;
            }
        }

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function mousedown(obj, e) {
            _isDragging = true;
            _clickOffset.x = e.stageX - obj.x;
            _clickOffset.y = e.stageY - obj.y;
        }

        function mouseup(obj, e) {
            _isDragging = false;
        }
    };

    // Copy our behavior into the module
    module.DragAndDrop = DragAndDrop;
})(this.cutie.Behavior);