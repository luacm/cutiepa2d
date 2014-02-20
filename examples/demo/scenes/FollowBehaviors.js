(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "logo", "src": "../../../assets/logo.png"});
    }

     scene.init = function(preloaded) {
        // Declare pairs of button texts and scene names
        var buttonInfo = [
            ["Default", "followdefault"],
            ["Faster", "fastfollow"],
            ["Distance", "distancefollow"],
            ["Not Center", "centerfalse"],
            ["regXY", "regxy"],
            ["Angle Offset", "angleoffsetfollow"],
            ["Target", "targetfollow"],
            ["Cord", "followcord"],
            ["Snake", "snakefollow"]
        ];
        
        this.addChild(Helper.makeButtonGrid("Follow Behaviors", buttonInfo, 3, 20, 250, 100, preloaded.getResult("logo")));
        this.addChild(Helper.makeMenuBackButton());
    }

    cutie.registerScene(scene, "followbehaviors");
})();