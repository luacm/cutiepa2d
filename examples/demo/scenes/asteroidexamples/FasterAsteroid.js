(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("fasterasteroid.init()");
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.AsteroidMovement({
            'acceleration': 250,
            'deceleration': 100,
            'rotation': 160
        }));
        this.addChild(spidey);



        //*************************
        //The Default
        //Title and Back Button

        titleLabel = new createjs.Text("Faster Asteroid", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 40;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);

        buttonWidth = 150
        buttonHeight = 40
        backLabel = new createjs.Text("Back", "36px Arial", "#ff0000");
        backLabel.x = buttonWidth/2 - backLabel.getMeasuredWidth()/2;
        backLabel.y = buttonHeight/2 - backLabel.getMeasuredHeight()/2;
        backButton = new createjs.Container();
        backButton.addEventListener("click", function() {
            console.log('back clicked');
            cutie.setScene("asteroidbehaviors");
        });
        backButton.addChild(back,backLabel);
        backButton.setTransform(20,420);
        this.addChild(backButton);


    }

    cutie.registerScene(scene, "fasterasteroid");
})();