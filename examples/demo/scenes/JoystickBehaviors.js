(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Default", "joystickdefault"],
            ["Faster", "fastjoystick"],
            ["Face Direction", "facetruejoystick"],
            ["Angle Offset", "anglejoystick"],
            ["Styled Joystick", "modjoystick"]
        ];

        this.addChild(Helper.makeButtonGrid("Joystick Behaviors", buttonInfo, 3, 20, 250, 100, preloaded.getResult("logo")));
        this.addChild(Helper.makeMenuBackButton());
    }

    cutie.registerScene(scene, "joystickbehaviors");
})();