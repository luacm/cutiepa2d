(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.DPadMovement({
            'position':
            {'x':500, 'y': 400},
            'buttonColor': '#ff0000',
            'normalAlpha': 0.1,
            'pressedAlpha': 1
        }));
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("DPad Changes"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "dpadchanges");
})();