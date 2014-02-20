(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.Follow({
            'setCenter':false
        }));
        spidey.regX = 50;
        spidey.regY = 0
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Follow regX = 50, regY = 0"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "regxy");
})();