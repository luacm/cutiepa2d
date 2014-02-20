(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

    scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Asteroid", "asteroidbehaviors"],
            ["DPad", "dpadbehaviors"],
            ["DragAndDrop", "dragdropbehaviors"],
            ["EightDirMovement", "eightdirbehaviors"],
            ["Follow", "followbehaviors"],
            ["Joystick", "joystickbehaviors"],
            ["Route", "routebehaviors"],
            ["Shoot", "shootbehaviors"],
            ["Collision", "collisionbehaviors"]
        ];

        this.addChild(Helper.makeButtonGrid("", buttonInfo, 3, 20, 250, 100, preloaded.getResult("logo")));
    }

    cutie.registerScene(scene, "title");
})();