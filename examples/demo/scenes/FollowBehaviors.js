(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("followbehaviors.init()");

        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#888888").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        var logo = new cutie.Bitmap(preloaded.getResult("logo"));
        logo.x = cutie.WIDTH/2 - logo.image.width/2;
        this.addChild(logo);


        //************************
        //Title & Back Button
        buttonWidth = 150
        buttonHeight = 40

        titleLabel = new createjs.Text("Follow Behaviors", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 120;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);
        backLabel = new createjs.Text("Back", "36px Arial", "#888888");
        backLabel.x = buttonWidth/2 - backLabel.getMeasuredWidth()/2;
        backLabel.y = buttonHeight/2 - backLabel.getMeasuredHeight()/2;
        
        backButton = new createjs.Container();
        backButton.addEventListener("click", function() {
            console.log('back clicked');
            cutie.setScene("title");
        });
        backButton.addChild(back,backLabel);
        backButton.setTransform(20,420);
        this.addChild(backButton);

//********************************************************

        defaultFollow = new createjs.Shape();
        defaultFollow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(defaultFollow);
        defaultFollowLabel = new createjs.Text("Default", "36px Arial", "#888888");
        defaultFollowLabel.x = buttonWidth/2 - defaultFollowLabel.getMeasuredWidth()/2;
        defaultFollowLabel.y = buttonHeight/2 - defaultFollowLabel.getMeasuredHeight()/2;
        
        defaultFollowButton = new createjs.Container();
        defaultFollowButton.addEventListener("click", function() {
            console.log('defaultFollow clicked');
            cutie.setScene("followdefault");
        });
        defaultFollowButton.addChild(defaultFollow,defaultFollowLabel);
        defaultFollowButton.setTransform(50,200);
        this.addChild(defaultFollowButton);
        

        fastFollow = new createjs.Shape();
        fastFollow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(fastFollow);
        fastFollowLabel = new createjs.Text("Faster", "36px Arial", "#888888");
        fastFollowLabel.x = buttonWidth/2 - fastFollowLabel.getMeasuredWidth()/2;
        fastFollowLabel.y = buttonHeight/2 - fastFollowLabel.getMeasuredHeight()/2;
        
        fastFollowButton = new createjs.Container();
        fastFollowButton.addEventListener("click", function() {
            console.log('fastFollow clicked');
            cutie.setScene("fastfollow");
        });
        fastFollowButton.addChild(fastFollow,fastFollowLabel);
        fastFollowButton.setTransform(230,200);
        this.addChild(fastFollowButton);

        distanceFollow = new createjs.Shape();
        distanceFollow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(distanceFollow);
        distanceFollowLabel = new createjs.Text("Distance", "34px Arial", "#888888");
        distanceFollowLabel.x = buttonWidth/2 - distanceFollowLabel.getMeasuredWidth()/2;
        distanceFollowLabel.y = buttonHeight/2 - distanceFollowLabel.getMeasuredHeight()/2;
        
        distanceFollowButton = new createjs.Container();
        distanceFollowButton.addEventListener("click", function() {
            console.log('Distance clicked');
            cutie.setScene("distancefollow");
        });
        distanceFollowButton.addChild(distanceFollow,distanceFollowLabel);
        distanceFollowButton.setTransform(420,200);
        this.addChild(distanceFollowButton);


//********************************************************

        centerFalse = new createjs.Shape();
        centerFalse.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(centerFalse);
        centerFalseLabel = new createjs.Text("Center=F", "36px Arial", "#888888");
        centerFalseLabel.x = buttonWidth/2 - centerFalseLabel.getMeasuredWidth()/2;
        centerFalseLabel.y = buttonHeight/2 - centerFalseLabel.getMeasuredHeight()/2;
        
        centerFalseButton = new createjs.Container();
        centerFalseButton.addEventListener("click", function() {
            console.log('centerFalse clicked');
            cutie.setScene("centerfalse");
        });
        centerFalseButton.addChild(centerFalse,centerFalseLabel);
        centerFalseButton.setTransform(50,280);
        this.addChild(centerFalseButton);
        

        regXY = new createjs.Shape();
        regXY.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(regXY);
        regXYLabel = new createjs.Text("regXY", "36px Arial", "#888888");
        regXYLabel.x = buttonWidth/2 - regXYLabel.getMeasuredWidth()/2;
        regXYLabel.y = buttonHeight/2 - regXYLabel.getMeasuredHeight()/2;
        
        regXYButton = new createjs.Container();
        regXYButton.addEventListener("click", function() {
            console.log('regXY clicked');
            cutie.setScene("regxy");
        });
        regXYButton.addChild(regXY,regXYLabel);
        regXYButton.setTransform(230,280);
        this.addChild(regXYButton);

        angleOff = new createjs.Shape();
        angleOff.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(angleOff);
        angleOffLabel = new createjs.Text("Angle Off", "34px Arial", "#888888");
        angleOffLabel.x = buttonWidth/2 - angleOffLabel.getMeasuredWidth()/2;
        angleOffLabel.y = buttonHeight/2 - angleOffLabel.getMeasuredHeight()/2;
        
        angleOffButton = new createjs.Container();
        angleOffButton.addEventListener("click", function() {
            console.log('angleOff clicked');
            cutie.setScene("angleoffsetfollow");
        });
        angleOffButton.addChild(angleOff,angleOffLabel);
        angleOffButton.setTransform(420,280);
        this.addChild(angleOffButton);


//********************************************************

        target = new createjs.Shape();
        target.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(target);
        targetLabel = new createjs.Text("Target", "36px Arial", "#888888");
        targetLabel.x = buttonWidth/2 - targetLabel.getMeasuredWidth()/2;
        targetLabel.y = buttonHeight/2 - targetLabel.getMeasuredHeight()/2;
        
        targetButton = new createjs.Container();
        targetButton.addEventListener("click", function() {
            console.log('target clicked');
            cutie.setScene("targetfollow");
        });
        targetButton.addChild(target,targetLabel);
        targetButton.setTransform(50,360);
        this.addChild(targetButton);
        

        followCord = new createjs.Shape();
        followCord.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(followCord);
        followCordLabel = new createjs.Text("Cord.", "36px Arial", "#888888");
        followCordLabel.x = buttonWidth/2 - followCordLabel.getMeasuredWidth()/2;
        followCordLabel.y = buttonHeight/2 - followCordLabel.getMeasuredHeight()/2;
        
        followCordButton = new createjs.Container();
        followCordButton.addEventListener("click", function() {
            console.log('followCord clicked');
            cutie.setScene("followcord");
        });
        followCordButton.addChild(followCord,followCordLabel);
        followCordButton.setTransform(230,360);
        this.addChild(followCordButton);

        snakeFollow = new createjs.Shape();
        snakeFollow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(snakeFollow);
        snakeFollowLabel = new createjs.Text("Snake", "34px Arial", "#888888");
        snakeFollowLabel.x = buttonWidth/2 - snakeFollowLabel.getMeasuredWidth()/2;
        snakeFollowLabel.y = buttonHeight/2 - snakeFollowLabel.getMeasuredHeight()/2;
        
        snakeFollowButton = new createjs.Container();
        snakeFollowButton.addEventListener("click", function() {
            console.log('snakeFollow clicked');
            cutie.setScene("snakefollow");
        });
        snakeFollowButton.addChild(snakeFollow,snakeFollowLabel);
        snakeFollowButton.setTransform(420,360);
        this.addChild(snakeFollowButton);

    }
    cutie.registerScene(scene, "followbehaviors");
})();