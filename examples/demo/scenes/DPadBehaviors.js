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

        defaultDPad = new createjs.Shape();
        defaultDPad.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(defaultDPad);
        defaultDPadLabel = new createjs.Text("Default", "36px Arial", "#888888");
        defaultDPadLabel.x = buttonWidth/2 - defaultDPadLabel.getMeasuredWidth()/2;
        defaultDPadLabel.y = buttonHeight/2 - defaultDPadLabel.getMeasuredHeight()/2;
        
        defaultDPadButton = new createjs.Container();
        defaultDPadButton.addEventListener("click", function() {
            console.log('default clicked');
            cutie.setScene("dpaddefault");
        });
        defaultDPadButton.addChild(defaultDPad,defaultDPadLabel);
        defaultDPadButton.setTransform(50,200);
        this.addChild(defaultDPadButton);
        

        faster = new createjs.Shape();
        faster.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(faster);
        fasterLabel = new createjs.Text("Faster", "36px Arial", "#888888");
        fasterLabel.x = buttonWidth/2 - fasterLabel.getMeasuredWidth()/2;
        fasterLabel.y = buttonHeight/2 - fasterLabel.getMeasuredHeight()/2;
        
        fasterButton = new createjs.Container();
        fasterButton.addEventListener("click", function() {
            console.log('faster clicked');
            cutie.setScene("fasterdpad");
        });
        fasterButton.addChild(faster,fasterLabel);
        fasterButton.setTransform(230,200);
        this.addChild(fasterButton);

        faceFalse = new createjs.Shape();
        faceFalse.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(faceFalse);
        faceFalseLabel = new createjs.Text("Face=F", "34px Arial", "#888888");
        faceFalseLabel.x = buttonWidth/2 - faceFalseLabel.getMeasuredWidth()/2;
        faceFalseLabel.y = buttonHeight/2 - faceFalseLabel.getMeasuredHeight()/2;
        
        faceFalseButton = new createjs.Container();
        faceFalseButton.addEventListener("click", function() {
            console.log('face false clicked');
            cutie.setScene("facefalse");
        });
        faceFalseButton.addChild(faceFalse,faceFalseLabel);
        faceFalseButton.setTransform(420,200);
        this.addChild(faceFalseButton);


//********************************************************

        dpadDiffs = new createjs.Shape();
        dpadDiffs.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(dpadDiffs);
        dpadDiffsLabel = new createjs.Text("PadDiff", "36px Arial", "#888888");
        dpadDiffsLabel.x = buttonWidth/2 - dpadDiffsLabel.getMeasuredWidth()/2;
        dpadDiffsLabel.y = buttonHeight/2 - dpadDiffsLabel.getMeasuredHeight()/2;
        
        dpadDiffsButton = new createjs.Container();
        dpadDiffsButton.addEventListener("click", function() {
            console.log('DPadDiffs clicked');
            cutie.setScene("dpadchanges");
        });
        dpadDiffsButton.addChild(dpadDiffs,dpadDiffsLabel);
        dpadDiffsButton.setTransform(50,280);
        this.addChild(dpadDiffsButton);
        

        dpad8 = new createjs.Shape();
        dpad8.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(dpad8);
        dpad8Label = new createjs.Text("8 DPad", "36px Arial", "#888888");
        dpad8Label.x = buttonWidth/2 - dpad8Label.getMeasuredWidth()/2;
        dpad8Label.y = buttonHeight/2 - dpad8Label.getMeasuredHeight()/2;
        
        dpad8Button = new createjs.Container();
        dpad8Button.addEventListener("click", function() {
            console.log('8 DPad clicked');
            cutie.setScene("dpadeight");
        });
        dpad8Button.addChild(dpad8,dpad8Label);
        dpad8Button.setTransform(230,280);
        this.addChild(dpad8Button);

    }
    cutie.registerScene(scene, "dpadbehaviors");
})();