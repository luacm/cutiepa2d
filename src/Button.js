this.cutie = this.cutie || {};

/**
 * @module cutie
 */
(function(module) {

    // ======================================================
    // CONSTRUCTOR
    // ======================================================
    /**
     * A cute little button.
     * @class Button
     * @constructor
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {String} [text=""]
     * @param {Object} [styleProps={}]
     * @param {String} [styleProps.fgColor="#f3f3f3"]
     * @param {String} [styleProps.bgColor="#cccccc"]
     * @param {String} [styleProps.textStyle="18px Arial"]
     * @param {String} [styleProps.textColor="#000000"]
     */
    var Button = function(x, y, width, height, text, styleProps) {
        text = text || "";

        styleProps = styleProps || {};
        styleProps.fgColor = styleProps.fgColor || "#f3f3f3";
        styleProps.bgColor = styleProps.bgColor || "#cccccc"
        styleProps.cornerRadius = (typeof styleProps.cornerRadius != "undefined") ? styleProps.cornerRadius : 5;
        styleProps.textStyle = styleProps.textStyle || "18px Arial";
        styleProps.textColor = styleProps.textColor || "#000000";

        this.initialize(x, y, width, height, text, styleProps);
    }

    Button.prototype = new createjs.Container();
    Button.prototype.Container_initialize = Button.prototype.initialize;
    Button.prototype.initialize = function(x, y, width, height, text, styleProps) {
        // Call super constructor
        this.Container_initialize();

        // ==================================================
        // DEFINITIONS
        // ==================================================
        
        // Background
        this._bg = new createjs.Shape();
        this._bg.graphics.beginFill(styleProps.bgColor).drawRoundRect(3, 3, width, height, styleProps.cornerRadius);
        this.addChild(this._bg);

        // Foreground
        this._fg = new createjs.Shape();
        this._fg.graphics.beginFill(styleProps.fgColor).drawRoundRect(0, 0, width, height, styleProps.cornerRadius);
        this.addChild(this._fg);

        // Text
        this._text = new createjs.Text(text, styleProps.textStyle, styleProps.textColor);
        var tWidth = this._text.getMeasuredWidth();
        var tHeight = this._text.getMeasuredHeight();
        this._text.x = width/2 - tWidth/2;
        this._text.y = height/2 - tHeight/2;
        this.addChild(this._text);

        // Events
        this._fg.addEventListener("mousedown", function(e) {
            e.target.x = 2;
            e.target.y = 2;
        });

        this._fg.addEventListener("pressup", function(e) {
          e.target.x = 0;
          e.target.y = 0;
        });

        // Set position
        this.x = x;
        this.y = y;
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    /**
     * Override this method and load all of your assets you want preloaded for this scene.
     * @method preload
     * @public
     * @param  {createjs.Loader} loader The loader to load all of your assets into.
     */
    
     
    module.Button = Button;
})(this.cutie);
