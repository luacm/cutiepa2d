this.cutie = this.cutie || {};

(function(module) {
    var activeScene;
    var canvas;
    var stage;

    // ======================================================
    // PUBLIC
    // ======================================================
    module.start = function(scene, props) {
        cutie.Log.v("cutie.start()");

        props = props || {};

        // Fill in stuff using the properties the user gave
        canvas = document.getElementById(props.canvasId || "js-canvas")
        stage = new createjs.Stage(canvas);
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
        createjs.Ticker.setFPS(props.fps || 60);

        // Add the listener
        createjs.Ticker.addEventListener("tick", tick);

        // Set the scene
        this.setScene(scene);
    }

    module.setScene = function(scene) {
        cutie.Log.v("cutie.setScene()");
        activeScene = scene;
        scene.preload();
        stage.addChild(activeScene);
    }

    // ======================================================
    // PRIVATE
    // ======================================================
    function tick() {
        activeScene.tick();
        stage.update();
    }

})(this.cutie);