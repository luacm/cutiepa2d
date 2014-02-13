(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("targetfollow.init()");
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.AsteroidMovement({}));

        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey2.x = cutie.WIDTH/2 - spidey2.image.width/2;
        spidey2.y = cutie.HEIGHT/2 - spidey2.image.height/2;
        spidey2.addBehavior(new cutie.Behavior.Follow({
            'speed':90,
            'targetObj':spidey
        }));
        this.addChild(spidey2);
        this.addChild(spidey);


        //*************************
        //The Default
        //Title and Back Button

        titleLabel = new createjs.Text("Asteroid with Follow: speed = 90", "36px Arial", "#000000");
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
            cutie.getActiveScene().removeChild(spidey);
            cutie.getActiveScene().removeChild(spidey2);
            cutie.getActiveScene().removeChild(back);
            cutie.getActiveScene().removeChild(backButton);
            cutie.getActiveScene().removeChild(titleLabel);
            cutie.setScene("followbehaviors");
        });
        backButton.addChild(back,backLabel);
        backButton.setTransform(cutie.WIDTH/2 - buttonWidth/2,420);
        this.addChild(backButton);
        console.log(cutie.WIDTH);


    }

    cutie.registerScene(scene, "targetfollow");
})();