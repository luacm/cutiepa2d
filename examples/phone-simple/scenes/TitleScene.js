(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");

        for (var i = 0; i < 64; i++) {
            var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
            spidey.x = Math.random() * 550 + 10;
            spidey.y = Math.random() * 850 + 10;
            this.addChild(spidey);     
            spidey.addBehavior(new cutie.Behavior.DragAndDrop());
        }
    }

    cutie.registerScene(scene, "title");
})();