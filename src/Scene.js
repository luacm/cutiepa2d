this.cutie = this.cutie || {};

(function(module) {
    // ======================================================
    // CONSTRUCTOR
    // ======================================================
    var Scene = function() {
      this.initialize();
    }

    Scene.prototype = new createjs.Container();
    Scene.prototype.Container_initialize = Scene.prototype.initialize;
    Scene.prototype.initialize = function() {
        // Call super constructor
        this.Container_initialize();
        
        // ==================================================
        // DEFINITIONS
        // ==================================================
        this.preloaded = false;
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    Scene.prototype.preload = function(loader) {
        cutie.Log.v("cutie.Scene.preload()");
    }

    Scene.prototype.init = function() {
        cutie.Log.v("cutie.Scene.init()");
    }

    Scene.prototype.tick = function(e) {

    }

    // ======================================================
    // PRIVATE FUNCTIONS
    // ======================================================

     
    module.Scene = Scene;
})(this.cutie);
