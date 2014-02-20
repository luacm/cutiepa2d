(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("routebehaviors.init()");

        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#ffffff").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        var logo = new cutie.Bitmap(preloaded.getResult("logo"));
        logo.x = cutie.WIDTH/2 - logo.image.width/2;
        this.addChild(logo);


        //************************
        //Title & Back Button
        buttonWidth = 150
        buttonHeight = 40
        
        titleLabel = new createjs.Text("Route Behaviors", "34px Arial", "#000000");
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

        defaultRoute = new createjs.Shape();
        defaultRoute.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(defaultRoute);
        defaultRouteLabel = new createjs.Text("Default", "34px Arial", "#888888");
        defaultRouteLabel.x = buttonWidth/2 - defaultRouteLabel.getMeasuredWidth()/2;
        defaultRouteLabel.y = buttonHeight/2 - defaultRouteLabel.getMeasuredHeight()/2;
        
        defaultRouteButton = new createjs.Container();
        defaultRouteButton.addEventListener("click", function() {
            console.log('defaultRoute clicked');
            cutie.setScene("routedefault");
        });
        defaultRouteButton.addChild(defaultRoute,defaultRouteLabel);
        defaultRouteButton.setTransform(50,200);
        this.addChild(defaultRouteButton);
        

        routeContinue = new createjs.Shape();
        routeContinue.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(routeContinue);
        routeContinueLabel = new createjs.Text("Continue", "34px Arial", "#888888");
        routeContinueLabel.x = buttonWidth/2 - routeContinueLabel.getMeasuredWidth()/2;
        routeContinueLabel.y = buttonHeight/2 - routeContinueLabel.getMeasuredHeight()/2;
        
        routeContinueButton = new createjs.Container();
        routeContinueButton.addEventListener("click", function() {
            console.log('routeContinue clicked');
            cutie.setScene("routecontinue");
        });
        routeContinueButton.addChild(routeContinue,routeContinueLabel);
        routeContinueButton.setTransform(230,200);
        this.addChild(routeContinueButton);

        routeFast = new createjs.Shape();
        routeFast.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(routeFast);
        routeFastLabel = new createjs.Text("Faster", "34px Arial", "#888888");
        routeFastLabel.x = buttonWidth/2 - routeFastLabel.getMeasuredWidth()/2;
        routeFastLabel.y = buttonHeight/2 - routeFastLabel.getMeasuredHeight()/2;
        
        routeFastButton = new createjs.Container();
        routeFastButton.addEventListener("click", function() {
            console.log('fast clicked');
            cutie.setScene("routefast");
        });
        routeFastButton.addChild(routeFast,routeFastLabel);
        routeFastButton.setTransform(420,200);
        this.addChild(routeFastButton);


//********************************************************

        routeCenerFalse = new createjs.Shape();
        routeCenerFalse.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(routeCenerFalse);
        routeCenerFalseLabel = new createjs.Text("Center=F", "34px Arial", "#888888");
        routeCenerFalseLabel.x = buttonWidth/2 - routeCenerFalseLabel.getMeasuredWidth()/2;
        routeCenerFalseLabel.y = buttonHeight/2 - routeCenerFalseLabel.getMeasuredHeight()/2;
        
        routeCenerFalseButton = new createjs.Container();
        routeCenerFalseButton.addEventListener("click", function() {
            console.log('routeCenerFalse clicked');
            cutie.setScene("routecenterfalse");
        });
        routeCenerFalseButton.addChild(routeCenerFalse,routeCenerFalseLabel);
        routeCenerFalseButton.setTransform(50,280);
        this.addChild(routeCenerFalseButton);
        

        
    }
    cutie.registerScene(scene, "routebehaviors");
})();