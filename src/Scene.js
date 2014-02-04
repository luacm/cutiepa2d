/** 
 * CutiePa2d - Game Framework built on createjs and easeljs
 * 
 * Contributors:
 *      - Greyson Parrelli @greysonp
 *      - Adam Schaub   @maybenot
 *      - Stephen Louie @stephenrlouie
 * 
 * Developed Jan - Feb 2014 to aid Lehigh studens for the mobiLEhigh competition
 *
 */

this.cutie = this.cutie || {};

(function(module) {
    // ======================================================
    // CONSTRUCTOR
    // ======================================================
    /**
     * Description:
     *      A container that manages a scene in your game. Automatically
     *      manages things like preloading and collision detection.
     *
     *      @memberof cutie
     *      @class Scene
     *      @constructor
     * 
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
        this.isPreloaded = false;
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    /**
     * Description: 
     *      Override this method and load all of your assets you want preloaded for this scene.
     *
     *      @function preload
     *      @public
     *      @memberof cutie.Scene#
     *
     *      @param  {createjs.Loader} loader The loader to load all of your assets into.
     */
    Scene.prototype.preload = function(loader) {
    }

    /**
     * Description
     *      Override this method and do anything you want when preload progress is updated.
     *
     *      @memberof cutie.Scene#
     *      @function onPreloadProgress
     *      @public
     *
     *      @param  {createjs.Event} e The event.
     */
    Scene.prototype.onPreloadProgress = function(e) {
        // e.loaded e.total e.progress(0-1)
    }

    /**
     * Description:  
     *      Called when this scene (or list of scenes) is done preloading.
     *
     *      @memberof cutie.Scene#
     *      @function onPreloadComplete
     *      @public
     *
     *      @param  {cutie.Scene[]} scenes 
     *          A list of scenes that were in this preload queue.
     *      @param  {createjs.Event} e 
     *          The event info.
     */
    Scene.prototype.onPreloadComplete = function(scenes, loader, e) {
        cutie.Log.v("cutie.Scene.onPreloadComplete()");

        // Mark all scenes as having been preloaded
        for (var i = 0; i < scenes.length; i++)
            scenes[i].isPreloaded = true;

        // Kick-off the scene
        console.log(loader);
        this.init(loader);
    }

    /**
     * Description:
     *      Overwrite this function to declare what happens when the scene starts.
     *
     *      @memberof cutie.Scene#
     *      @function init
     *      @public
     *
     */
    Scene.prototype.init = function() {
    }

    /**
     * Description: 
     *      Overwrite this function to declare what happens upon updating the scene. In other
     *      words, this method is called every 1/framerate seconds.
     *
     *      @memberof cutie.Scene#
     *      @function tick
     *      @public
     *
     *      @param  {createjs.Event} e The event.
     */
    Scene.prototype.tick = function(e) {

    }

    /**
     * Descrption:
     *      The 'super' method for the tick that is overwritten by the end user. Does
     *      some housekeeping (like calling children's ticks) in addition to calling
     *      the user-defined tick().
     *
     *      @memberof cutie.Scene#
     *      @function _tickInternal
     *      @private
     *
     *      @param  {createjs.Event} e Theh event.
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
