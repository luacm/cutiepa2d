this.cutie = this.cutie || {};

(function(module){
    /**
     * This behavior makes the object able to be dragged and
     * dropped with the mouse/touch.
     * @param {Object} props
     *        <Description of properties.>
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
            obj.addEventListener('mousedown', mousedown.bind(this, obj), false);
            obj.addEventListener('pressup', mouseup.bind(this, obj), false);
        }

        this.clean = function(obj) {
        }

        this.tick = function(obj) {
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
})(this.cutie);