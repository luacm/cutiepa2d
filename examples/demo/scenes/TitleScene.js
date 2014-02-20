(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");

        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#ffffff").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        var logo = new cutie.Bitmap(preloaded.getResult("logo"));
        logo.x = cutie.WIDTH/2 - logo.image.width/2;
        this.addChild(logo);

        buttonWidth = 150
        buttonHeight = 40
        
        asteroid = new createjs.Shape();
        asteroid.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        asteroidLabel = new createjs.Text("Asteroid", "34px Arial", "#888888");
        asteroidLabel.x = buttonWidth/2 - asteroidLabel.getMeasuredWidth()/2;
        asteroidLabel.y = buttonHeight/2 - asteroidLabel.getMeasuredHeight()/2;
        
        //Puts components together
        asteroidButton = new createjs.Container();
        asteroidButton.addEventListener("click", function() {
            console.log('Asteroid clicked');
            cutie.setScene("asteroidbehaviors");
        });
        asteroidButton.addChild(asteroid,asteroidLabel);
        asteroidButton.setTransform(50,120);
        this.addChild(asteroidButton);


        dPad = new createjs.Shape();
        dPad.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(dPad);
        dPadLabel = new createjs.Text("DPad", "34px Arial", "#888888");
        dPadLabel.x = buttonWidth/2 - dPadLabel.getMeasuredWidth()/2;
        dPadLabel.y = buttonHeight/2 - dPadLabel.getMeasuredHeight()/2;
        
        dPadButton = new createjs.Container();
        dPadButton.addEventListener("click", function() {
            console.log('dPad clicked');
            cutie.setScene("dpadbehaviors");
        });
        dPadButton.addChild(dPad,dPadLabel);
        dPadButton.setTransform(230,120);
        this.addChild(dPadButton);

        dragDrop = new createjs.Shape();
        dragDrop.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(dragDrop);
        dragDropLabel = new createjs.Text("DragDrop", "34px Arial", "#888888");
        dragDropLabel.x = buttonWidth/2 - dragDropLabel.getMeasuredWidth()/2;
        dragDropLabel.y = buttonHeight/2 - dragDropLabel.getMeasuredHeight()/2;
        
        dragDropButton = new createjs.Container();
        dragDropButton.addEventListener("click", function() {
            console.log('dragDrop clicked');
            cutie.setScene("dragdropbehaviors");
        });
        dragDropButton.addChild(dragDrop,dragDropLabel);
        dragDropButton.setTransform(420,120);
        this.addChild(dragDropButton);

//********************************************************

        eightDir = new createjs.Shape();
        eightDir.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(eightDir);
        eightDirLabel = new createjs.Text("Eight Dir", "34px Arial", "#888888");
        eightDirLabel.x = buttonWidth/2 - eightDirLabel.getMeasuredWidth()/2;
        eightDirLabel.y = buttonHeight/2 - eightDirLabel.getMeasuredHeight()/2;
        
        eightDirButton = new createjs.Container();
        eightDirButton.addEventListener("click", function() {
            console.log('eightDir clicked');
            cutie.setScene("eightdirbehaviors");
        });
        eightDirButton.addChild(eightDir,eightDirLabel);
        eightDirButton.setTransform(50,200);
        this.addChild(eightDirButton);
        

        follow = new createjs.Shape();
        follow.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(follow);
        followLabel = new createjs.Text("Follow", "34px Arial", "#888888");
        followLabel.x = buttonWidth/2 - followLabel.getMeasuredWidth()/2;
        followLabel.y = buttonHeight/2 - followLabel.getMeasuredHeight()/2;
        
        followButton = new createjs.Container();
        followButton.addEventListener("click", function() {
            console.log('follow clicked');
            cutie.setScene("followbehaviors");
        });
        followButton.addChild(follow,followLabel);
        followButton.setTransform(230,200);
        this.addChild(followButton);

        joystick = new createjs.Shape();
        joystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(joystick);
        joystickLabel = new createjs.Text("Joystick", "34px Arial", "#888888");
        joystickLabel.x = buttonWidth/2 - joystickLabel.getMeasuredWidth()/2;
        joystickLabel.y = buttonHeight/2 - joystickLabel.getMeasuredHeight()/2;
        
        joystickButton = new createjs.Container();
        joystickButton.addEventListener("click", function() {
            console.log('joystick clicked');
            cutie.setScene("joystickbehaviors");
        });
        joystickButton.addChild(joystick,joystickLabel);
        joystickButton.setTransform(420,200);
        this.addChild(joystickButton);


//********************************************************

        route = new createjs.Shape();
        route.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(route);
        routeLabel = new createjs.Text("Route", "34px Arial", "#888888");
        routeLabel.x = buttonWidth/2 - routeLabel.getMeasuredWidth()/2;
        routeLabel.y = buttonHeight/2 - routeLabel.getMeasuredHeight()/2;
        
        routeButton = new createjs.Container();
        routeButton.addEventListener("click", function() {
            console.log('route clicked');
            cutie.setScene("routebehaviors");
        });
        routeButton.addChild(route,routeLabel);
        routeButton.setTransform(50,280);
        this.addChild(routeButton);
        

        shoot = new createjs.Shape();
        shoot.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(shoot);
        shootLabel = new createjs.Text("Shoot", "34px Arial", "#888888");
        shootLabel.x = buttonWidth/2 - shootLabel.getMeasuredWidth()/2;
        shootLabel.y = buttonHeight/2 - shootLabel.getMeasuredHeight()/2;
        
        shootButton = new createjs.Container();
        shootButton.addEventListener("click", function() {
            console.log('shoot clicked');
            cutie.setScene("shootbehaviors");
        });
        shootButton.addChild(shoot,shootLabel);
        shootButton.setTransform(230,280);
        this.addChild(shootButton);

        collision = new createjs.Shape();
        collision.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(collision);
        collisionLabel = new createjs.Text("Collision", "34px Arial", "#888888");
        collisionLabel.x = buttonWidth/2 - collisionLabel.getMeasuredWidth()/2;
        collisionLabel.y = buttonHeight/2 - collisionLabel.getMeasuredHeight()/2;
        
        collisionButton = new createjs.Container();
        collisionButton.addEventListener("click", function() {
            console.log('collision clicked');
            cutie.setScene("collisionbehaviors");
        });
        collisionButton.addChild(collision,collisionLabel);
        collisionButton.setTransform(420,280);
        this.addChild(collisionButton);


    }

    cutie.registerScene(scene, "title");
})();