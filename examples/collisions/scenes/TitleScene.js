(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");

        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey2.x = 200;
        spidey2.y = 200;
        this.addChild(spidey);
        this.addChild(spidey2);
        this.registerCollisionGroup("block");

        this.registerCollisionGroup("player", {
            "internalCollisions": function(obj1, obj2, rect) {
                var scene = cutie.getActiveScene();
                scene.removeChild(obj2);
            },
            "collidesWith": {
                "name": "block",
                "handle": function(obj1, obj2, rect){
                    modX = Math.abs(obj1.x-obj2.x)/(obj1.x-obj2.x);
                    modY = Math.abs(obj1.y-obj2.y)/(obj1.y-obj2.y);
                    if(rect.height < rect.width) {
                        obj2.y -= 2*modY;
                    }
                    else {
                        obj2.x -= 2*modX;
                    }
                }
            }
        });
        this.addCollidable(spidey, {"groupName": "player"});
        this.addCollidable(spidey2, {"groupName": "block"});

        spidey.addBehavior(new cutie.Behavior.EightDirectionalMovement());

    }

    cutie.registerScene(scene, "title");
})();