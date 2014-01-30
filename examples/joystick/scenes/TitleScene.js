(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.JoystickMovement({
            "speed": 5,
            "faceDirection": true,
            "baseDisk": {
                "radius" :100
            },
            "pointerDisk": {
                "radius": 40
            }
        }));
        this.addChild(spidey);
    }

    cutie.registerScene(scene, "title");
})();