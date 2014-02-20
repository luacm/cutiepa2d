(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "blue", "src": "assets/blue-block.png"});
        loader.loadFile({"id": "red", "src": "assets/red-block.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");

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

        /////////////
        //Default button to return to title scene

        titleLabel = new createjs.Text("Push it Good", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 40;
        this.addChild(titleLabel);

        var buttonWidth = 150;
        var buttonHeight = 60;
        var padding = 20;

        // Create a back button
        var backButton = new cutie.Button(padding, cutie.HEIGHT - buttonHeight - padding, buttonWidth, buttonHeight, "Back", {
            "fgColor": "#cccccc",
            "bgColor": "#aaaaaa",
            "textStyle": "24px Arial"
        });
        backButton.addEventListener("click", function() {
            cutie.setScene("title");
        });
        this.addChild(backButton);

    }

    cutie.registerScene(scene, "collisionblock");
})();