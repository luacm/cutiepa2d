(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("asteroidbehaviors.init()");

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

        titleLabel = new createjs.Text("Asteroid Behaviors", "36px Arial", "#000000");
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

        asteroidDefault = new createjs.Shape();
        asteroidDefault.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(asteroidDefault);
        asteroidDefaultLabel = new createjs.Text("Default", "36px Arial", "#888888");
        asteroidDefaultLabel.x = buttonWidth/2 - asteroidDefaultLabel.getMeasuredWidth()/2;
        asteroidDefaultLabel.y = buttonHeight/2 - asteroidDefaultLabel.getMeasuredHeight()/2;
        
        asteroidDefaultButton = new createjs.Container();
        asteroidDefaultButton.addEventListener("click", function() {
            console.log('default clicked');
            cutie.setScene("asteroiddefault");
        });
        asteroidDefaultButton.addChild(asteroidDefault,asteroidDefaultLabel);
        asteroidDefaultButton.setTransform(50,200);
        this.addChild(asteroidDefaultButton);
        

        faster = new createjs.Shape();
        faster.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(faster);
        fasterLabel = new createjs.Text("Faster", "36px Arial", "#888888");
        fasterLabel.x = buttonWidth/2 - fasterLabel.getMeasuredWidth()/2;
        fasterLabel.y = buttonHeight/2 - fasterLabel.getMeasuredHeight()/2;
        
        fasterButton = new createjs.Container();
        fasterButton.addEventListener("click", function() {
            console.log('faster clicked');
            cutie.setScene("fasterasteroid");
        });
        fasterButton.addChild(faster,fasterLabel);
        fasterButton.setTransform(230,200);
        this.addChild(fasterButton);

        turret = new createjs.Shape();
        turret.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(turret);
        turretLabel = new createjs.Text("Turret", "34px Arial", "#888888");
        turretLabel.x = buttonWidth/2 - turretLabel.getMeasuredWidth()/2;
        turretLabel.y = buttonHeight/2 - turretLabel.getMeasuredHeight()/2;
        
        turretButton = new createjs.Container();
        turretButton.addEventListener("click", function() {
            console.log('Turret clicked');
            cutie.setScene("turretturn");
        });
        turretButton.addChild(turret,turretLabel);
        turretButton.setTransform(420,200);
        this.addChild(turretButton);


//********************************************************

        route = new createjs.Shape();
        route.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(route);
        routeLabel = new createjs.Text("!=Center", "36px Arial", "#888888");
        routeLabel.x = buttonWidth/2 - routeLabel.getMeasuredWidth()/2;
        routeLabel.y = buttonHeight/2 - routeLabel.getMeasuredHeight()/2;
        
        routeButton = new createjs.Container();
        routeButton.addEventListener("click", function() {
            console.log('!= Center clicked');
            cutie.setScene("notcenter");
        });
        routeButton.addChild(route,routeLabel);
        routeButton.setTransform(50,280);
        this.addChild(routeButton);
        

        angleOffset = new createjs.Shape();
        angleOffset.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(angleOffset);
        angleOffsetLabel = new createjs.Text("Angle Off", "36px Arial", "#888888");
        angleOffsetLabel.x = buttonWidth/2 - angleOffsetLabel.getMeasuredWidth()/2;
        angleOffsetLabel.y = buttonHeight/2 - angleOffsetLabel.getMeasuredHeight()/2;
        
        angleOffsetButton = new createjs.Container();
        angleOffsetButton.addEventListener("click", function() {
            console.log('angleOffset clicked');
            cutie.setScene("angleoffset");
        });
        angleOffsetButton.addChild(angleOffset,angleOffsetLabel);
        angleOffsetButton.setTransform(230,280);
        this.addChild(angleOffsetButton);
    }
    cutie.registerScene(scene, "asteroidbehaviors");
})();