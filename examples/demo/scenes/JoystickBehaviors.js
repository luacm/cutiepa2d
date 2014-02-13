(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("joystickbehaviors.init()");

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

        titleLabel = new createjs.Text("Joystick Behaviors", "34px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 120;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);
        backLabel = new createjs.Text("Back", "34px Arial", "#888888");
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

        defaultJoystick = new createjs.Shape();
        defaultJoystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(defaultJoystick);
        defaultJoystickLabel = new createjs.Text("Default", "34px Arial", "#888888");
        defaultJoystickLabel.x = buttonWidth/2 - defaultJoystickLabel.getMeasuredWidth()/2;
        defaultJoystickLabel.y = buttonHeight/2 - defaultJoystickLabel.getMeasuredHeight()/2;
        
        defaultJoystickButton = new createjs.Container();
        defaultJoystickButton.addEventListener("click", function() {
            console.log('defaultJoystick clicked');
            cutie.setScene("joystickdefault");
        });
        defaultJoystickButton.addChild(defaultJoystick,defaultJoystickLabel);
        defaultJoystickButton.setTransform(50,200);
        this.addChild(defaultJoystickButton);
        

        fastJoystick = new createjs.Shape();
        fastJoystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(fastJoystick);
        fastJoystickLabel = new createjs.Text("Faster", "34px Arial", "#888888");
        fastJoystickLabel.x = buttonWidth/2 - fastJoystickLabel.getMeasuredWidth()/2;
        fastJoystickLabel.y = buttonHeight/2 - fastJoystickLabel.getMeasuredHeight()/2;
        
        fastJoystickButton = new createjs.Container();
        fastJoystickButton.addEventListener("click", function() {
            console.log('fastJoystick clicked');
            cutie.setScene("fastjoystick");
        });
        fastJoystickButton.addChild(fastJoystick,fastJoystickLabel);
        fastJoystickButton.setTransform(230,200);
        this.addChild(fastJoystickButton);

        faceTrueJoystick = new createjs.Shape();
        faceTrueJoystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(faceTrueJoystick);
        faceTrueJoystickLabel = new createjs.Text("Face = T", "34px Arial", "#888888");
        faceTrueJoystickLabel.x = buttonWidth/2 - faceTrueJoystickLabel.getMeasuredWidth()/2;
        faceTrueJoystickLabel.y = buttonHeight/2 - faceTrueJoystickLabel.getMeasuredHeight()/2;
        
        faceTrueJoystickButton = new createjs.Container();
        faceTrueJoystickButton.addEventListener("click", function() {
            console.log('Face True clicked');
            cutie.setScene("facetruejoystick");
        });
        faceTrueJoystickButton.addChild(faceTrueJoystick,faceTrueJoystickLabel);
        faceTrueJoystickButton.setTransform(420,200);
        this.addChild(faceTrueJoystickButton);


//********************************************************

        angleOffsetJoystick = new createjs.Shape();
        angleOffsetJoystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(angleOffsetJoystick);
        angleOffsetJoystickLabel = new createjs.Text("AngleOff", "34px Arial", "#888888");
        angleOffsetJoystickLabel.x = buttonWidth/2 - angleOffsetJoystickLabel.getMeasuredWidth()/2;
        angleOffsetJoystickLabel.y = buttonHeight/2 - angleOffsetJoystickLabel.getMeasuredHeight()/2;
        
        angleOffsetJoystickButton = new createjs.Container();
        angleOffsetJoystickButton.addEventListener("click", function() {
            console.log('angleOffsetJoystick clicked');
            cutie.setScene("anglejoystick");
        });
        angleOffsetJoystickButton.addChild(angleOffsetJoystick,angleOffsetJoystickLabel);
        angleOffsetJoystickButton.setTransform(50,280);
        this.addChild(angleOffsetJoystickButton);
        

        modJoystick = new createjs.Shape();
        modJoystick.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(modJoystick);
        modJoystickLabel = new createjs.Text("Mod JS", "34px Arial", "#888888");
        modJoystickLabel.x = buttonWidth/2 - modJoystickLabel.getMeasuredWidth()/2;
        modJoystickLabel.y = buttonHeight/2 - modJoystickLabel.getMeasuredHeight()/2;
        
        modJoystickButton = new createjs.Container();
        modJoystickButton.addEventListener("click", function() {
            console.log('modJoystick clicked');
            cutie.setScene("modjoystick");
        });
        modJoystickButton.addChild(modJoystick,modJoystickLabel);
        modJoystickButton.setTransform(230,280);
        this.addChild(modJoystickButton);

    }
    cutie.registerScene(scene, "joystickbehaviors");
})();