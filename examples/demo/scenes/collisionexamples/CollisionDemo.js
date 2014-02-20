(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
        loader.loadFile({"id": "blue", "src": "assets/blue-block.png"});
        loader.loadFile({"id": "red", "src": "assets/red-block.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");

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
                    cutie.getActiveScene().removeChild(obj2);
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
        this.addCollidable(blue, {"groupName": "block", "collisionType": "rectangle"});
        this.addCollidable(spidey2, {"groupName": "block", "collisionType": "circle"})


        spidey.addBehavior(new cutie.Behavior.JoystickMovement({}));

        /////////////
        //Default button to return to title scene

        titleLabel = new createjs.Text("Collision", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 40;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);

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

    cutie.registerScene(scene, "collisiondemo");
})();