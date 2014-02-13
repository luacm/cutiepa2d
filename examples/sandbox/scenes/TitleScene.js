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
        //spidey.addBehavior(new cutie.Behavior.Follow({"speed":0}));
        spidey.addBehavior(new cutie.Behavior.AsteroidMovement({}));
        //spidey.addBehavior(new cutie.Behavior.AsteroidMovement());

        var spidey1 = new cutie.Bitmap("assets/spiderman-ball.png");
        this.addChild(spidey1);
        spidey1.x = 200;
        spidey1.y = 200;
        //spidey1.addBehavior(new cutie.Behavior.Follow({"speed":0}));
        spidey1.addBehavior(new cutie.Behavior.Follow({'targetObj':spidey, 'speed': 20}));

        var spidey2 = new cutie.Bitmap("assets/spiderman-ball.png");
        this.addChild(spidey2);
        spidey2.x = 200;
        spidey2.y = 200;
        //spidey2.addBehavior(new cutie.Behavior.Follow({"speed":0}));
        spidey2.addBehavior(new cutie.Behavior.Follow({'targetObj':spidey1, 'speed':30}));

/*
        var shootProps = {
            "bullet": new cutie.Bitmap("assets/spiderman-ball.png"),
            "origin": {"x": 50, "y": -50}
        };
        spidey.addBehavior(new cutie.Behavior.Shoot(shootProps));
        */

    }

    cutie.registerScene(scene, "title");
})();