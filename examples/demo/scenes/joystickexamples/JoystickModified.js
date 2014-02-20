(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.JoystickMovement({
            "position": {
                "x":cutie.WIDTH - 100, 
                "y": cutie.HEIGHT - 100
            },
            "joystick": new cutie.Joystick({
                "baseDisk": {
                   "color":"#ff0000",
                    "radius":80,
                    "alpha":0.5
                },
                "pointerDisk": {
                    "color":"#0000ff",
                    "radius":20,
                    "alpha":0.7
                }    
            })
        }));
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Joystick Styled"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "modjoystick");
})();