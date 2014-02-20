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
        spidey.regX = spidey.image.width/2;
        spidey.regY = spidey.image.height/2;

        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey2.x = cutie.WIDTH/2 - spidey2.image.width/2;
        spidey2.y = cutie.HEIGHT/2 - spidey2.image.height/2;
        spidey2.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey,
            'distance':50,
            'speed':150
        }));

        var spidey3 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey3.x = cutie.WIDTH/2 - spidey3.image.width/2;
        spidey3.y = cutie.HEIGHT/2 - spidey3.image.height/2;
        spidey3.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey2,
            'distance':50,
            'speed':150
        }));

        var spidey4 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey4.x = cutie.WIDTH/2 - spidey4.image.width/2;
        spidey4.y = cutie.HEIGHT/2 - spidey4.image.height/2;
        spidey4.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey3,
            'distance':50,
            'speed':150
        }));

        var spidey5 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey5.x = cutie.WIDTH/2 - spidey5.image.width/2;
        spidey5.y = cutie.HEIGHT/2 - spidey5.image.height/2;
        spidey5.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey4,
            'distance':50,
            'speed':150
        }));

        var spidey6 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey6.x = cutie.WIDTH/2 - spidey6.image.width/2;
        spidey6.y = cutie.HEIGHT/2 - spidey6.image.height/2;
        spidey6.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey5,
            'distance':50,
            'speed':150
        }));

        var spidey7 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey7.x = cutie.WIDTH/2 - spidey7.image.width/2;
        spidey7.y = cutie.HEIGHT/2 - spidey7.image.height/2;
        spidey7.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey6,
            'distance':50,
            'speed':150
        }));

        var spidey8 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey8.x = cutie.WIDTH/2 - spidey8.image.width/2;
        spidey8.y = cutie.HEIGHT/2 - spidey8.image.height/2;
        spidey8.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey7,
            'distance':50,
            'speed':150
        }));

        var spidey9 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey9.x = cutie.WIDTH/2 - spidey9.image.width/2;
        spidey9.y = cutie.HEIGHT/2 - spidey9.image.height/2;
        spidey9.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey8,
            'distance':50,
            'speed':150
        }));

        this.addChild(spidey9);
        this.addChild(spidey8);
        this.addChild(spidey7);
        this.addChild(spidey6);
        this.addChild(spidey5);
        this.addChild(spidey4);
        this.addChild(spidey3);
        this.addChild(spidey2);
        this.addChild(spidey);


        // Add title and back button
        this.addChild(Helper.makeGameTitle("Asteroid movement with Follow trail"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "snakefollow");
})();