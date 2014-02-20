(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Default", "asteroiddefault"],
            ["Faster", "fasterasteroid"],
            ["Turret", "turretturn"],
            ["Not Center", "notcenter"],
            ["Angle Offset", "angleoffset"]
        ];

        this.addChild(Helper.makeButtonGrid("Asteroid Behaviors", buttonInfo, 3, 20, 250, 100, preloaded.getResult("logo")));
        this.addChild(Helper.makeMenuBackButton());
    }

    cutie.registerScene(scene, "asteroidbehaviors");
})();