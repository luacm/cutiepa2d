(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        // Set our background to be white
        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#ffffff").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        // Add our logo to the top of the scene
        var logo = new cutie.Bitmap(preloaded.getResult("logo"));
        logo.x = cutie.WIDTH/2 - logo.image.width/2;
        this.addChild(logo);

        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Default", "joystickdefault"],
            ["Faster", "fastjoystick"],
            ["Face Direction", "facetruejoystick"],
            ["Angle Offset", "anglejoystick"],
            ["Styled Joystick", "modjoystick"]
        ];

        //Puts components together
        var cols = 3;
        var padding = 20;
        var buttonWidth = 250;
        var buttonHeight = 100;
        var totalWidth = (cols * buttonWidth) + ((cols - 1) * padding);
        var px = cutie.WIDTH/2 - totalWidth/2;
        var py = 50;
        for (var i = 0; i < buttonInfo.length; i++) {
            if (i % cols == 0) {
                px = cutie.WIDTH/2 - totalWidth/2;
                py += buttonHeight + padding;
            }
            this.makeButton(px, py, buttonWidth, buttonHeight, buttonInfo[i][0], buttonInfo[i][1]);
            px += buttonWidth + padding;
        }

        // Add a title
        var titleLabel = new createjs.Text("Joystick Behaviors", "34px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 120;
        this.addChild(titleLabel);

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

    scene.makeButton = function(x, y, width, height, text, sceneName) {
        var button = new cutie.Button(x, y, width, height, text, {
            "textStyle": "24px Arial"
        });
        button.addEventListener("click", function() {
            cutie.setScene(sceneName);
        });
        this.addChild(button);
    }

    cutie.registerScene(scene, "joystickbehaviors");
})();