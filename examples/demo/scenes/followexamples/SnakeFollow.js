(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("snakefollow.init()");
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.EightDirectionalMovement({}));
        spidey.regX = spidey.image.width/2;
        spidey.regY = spidey.image.height/2;

        var spidey2 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey2.x = cutie.WIDTH/2 - spidey2.image.width/2;
        spidey2.y = cutie.HEIGHT/2 - spidey2.image.height/2;
        spidey2.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey,
            'distance':50
        }));

        var spidey3 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey3.x = cutie.WIDTH/2 - spidey3.image.width/2;
        spidey3.y = cutie.HEIGHT/2 - spidey3.image.height/2;
        spidey3.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey2,
            'distance':50
        }));

        var spidey4 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey4.x = cutie.WIDTH/2 - spidey4.image.width/2;
        spidey4.y = cutie.HEIGHT/2 - spidey4.image.height/2;
        spidey4.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey3,
            'distance':50
        }));

        var spidey5 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey5.x = cutie.WIDTH/2 - spidey5.image.width/2;
        spidey5.y = cutie.HEIGHT/2 - spidey5.image.height/2;
        spidey5.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey4,
            'distance':50
        }));

        var spidey6 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey6.x = cutie.WIDTH/2 - spidey6.image.width/2;
        spidey6.y = cutie.HEIGHT/2 - spidey6.image.height/2;
        spidey6.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey5,
            'distance':50
        }));

        var spidey7 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey7.x = cutie.WIDTH/2 - spidey7.image.width/2;
        spidey7.y = cutie.HEIGHT/2 - spidey7.image.height/2;
        spidey7.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey6,
            'distance':50
        }));

        var spidey8 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey8.x = cutie.WIDTH/2 - spidey8.image.width/2;
        spidey8.y = cutie.HEIGHT/2 - spidey8.image.height/2;
        spidey8.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey7,
            'distance':50
        }));

        var spidey9 = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey9.x = cutie.WIDTH/2 - spidey9.image.width/2;
        spidey9.y = cutie.HEIGHT/2 - spidey9.image.height/2;
        spidey9.addBehavior(new cutie.Behavior.Follow({
            'targetObj':spidey8,
            'distance':50
        }));

        this.addChild(spidey9);
        this.addChild(spidey8);
        this.addChild(spidey7);
        this.addChild(spidey6);
        this.addChild(spidey5);
        this.addChild(spidey4);
        this.addChild(spidey3);
        this.addChild(spidey2);
        this.addChild(spidey);


        //*************************
        //The Default
        //Title and Back Button

        titleLabel = new createjs.Text("Asteroid with Many Follows: dist = 50", "36px Arial", "#000000");
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
            cutie.getActiveScene().removeChild(spidey3);
            cutie.getActiveScene().removeChild(spidey4);
            cutie.getActiveScene().removeChild(spidey5);
            cutie.getActiveScene().removeChild(spidey6);
            cutie.getActiveScene().removeChild(spidey7);
            cutie.getActiveScene().removeChild(spidey8);
            cutie.getActiveScene().removeChild(spidey9);
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

    cutie.registerScene(scene, "snakefollow");
})();