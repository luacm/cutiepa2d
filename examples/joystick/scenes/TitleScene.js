(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile("assets/spiderman-ball.png");
    }

    scene.init = function() {
        cutie.Log.d("title.init()");
        var spidey = new cutie.Bitmap("assets/spiderman-ball.png");
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.JoystickMovement({
            "speed": 5,
            "faceDirection": true
        }));
        this.addChild(spidey);
    }

    cutie.registerScene(scene, "title");
})();