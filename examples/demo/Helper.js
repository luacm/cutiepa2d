this.createjs = this.createjs || {};
this.Helper = this.Helper || {};

(function(module) {

    module.makeGameBackButton = function() {
        var buttonWidth = 150;
        var buttonHeight = 60;
        var padding = 20;

        // Create a back button
        var backButton = new cutie.Button(cutie.WIDTH - buttonWidth - padding, padding, buttonWidth, buttonHeight, "Back", {
            "fgColor": "#cccccc",
            "bgColor": "#aaaaaa",
            "textStyle": "24px Arial"
        });
        backButton.addEventListener("click", function() {
            cutie.setScene("title");
        });

        return backButton;
    }

    module.makeButtonGrid = function(title, buttonInfo, cols, padding, buttonWidth, buttonHeight, img) {
        var container = new createjs.Container();

        // Set our background to be white
        var bkg = new createjs.Shape();
        bkg.graphics.beginFill("#ffffff").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        container.addChild(bkg);

        // Add our logo to the top of the scene
        var logo = new cutie.Bitmap(img);
        logo.x = cutie.WIDTH/2 - logo.image.width/2;
        container.addChild(logo);

        //Puts components together
        var totalWidth = (cols * buttonWidth) + ((cols - 1) * padding);
        var px = cutie.WIDTH/2 - totalWidth/2;
        var py = 50;
        for (var i = 0; i < buttonInfo.length; i++) {
            if (i % cols == 0) {
                px = cutie.WIDTH/2 - totalWidth/2;
                py += buttonHeight + padding;
            }
            container.addChild(Helper.makeMenuButton(px, py, buttonWidth, buttonHeight, buttonInfo[i][0], buttonInfo[i][1]));
            px += buttonWidth + padding;
        }

        // Add a title
        var titleLabel = new createjs.Text(title, "34px Arial", "#000000");
        titleLabel.x = cutie.WIDTH/2 - titleLabel.getMeasuredWidth()/2;
        titleLabel.y = 120;
        container.addChild(titleLabel);

        return container;
    }

    module.makeMenuButton = function(x, y, width, height, text, sceneName) {
        var button = new cutie.Button(x, y, width, height, text, {
            "textStyle": "24px Arial"
        });
        button.addEventListener("click", function() {
            cutie.setScene(sceneName, {"reset": true});
        });
        return button;
    }

    module.makeMenuBackButton = function() {
        var padding = 20;
        var buttonWidth = 150;
        var buttonHeight = 75;

        // Create a back button
        var backButton = new cutie.Button(padding, cutie.HEIGHT - buttonHeight - padding, buttonWidth, buttonHeight, "Back", {
            "fgColor": "#cccccc",
            "bgColor": "#aaaaaa",
            "textStyle": "24px Arial"
        });
        backButton.addEventListener("click", function() {
            cutie.setScene("title");
        });

        return backButton;
    }



})(this.Helper);