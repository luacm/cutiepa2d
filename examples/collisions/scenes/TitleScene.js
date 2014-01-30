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
        this.registerCollisionGroup("bullets");
        this.registerCollisionGroup("enemies", {
            "internalCollisions": function(obj1, obj2, rect) {},
            "collidesWith": [{
                "name": ["bullets", "enemies"],
                "handle": function(obj1, obj2, rect){return obj1}
            },
            {
                "name": "*",
                "handle": function(obj1, obj2, rect){return obj1}
            }
            ]
        });
        this.addCollidable(spidey, {"groupName": "enemies"});
        this.addCollidable(spidey, {"groupName": "bullets", "collisionType": "circle"});
        this.addCollidable(spidey2, {"groupName": "enemies"});
        this.addCollidable(spidey2, {"groupName": "bullets", "collisionType": "circle"});
        this.removeCollidable(spidey, "enemies");

    }

    cutie.registerScene(scene, "title");
})();