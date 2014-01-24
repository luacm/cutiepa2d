(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");

        var path = [
            {"x":200, "y":200},
            {"x":0, "y":0},
            {"x":0, "y":0},
            {"x":200, "y":0}
        ];
        for (var i = 0; i < 1; i++) {
            var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
            spidey.x = i * 70;
            spidey.y = i * 70;
            this.addChild(spidey);
            spidey.addBehavior(new cutie.Behavior.Route({"path": path, "repeat": -1}));
        }
    }

    cutie.registerScene(scene, "title");
})();