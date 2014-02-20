(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        cutie.Log.d("dpadeight.init()");
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.DPadMovement({
            'eightDirectional': true,
            'position': {
                'x': cutie.Width - 80,
                'y': cutie.Height - 80
            }
        }));
        this.addChild(spidey);



        //*************************
        //The Default
        //Title and Back Button

        titleLabel = new createjs.Text("8 Direction DPad", "36px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 40;
        this.addChild(titleLabel);

        back = new createjs.Shape();
        back.graphics.beginFill("#000000").drawRect(0, 0, buttonWidth, buttonHeight);
        this.addChild(back);

        var buttonWidth = 150;
        var buttonHeight = 60;
        var padding = 20;

        // Create a back button
        var backButton = new cutie.Button(padding, cutie.HEIGHT - buttonHeight - padding, buttonWidth, buttonHeight, "Back", {
            "fgColor": "#cccccc",
            "bgColor": "#aaaaaa",
            "textStyle": "24px Arial"
        });
        backButton.addEventListener("click", function() {
            cutie.setScene("title");
        });
        this.addChild(backButton);
    }

    cutie.registerScene(scene, "dpadeight");
})();