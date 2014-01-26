(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");

        var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
        this.addChild(spidey);
        spidey.x = 200;
        spidey.y = 200;
        spidey.addBehavior(new cutie.Behavior.Follow({"speed":0}));
        spidey.addBehavior(new cutie.Behavior.EightDirectionalMovement());

        var v = new cutie.Vector(0, 0);
        cutie.Log.v("x " + v.x + " y " + v.y);

        var shootProps = {
            "bullet": spidey,
            "origin": {"x": 0, "y": 0}
        };
        spidey.addBehavior(new cutie.Behavior.Shoot(shootProps));
    }

    cutie.registerScene(scene, "title");
})();