(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");

        var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
        this.addChild(spidey); 

        spidey.addBehavior(new cutie.DragAndDrop());
    }

    cutie.registerScene(scene, "title");
})();