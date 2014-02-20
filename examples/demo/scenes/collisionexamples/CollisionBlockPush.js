(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "blue", "src": "assets/blue-block.png"});
        loader.loadFile({"id": "red", "src": "assets/red-block.png"});
    }

    scene.init = function(preloaded) {
        player = new cutie.Bitmap(preloaded.getResult("red"));
        this.addChild(player);
        block = new cutie.Bitmap(preloaded.getResult("blue"));
        this.addChild(block);

        block.x = cutie.WIDTH/2;
        block.y = cutie.HEIGHT/2;

        this.registerCollisionGroup("block");
        this.registerCollisionGroup("player", {
            "collidesWith": [{
                "name": "block",
                "handle": function(obj1, obj2, pt){
                    cutie.Log.v("Player->Block Collision")
                    if(pt.height >= pt.width) {
                        //collided from a side
                        obj2.x = (obj1.x > obj2.x)?obj1.x-obj2.image.width:obj1.x+obj1.image.width;
                    }
                    else {
                        //collided from top/bottom
                        obj2.y = (obj1.y > obj2.y)?obj1.y-obj2.image.height:obj1.y+obj1.image.height;
                    }
                }
            }
            ]
        });
        this.addCollidable(player, {"groupName": "player", "collisionType": "rectangle"});
        this.addCollidable(block, {"groupName": "block", "collisionType": "rectangle"});

        player.addBehavior(new cutie.Behavior.JoystickMovement({}));

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Collsion Block Push"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "collisionblock");
})();