(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("eightdirbehaviors.init()");

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
        
        titleLabel = new createjs.Text("Eight Directional Behaviors", "34px Arial", "#000000");
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

        eightDirDefault = new createjs.Shape();
        eightDirDefault.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(eightDirDefault);
        eightDirDefaultLabel = new createjs.Text("Default", "34px Arial", "#888888");
        eightDirDefaultLabel.x = buttonWidth/2 - eightDirDefaultLabel.getMeasuredWidth()/2;
        eightDirDefaultLabel.y = buttonHeight/2 - eightDirDefaultLabel.getMeasuredHeight()/2;
        
        eightDirDefaultButton = new createjs.Container();
        eightDirDefaultButton.addEventListener("click", function() {
            console.log('eightDirDefault clicked');
            cutie.setScene("eightdirdefault");
        });
        eightDirDefaultButton.addChild(eightDirDefault,eightDirDefaultLabel);
        eightDirDefaultButton.setTransform(50,200);
        this.addChild(eightDirDefaultButton);
        

        fastEightDir = new createjs.Shape();
        fastEightDir.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(fastEightDir);
        fastEightDirLabel = new createjs.Text("Faster", "34px Arial", "#888888");
        fastEightDirLabel.x = buttonWidth/2 - fastEightDirLabel.getMeasuredWidth()/2;
        fastEightDirLabel.y = buttonHeight/2 - fastEightDirLabel.getMeasuredHeight()/2;
        
        fastEightDirButton = new createjs.Container();
        fastEightDirButton.addEventListener("click", function() {
            console.log('fastEightDir clicked');
            cutie.setScene("fasteightdir");
        });
        fastEightDirButton.addChild(fastEightDir,fastEightDirLabel);
        fastEightDirButton.setTransform(230,200);
        this.addChild(fastEightDirButton);

        wasd = new createjs.Shape();
        wasd.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(wasd);
        wasdLabel = new createjs.Text("WASD", "34px Arial", "#888888");
        wasdLabel.x = buttonWidth/2 - wasdLabel.getMeasuredWidth()/2;
        wasdLabel.y = buttonHeight/2 - wasdLabel.getMeasuredHeight()/2;
        
        wasdButton = new createjs.Container();
        wasdButton.addEventListener("click", function() {
            console.log('wasd clicked');
            cutie.setScene("wasd");
        });
        wasdButton.addChild(wasd,wasdLabel);
        wasdButton.setTransform(420,200);
        this.addChild(wasdButton);
    }
    cutie.registerScene(scene, "eightdirbehaviors");
})();