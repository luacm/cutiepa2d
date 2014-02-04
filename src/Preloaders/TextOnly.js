this.cutie = this.cutie || {};
this.cutie.Preloader = this.cutie.Preloader || {};

(function(module){
    var TextOnly = function() {
      this.initialize();
    }

    TextOnly.prototype = new createjs.Container();
    TextOnly.prototype.Container_initialize = TextOnly.prototype.initialize;
    TextOnly.prototype.initialize = function() {
        // Call super constructor
        this.Container_initialize();
        
        // ==================================================
        // DEFINITIONS
        // ==================================================
        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#000000").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        this.text = new createjs.Text("Loading", "36px Arial", "#ffffff");
        this.addChild(this.text);
    }

    module.TextOnly = TextOnly;

})(this.cutie.Preloader);