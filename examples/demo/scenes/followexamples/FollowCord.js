(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.AsteroidMovement({}));

        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey2.x = cutie.WIDTH/2 - spidey2.image.width/2;
        spidey2.y = cutie.HEIGHT/2 - spidey2.image.height/2;
        spidey2.addBehavior(new cutie.Behavior.Follow({
            'speed':80,
            'targetObj':spidey,
            'followCoord': {'x':50, 'y':-25}
        }));
        this.addChild(spidey2);
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Follow x = 50, y = -25"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "followcord");
})();