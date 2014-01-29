// Cover up createjs with cutie. Internally. we'll use createjs so we know what's
// ours and what isn't. Externally, we don't want to confuse the user by having
// them use two different namespaces.
this.cutie = createjs;

/**
 * @namespace cutie
 */
(function(module) {
    var _scenes = {};
    var _activeScene = {};
    var _canvas = {};
    var _stage = {};
    var _hud = {};
    var _fps = { "sum": 0, "numTicks": 0, "textView": {} };
    module.WIDTH = 0;
    module.HEIGHT = 0;

    /**
     * A list of constants for declaring how you want to scale your game.
     * @namespace cutie.ScaleType
     * @property {Number} NONE Do not scale.
     * @property {Number} STRETCH Make it take up the full screen, even if it ruins the aspect ratio.
     * @property {Number} LETTERBOX Make it take up the full screen, but preserve aspect ratio by using black bars.
     */
    module.ScaleType = {
        "NONE": 0,
        "STRETCH": 1,
        "LETTERBOX": 2
    }

    // ======================================================
    // PUBLIC
    // ======================================================
    /**
     * Starts the game.
     * @memberof cutie
     * @function start
     * @public
     * @static
     * @param  {cutie.Scene} scene 
     *         The scene to start the game with.
     * @param  {Object} [props={}] A series of properties that affects the overall game and how the scene is set.
     * @param  {String} [props.canvasId="js-canvas"] The id of the canvas element you want to display your game in.
     * @param  {cutie.Scene[]} [props.preloadScenes=[]] Which additional scenes to preload when you load this scene. 
     *                                               The progress bar for this scene will be representative of this 
     *                                               list's preload progress.
     * @param  {Object} [props.debugFPS={}] A set of options related to showing the frames per second (FPS) on-screen
     *                                      for debug purposes.
     * @param  {String} [props.debugFPS.size="20px"] The size of the FPS text. You must include units.
     * @param  {String} [props.debugFPS.color="#000000"] The color of the FPS text. Any valid CSS color should work.
     * @param  {Number} [props.debugFPS.updateInterval=500] How often the FPS should update. Making the update interval too
     *                                                      short will just make the number unreadable (it'll change too fast).
     * @param  {Number} [props.scaleType=cutie.ScaleType.NONE] How you want the canvas to scale in the window. Does not impact the in-game with and height.
     */
    module.start = function(scene, props) {
        cutie.Log.v("cutie.start()");

        props = props || {};

        _canvas = document.getElementById(props.canvasId || "js-canvas");
        module.WIDTH = _canvas.width;
        module.HEIGHT = _canvas.height;
        _stage = new createjs.Stage(_canvas);
        createjs.Touch.enable(_stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        _hud = new createjs.Container();
        if (props.scaleType != 0) initScaleCanvas(props.scaleType);

        // Fill in stuff using the properties the user gave
        createjs.Ticker.setFPS(props.fps || 60);
        showFPS(props.debugFPS);

        // Add the listener
        createjs.Ticker.addEventListener("tick", tick);

        // Set the scene
        this.setScene(scene, props);

        _stage.addChild(_hud);
    }

    /**
     * Takes the specified scene and sets it as the active scene. This will
     * now be the scene that receives calls to its tick() function. If it is 
     * not already preloaded, it will be preloaded
     * @memberof cutie
     * @function setScene
     * @public
     * @static
     * @param {cutie.Scene} scene 
     *        The scene to be made active.
     * @param {Object} props 
     *        A series of properties that affects how the scene is set.
     *        "preloadScenes": Which additional scenes to preload when you 
     *                         load this scene. The progress bar for this 
     *                         scene will be representative of this list's
     *                         preload progress.
     */
    module.setScene = function(sceneName, props) {
        cutie.Log.v("cutie.setScene()");

        props = props || {};

        // Remove the previously active scene
        _stage.removeChild(_activeScene);

        // Set it as the active scene
        _activeScene = getScene(sceneName);

        // Build the list of scenes to preload and then preload them
        var preloadList = props.preloadScenes || [];
        preloadList.unshift(sceneName);
        preloadList = getScenes(preloadList);
        preloadScenes(preloadList);


        // Add it to the stage
        _stage.addChild(_activeScene);
    }

    /**
     * Adds the scene to the list of registered scenes.
     * @memberof cutie
     * @function registerScene
     * @public
     * @static
     * @param  {cutie.Scene} scene 
     *         The scene you want to register.
     * @param  {String} name
     *         The name you want to associate with the scene. This is the
     *         name you will use when setting and preloading scenes.
     */
    module.registerScene = function(scene, name) {
        if (_scenes[name]) {
            cutie.Log.w("You registered a scene called '" + name + "', but there was already a scene registered with that name. It was overwritten.");
        }
        _scenes[name] = scene;
    }

    /**
     * Gets a references to the stage being managed by cutie.
     * @memberof cutie
     * @function getStage
     * @public
     * @static
     * @return {createjs.Stage} A reference to the stage being managed by cutie.
     */
    module.getStage = function() {
        return _stage;
    }

    /**
     * Gets a references to the active scene being managed by cutie.
     * @memberof cutie
     * @function getActiveScene
     * @public
     * @static
     * @return {cutie.Scene} A reference to the active scene being managed by cutie.
     */
    module.getActiveScene = function() {
        return _activeScene;
    }
    // ======================================================
    // PRIVATE
    // ======================================================
    /**
     * Description
     * @private
     * @param  {createjs.Event} e description
     */
    function tick(e) {
        _activeScene._tickInternal(e);
        _stage.update();

        _fps.sum += e.delta;
        _fps.numTicks++;
    }

    /**
     * Preloads a list of scenes, and adds the preload event listeners
     * to the first scene in the list
     * @private
     * @param  {cutie.Scene} scenes 
     *         List of scenes to be preloaded.
     */
    function preloadScenes(scenes) {
        var loader = new createjs.LoadQueue();
        loader.installPlugin(createjs.Sound);
        
        // Have all of the scene add onto the the same LoadQueue
        var needsPreload = false;
        for (var i = 0; i < scenes.length; i++) {
            if (!scenes[i].isPreloaded) {
                // Create a new LoadQueue and give it to the scene to preload
                scenes[i].preload(loader);
                needsPreload = true;
            }
        }

        if (needsPreload) {
            loader.on("complete", scenes[0].onPreloadComplete.bind(scenes[0], scenes), scenes[0]);
            loader.on("progress", scenes[0].onPreloadProgress, scenes[0]);

            // Kick-off the loading (just in case any files were added to the queue and set to not immmediately load)
            loader.load();
        }
        else {
            scenes[0].init();
        }
    }

    /**
     * Description
     * @private
     * @param  {String[]} sceneNames description
     * @return {cutie.Scene[]}       description
     */
    function getScenes(sceneNames) {
        var scenes = [];
        for (var i = 0; i < sceneNames.length; i++) {
            scenes.push(getScene(sceneNames[i]));
        }
        return scenes;
    }

    /**
     * Description
     * @private
     * @param  {String} sceneNames  description
     * @return {cutie.Scene}        description
     */
    function getScene(sceneName) {
        var scene = _scenes[sceneName];
        if (!scene) {
            cutie.Log.e("The scene '" + sceneName + "' does not exist.");
            return null;
        }
        return scene;
    }

    /**
     * Description
     * @private
     * @param  {Object} props description
     */
    function showFPS(props) {
        if (props && props.visible) {
            var size = props.size || "20px";
            var color = props.color || "#000000";
            var updateInterval = props.updateInterval || 500;

            _fps.textView = new createjs.Text("", size + " Arial", color);
            _hud.addChild(_fps.textView);
            setInterval(updateFPS, updateInterval);
        }
    }

    /**
     * Description
     * @private
     */
    function updateFPS() {
        var avg = _fps.sum/_fps.numTicks;
        var fps = 1000/avg;
        fps = Math.round(fps * 10) / 10;
        _fps.textView.text = fps + " fps";

        _fps.sum = _fps.numTicks = 0;
    }

    function initScaleCanvas(scaleType) {
        window.onresize = scaleCanvas.bind(this, scaleType);
        scaleCanvas(scaleType);
    }

    function scaleCanvas(scaleType, e) {
        var body = document.getElementsByTagName("body")[0];

        if (scaleType == cutie.ScaleType.STRETCH || scaleType === cutie.ScaleType.LETTERBOX) {
            body.style.padding = "0";
            body.style.margin = "0";
        }

        if (scaleType == cutie.ScaleType.STRETCH) {
            _canvas.style.width = "100%";
            _canvas.style.height = "100%";
        }
        else if (scaleType == cutie.ScaleType.LETTERBOX) {
            // Give us a black background for the letterbox
            body.style.background = "#000000";

            // Calculate the percentage difference between canvas width and window width
            var diff = cutie.WIDTH / window.innerWidth;

            // Scale by height
            if ((cutie.HEIGHT / diff) > window.innerHeight) {
                var newWidth = cutie.WIDTH * window.innerHeight/cutie.HEIGHT;
                _canvas.style.width = newWidth;
                _canvas.style.height = "100%";
                _canvas.style.marginLeft = (window.innerWidth - newWidth)/2;
                _canvas.style.marginTop = 0;
            }
            // Scale by width
            else {
                var newHeight = cutie.HEIGHT * window.innerWidth/cutie.WIDTH;
                _canvas.style.width = "100%";
                _canvas.style.height = newHeight;
                _canvas.style.marginTop = (window.innerHeight - newHeight)/2;
                _canvas.style.marginLeft = 0;
            }
        }
    }

})(this.cutie);