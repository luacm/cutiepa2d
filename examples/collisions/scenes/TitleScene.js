(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");

        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        this.addChild(spidey);
        spidey2.x = 200;
        spidey2.y = 200;
        this.addChild(spidey2);


        this.registerCollisionGroup("block");

        this.registerCollisionGroup("player", {
            "collidesWith": [{
                "name": "block",
                "handle": function(obj1, obj2, pt){
                    cutie.Log.v("Player->Block Collision")
                }
            },
            {
                "name": "player",
                "handle": function(obj1, obj2, pt) {
                    cutie.Log.v("Player->Player Collision")
                }
            }
            ]
        });
        this.addCollidable(spidey, {"groupName": "player", "collisionType": "circle"});
        this.addCollidable(spidey2, {"groupName": "block", "collisionType": "rectangle"});


        spidey.addBehavior(new cutie.Behavior.JoystickMovement({}));

    }

    cutie.registerScene(scene, "title");
})();