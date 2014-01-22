(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");

        for (var i = 0; i < 3; i++) {
            var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
            spidey.x = i * 70;
            spidey.y = i * 70;
            this.addChild(spidey);     
            spidey.addBehavior(new cutie.DragAndDrop());
        }
    }

    cutie.registerScene(scene, "title");
})();