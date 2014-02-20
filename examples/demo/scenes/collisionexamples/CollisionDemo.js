(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
        loader.loadFile({"id": "blue", "src": "assets/blue-block.png"});
        loader.loadFile({"id": "red", "src": "assets/red-block.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        var blue = new cutie.Bitmap(preloaded.getResult("blue"));
        this.addChild(spidey);
        this.addChild(spidey2);
        spidey2.x = 400;
        spidey2.y = 100;
        blue.x = 200;
        blue.y = 200;
        this.addChild(blue);

        this.registerCollisionGroup("block");

        this.registerCollisionGroup("player", {
            "collidesWith": [{
                "name": "block",
                "handle": function(obj1, obj2, pt){
                    cutie.Log.v("Player->Block Collision")
                    var scene = cutie.getActiveScene();
                    scene.removeChild(obj2);
                    //scene.removeCollidable(obj2);
                }
            },
            {
                "name": "player",
                "handle": function(obj1, obj2, pt) {
                    cutie.Log.v("Player->Player Collision")
                    var scene = cutie.getActiveScene();
                    scene.removeChild(obj2);
                    //scene.removeCollidable(obj2);
                }
            }
            ]
        });
        this.addCollidable(spidey, {"groupName": "player", "collisionType": "circle"});
        this.addCollidable(blue, {"groupName": "player", "collisionType": "rectangle"});
        this.addCollidable(spidey2, {"groupName": "block", "collisionType": "circle"})

        spidey.addBehavior(new cutie.Behavior.JoystickMovement({}));

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Collision Demo"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "collisiondemo");
})();