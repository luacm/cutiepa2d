this.cutie = this.cutie || {};

(function(module) {
    // ======================================================
    // CONSTRUCTOR
    // ======================================================
    /**
     * A container that manages a scene in your game. Automatically
     * manages things like preloading and collision detection.
     * @memberof cutie
     * @class Scene
     * @constructor
     */
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
        this._preloader = {};
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    /**
     * Override this method and load all of your assets you want preloaded for this scene.
     * @memberof cutie.Scene#
     * @function preload
     * @public
     * @param  {createjs.Loader} loader The loader to load all of your assets into.
     */
    Scene.prototype.preload = function(loader) {
    }

    /**
     * Override this method and do anything you want when preload progress is updated.
     * @memberof cutie.Scene#
     * @function onPreloadProgress
     * @public
     * @param  {createjs.Event} e The event.
     */
    Scene.prototype.onPreloadProgress = function(e) {
        // e.loaded e.total e.progress(0-1)
        if (this._preloader && this._preloader.onPreloadProgress) {
            this._preloader.onPreloadProgress(e);
        }
    }

    /**
     * Called when this scene (or list of scenes) is done preloading.
     * @memberof cutie.Scene#
     * @function onPreloadComplete
     * @public
     * @param  {cutie.Scene[]} scenes 
     *         A list of scenes that were in this preload queue.
     * @param  {createjs.Event} e 
     *         The event info.
     */
    Scene.prototype.onPreloadComplete = function(scenes, loader, e) {
        cutie.Log.v("cutie.Scene.onPreloadComplete()");

        // Store this loader as the loader for all for all of the scenes in this preload batch
        for (var i = 0; i < scenes.length; i++)
            cutie.storeLoader(scenes[i].name, loader);

        // Kick-off the scene
        this._init(loader);
    }

    /**
     * Sets the preloader to the one specified.
     * @param {createjs.DisplayObject} preloader The preloader you'd like to use for this scene.
     */
    Scene.prototype.setPreloader = function(preloader) {
        this._preloader = preloader;
        this.addChild(preloader);
        console.log("SET PRELOADER");
    }

    /**
     * The private wrapper for the init function. Handles some preloader stuff.
     * @memberof cutie.Scene#
     * @function init
     * @private
     * @param {createjs.DisplayObject} preloader The preloader you'd like to use for this scene.
     */
    Scene.prototype._init = function(loader) {
        if (this._preloader) {
            this.removeChild(this._preloader);
        }
        this.init(loader);
    }

    /**
     * Overwrite this function to declare what happens when the scene starts.
     * @memberof cutie.Scene#
     * @function init
     * @public
     */
    Scene.prototype.init = function() {
    }

    /**
     * Overwrite this function to declare what happens upon updating the scene. In other
     * words, this method is called every 1/framerate seconds.
     * @memberof cutie.Scene#
     * @function tick
     * @public
     * @param  {createjs.Event} e The event.
     */
    Scene.prototype.tick = function(e) {

    }

    /**
     * The 'super' method for the tick that is overwritten by the end user. Does
     * some housekeeping (like calling children's ticks) in addition to calling
     * the user-defined tick().
     * @memberof cutie.Scene#
     * @function _tickInternal
     * @private
     * @param  {createjs.Event} e Theh event.
     */
    Scene.prototype._tickInternal = function(e) {
        this.tick(e);
        for(var i = 0; i < this.children.length; i++) {
            this.children[i]._tickInternal(e);
        }
    }

    // ======================================================
    // PRIVATE FUNCTIONS
    // ======================================================
    
     
    module.Scene = Scene;
})(this.cutie);
