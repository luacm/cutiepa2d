(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "spidey", "src": "assets/spiderman-ball.png"});
    }

    scene.init = function(preloaded) {
        var spidey = new cutie.Bitmap(preloaded.getResult("spidey"));
        spidey.x = cutie.WIDTH/2 - spidey.image.width/2;
        spidey.y = cutie.HEIGHT/2 - spidey.image.height/2;
        spidey.addBehavior(new cutie.Behavior.Route({
            'path': [{'x':100,'y':100},{'x':300,'y':100},{'x':300,'y':200},{'x':100,'y':200}],
            'repeat': -1,
            'setCenter': false
        }));
        this.addChild(spidey);

        // Add title and back button
        this.addChild(Helper.makeGameTitle("Route Center = False"));
        this.addChild(Helper.makeGameBackButton());
    }

    cutie.registerScene(scene, "routecenterfalse");
})();