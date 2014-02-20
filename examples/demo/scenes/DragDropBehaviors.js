(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

    scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Default", "dragdropdefault"]
        ];

        this.addChild(Helper.makeButtonGrid("DragAndDrop Behaviors", buttonInfo, 3, 20, 250, 100, preloaded.getResult("logo")));
        this.addChild(Helper.makeMenuBackButton());
    }

    scene.makeButton = function(x, y, width, height, text, sceneName) {
        var button = new cutie.Button(x, y, width, height, text, {
            "textStyle": "24px Arial"
        });
        button.addEventListener("click", function() {
            cutie.setScene(sceneName, {"reset": true});
        });
        this.addChild(button);
    }
    cutie.registerScene(scene, "dragdropbehaviors");
})();