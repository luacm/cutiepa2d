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
        this.isPreloaded = false;
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    Scene.prototype.preload = function(loader) {
        cutie.Log.v("cutie.Scene.preload()");
    }

    Scene.prototype.onPreloadProgress = function(e) {
        // e.loaded e.total e.progress(0-1)
        cutie.Log.v("cutie.Scene.onPreloadProgress()");
    }

    /**
     * Called when this scene (or list of scenes) is done preloading
     * @param  {cutie.Scene[]} scenes 
     *         A list of scenes that were in this preload queue.
     * @param  {createjs.Event} e 
     *         The event info.
     */
    Scene.prototype.onPreloadComplete = function(scenes, e) {
        cutie.Log.v("cutie.Scene.onPreloadComplete()");

        // Mark all scenes as having been preloaded
        for (var i = 0; i < scenes.length; i++)
            scenes[i].isPreloaded = true;

        // Kick-off the scene
        this.init();
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
