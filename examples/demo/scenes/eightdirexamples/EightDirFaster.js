(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.EightDirectionalMovement({
            'speed':250
        }));
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("EightDir Faster"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "fasteightdir");
})();