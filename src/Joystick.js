this.createjs = this.createjs || {};
this.cutie = this.cutie || {};

(function(module) {

    /**
     * Creates an on-screen joystick that you can poll for angle and magnitude.
     * @class Joystick
     * @constructor
     * @param {Object} [props] The properties being passed in.
     * @param {Number} [props.position] The position of the center of the joystick.
     * @param {Number} [props.position.x] The x-coordinate of the center of the joystick.
     * @param {Number} [props.position.y] The y-coordinate of the center of the joystick.
     * @param {Number} [props.baseDisk] Properties of the lower base disk of the joystick - the part that doens't move.
     * @param {String} [props.baseDisk.color="#ccc"] What color the base disk should be.
     * @param {Number} [props.baseDisk.radius=60] The radius of the base disk.
     * @param {Number} [props.baseDisk.alpha=0.3] The level of transparency of the base disk.
     * @param {Number} [props.pointerDisk] Properties of the upper pointer disk of the joystick - the part that moves.
     * @param {String} [props.pointerDisk.color="#aaa"] What color the pointer disk should be.
     * @param {Number} [props.pointerDisk.radius=20] The radius of the pointer disk.
     * @param {Number} [props.pointerDisk.alpha=0.3] The level of transparency of the pointer disk.
     */
    var Joystick = function(props) {
        this.initialize(props);
    }

    Joystick.prototype = new createjs.Container();
    Joystick.prototype.Container_initialize = Joystick.prototype.initialize;
    Joystick.prototype.initialize = function(props) {
        // Call super constructor
        this.Container_initialize();
        
        if (!props) props = {};
        if (!props.baseDisk) props.baseDisk = {};
        if (!props.pointerDisk) props.pointerDisk = {};
        if (!props.position) props.position = {};

        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        this._baseDisk = {};
        this._pointerDisk = {};
        this.isDragging = false;
        this.angle = 0;
        this.magnitude = 0;


        // ================================================
        // INITIALIZATION
        // ================================================
        var baseRadius = props.baseDisk.radius || 60;
        var pointerRadius = props.pointerDisk.radius || 20;
        var px = props.position.x || (baseRadius + pointerRadius + 20);
        var py = props.position.y || (cutie.HEIGHT - (baseRadius + pointerRadius + 20));

        this._baseDisk = new createjs.Shape();
        this._baseDisk.graphics.beginFill(props.baseDisk.color || "#ccc").drawCircle(0, 0, baseRadius);
        this._baseDisk.x = px;
        this._baseDisk.y = py;
        this._baseDisk.alpha = props.baseDisk.alpha || 0.3;
        this._baseDisk.radius = baseRadius;
        this.addChild(this._baseDisk);

        this._pointerDisk = new createjs.Shape();
        this._pointerDisk.graphics.beginFill(props.pointerDisk.color || "#aaa").drawCircle(0, 0, pointerRadius);
        this._pointerDisk.x = this._pointerDisk.defaultX = px;
        this._pointerDisk.y = this._pointerDisk.defaultY = py;
        this._pointerDisk.alpha = props.pointerDisk.alpha || 0.3;
        this._pointerDisk.radius = pointerRadius;
        this._pointerDisk.addEventListener("mousedown", this._pointerMouseDown.bind(this, this._pointerDisk), false);
        this._pointerDisk.addEventListener("pressup", this._pointerMouseUp.bind(this, this._pointerDisk), false);
        this.addChild(this._pointerDisk);
    }

    // ================================================
    // PUBLIC METHODS
    // ================================================
    Joystick.prototype.tick = function(e) {
        if (this.isDragging) {
            var stage = cutie.getStage();
            this._pointerDisk.x = stage.mouseX - this._pointerDisk.clickOffsetX;
            this._pointerDisk.y = stage.mouseY - this._pointerDisk.clickOffsetY;

            this.angle = cutie.Util.angle(this._pointerDisk, this._baseDisk);

            // Ensure it stays in bounds of the _baseDisk
            if (cutie.Util.distance(this._pointerDisk, this._baseDisk) > this._baseDisk.radius) {
                this._pointerDisk.x = Math.cos(this.angle) * this._baseDisk.radius + this._pointerDisk.defaultX;
                this._pointerDisk.y = Math.sin(this.angle) * this._baseDisk.radius + this._pointerDisk.defaultY;
            }

            // Need to re-calculate distance in case the previously-calculated distance is out-of-bounds
            var distance = cutie.Util.distance(this._pointerDisk, this._baseDisk);
            this.magnitude = distance/this._baseDisk.radius;
        }
    }

    // ================================================
    // PRIVATE METHODS
    // ================================================
    Joystick.prototype._pointerMouseDown = function(obj, e) {
        this.isDragging = true;
        obj.clickOffsetX = e.stageX - obj.x;
        obj.clickOffsetY = e.stageY - obj.y;
    }

    Joystick.prototype._pointerMouseUp = function(obj, e) {
        this.isDragging = false;
        createjs.Tween.get(obj).to({ "x": obj.defaultX, "y": obj.defaultY }, 50);
    }

    module.Joystick = Joystick;

})(this.cutie);