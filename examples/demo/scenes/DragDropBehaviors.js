(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        cutie.Log.d("dragdropbehaviors.init()");

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
        
        titleLabel = new createjs.Text("Drag Drop Behaviors", "36px Arial", "#000000");
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

        defaultDragDrop = new createjs.Shape();
        defaultDragDrop.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(defaultDragDrop);
        defaultDragDropLabel = new createjs.Text("Default", "36px Arial", "#888888");
        defaultDragDropLabel.x = buttonWidth/2 - defaultDragDropLabel.getMeasuredWidth()/2;
        defaultDragDropLabel.y = buttonHeight/2 - defaultDragDropLabel.getMeasuredHeight()/2;
        
        defaultDragDropButton = new createjs.Container();
        defaultDragDropButton.addEventListener("click", function() {
            console.log('defaultDragDrop clicked');
            cutie.setScene("dragdropdefault");
        });
        defaultDragDropButton.addChild(defaultDragDrop,defaultDragDropLabel);
        defaultDragDropButton.setTransform(50,200);
        this.addChild(defaultDragDropButton);
        
    }
    cutie.registerScene(scene, "dragdropbehaviors");
})();