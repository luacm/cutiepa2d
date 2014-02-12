(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("dpadbehaviors.init()");

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
        
        titleLabel = new createjs.Text("DPad Behaviors", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 120;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);
        backLabel = new createjs.Text("Back", "36px Arial", "#ff0000");
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

        eightDir = new createjs.Shape();
        eightDir.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(eightDir);
        eightDirLabel = new createjs.Text("Eight Dir", "36px Arial", "#ff0000");
        eightDirLabel.x = buttonWidth/2 - eightDirLabel.getMeasuredWidth()/2;
        eightDirLabel.y = buttonHeight/2 - eightDirLabel.getMeasuredHeight()/2;
        
        eightDirButton = new createjs.Container();
        eightDirButton.addEventListener("click", function() {
            console.log('eightDir clicked');
            //cutie.setScene("game");
        });
        eightDirButton.addChild(eightDir,eightDirLabel);
        eightDirButton.setTransform(50,200);
        this.addChild(eightDirButton);
        

        follow = new createjs.Shape();
        follow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(follow);
        followLabel = new createjs.Text("Follow", "36px Arial", "#ff0000");
        followLabel.x = buttonWidth/2 - followLabel.getMeasuredWidth()/2;
        followLabel.y = buttonHeight/2 - followLabel.getMeasuredHeight()/2;
        
        followButton = new createjs.Container();
        followButton.addEventListener("click", function() {
            console.log('follow clicked');
            //cutie.setScene("game");
        });
        followButton.addChild(follow,followLabel);
        followButton.setTransform(230,200);
        this.addChild(followButton);

        joyStick = new createjs.Shape();
        joyStick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(joyStick);
        joyStickLabel = new createjs.Text("Joy Stick", "34px Arial", "#ff0000");
        joyStickLabel.x = buttonWidth/2 - joyStickLabel.getMeasuredWidth()/2;
        joyStickLabel.y = buttonHeight/2 - joyStickLabel.getMeasuredHeight()/2;
        
        joyStickButton = new createjs.Container();
        joyStickButton.addEventListener("click", function() {
            console.log('joy Stick clicked');
            //cutie.setScene("game");
        });
        joyStickButton.addChild(joyStick,joyStickLabel);
        joyStickButton.setTransform(420,200);
        this.addChild(joyStickButton);


//********************************************************

        route = new createjs.Shape();
        route.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(route);
        routeLabel = new createjs.Text("Route", "36px Arial", "#ff0000");
        routeLabel.x = buttonWidth/2 - routeLabel.getMeasuredWidth()/2;
        routeLabel.y = buttonHeight/2 - routeLabel.getMeasuredHeight()/2;
        
        routeButton = new createjs.Container();
        routeButton.addEventListener("click", function() {
            console.log('route clicked');
            //cutie.setScene("game");
        });
        routeButton.addChild(route,routeLabel);
        routeButton.setTransform(50,280);
        this.addChild(routeButton);
        

        shoot = new createjs.Shape();
        shoot.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(shoot);
        shootLabel = new createjs.Text("Shoot", "36px Arial", "#ff0000");
        shootLabel.x = buttonWidth/2 - shootLabel.getMeasuredWidth()/2;
        shootLabel.y = buttonHeight/2 - shootLabel.getMeasuredHeight()/2;
        
        shootButton = new createjs.Container();
        shootButton.addEventListener("click", function() {
            console.log('shoot clicked');
            //cutie.setScene("game");
        });
        shootButton.addChild(shoot,shootLabel);
        shootButton.setTransform(230,280);
        this.addChild(shootButton);

        collision = new createjs.Shape();
        collision.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(collision);
        collisionLabel = new createjs.Text("Collision", "34px Arial", "#ff0000");
        collisionLabel.x = buttonWidth/2 - collisionLabel.getMeasuredWidth()/2;
        collisionLabel.y = buttonHeight/2 - collisionLabel.getMeasuredHeight()/2;
        
        collisionButton = new createjs.Container();
        collisionButton.addEventListener("click", function() {
            console.log('collision clicked');
            //cutie.setScene("game");
        });
        collisionButton.addChild(collision,collisionLabel);
        collisionButton.setTransform(420,280);
        this.addChild(collisionButton);
    }
    cutie.registerScene(scene, "dpadbehaviors");
})();