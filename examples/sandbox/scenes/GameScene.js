(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {

    }

    scene.init = function() {
        cutie.Log.d("game.init()");
    }
    cutie.registerScene(scene, "game");
})();